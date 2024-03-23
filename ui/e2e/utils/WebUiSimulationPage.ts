import { expect, type Locator, type Page } from '@playwright/test';

export class WebUiSimulationPage {
  readonly page: Page;
  readonly simulationTextEditor: Locator;
  readonly responseBodyEditor: Locator;
  readonly requestEditor: Locator;

  readonly requestTabContentMethod: Locator;
  readonly requestTabContentScheme: Locator;
  readonly requestTabContentDestination: Locator;
  readonly requestTabContentPath: Locator;
  readonly requestTabContentQuery: Locator;
  readonly requestTabContentHeaders: Locator;
  readonly requestTabContentBody: Locator;

  constructor(page: Page) {
    this.page = page;
    this.simulationTextEditor = page.getByTestId('text-editor');
    this.responseBodyEditor = page.getByTestId('response-body-editor');
    this.requestEditor = page.getByTestId('request-editor');
    this.requestTabContentMethod = page.getByTestId('tab-content-method');
    this.requestTabContentScheme = page.getByTestId('tab-content-scheme');
    this.requestTabContentDestination = page.getByTestId('tab-content-destination');
    this.requestTabContentPath = page.getByTestId('tab-content-path');
    this.requestTabContentQuery = page.getByTestId('tab-content-query');
    this.requestTabContentHeaders = page.getByTestId('tab-content-headers');
    this.requestTabContentBody = page.getByTestId('tab-content-body');
  }

  /**
   * Load Web UI page with a default state if needed
   */
  async goto(initialJson?: string) {
    if (initialJson) {
      await this.page.addInitScript((arg) => {
        window.localStorage.setItem('content', JSON.stringify(arg));
      }, initialJson);
    }

    await this.page.goto('/');
    await expect(this.page.getByText('Simulations')).toBeVisible();
  }

  /**
   * Use clipboard to fill monaco editor as it is not an HTML <input>
   */
  async setTextEditorContent(editor: Locator, json: string) {
    await editor.click();
    await editor.pressSequentially(json);
  }

  /**
   * Use clipboard to get monaco editor value as it is not an HTML <input>
   */
  async getTextEditorContent(editor: Locator) {
    const macOS = process.platform === 'darwin'; // To rework

    await editor.click();
    await this.page.keyboard.press('Control+KeyA');
    await this.page.keyboard.press('Control+KeyC');
    await this.page.keyboard.press(macOS ? 'Meta+KeyC' : 'Control+KeyC');

    return await this.page.evaluate<string>('navigator.clipboard.readText()');
  }

  async selectMatcherOption(tab: Locator, optionLabel: string) {
    await tab.getByLabel('Matcher').click();
    await this.page.getByText(optionLabel, { exact: true }).click();
  }

  getMatcherInput(nth = 0) {
    return this.page.getByLabel('Value').nth(nth);
  }

  getAddMatcherButton(nth = 0) {
    return this.page.getByTestId('add-matcher-button').nth(nth);
  }
}
