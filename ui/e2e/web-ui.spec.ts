import { test, expect } from '@playwright/test';
import empty from './test-data/input/empty';
import { WebUiSimulationPage } from './utils/WebUiSimulationPage';
import expectedComplete from './test-data/output/expected-complete';
import expectedStartFromScratch from './test-data/output/expected-start-from-scratch';

test('should display a simulation example on first app launch', async ({ page }) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto();

  await expect(page.getByText('0 - GET /api/users →️ 200')).toBeVisible();
});

test('should be able to start from scratch when simulation is invalid', async ({ page }) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(JSON.stringify({ data: 'invalid simulation JSON' }));

  await page.getByRole('button', { name: 'Reset simulation' }).click();

  const textEditorContent = await simulationPage.getTextEditorContent(
    simulationPage.simulationTextEditor
  );
  expect(JSON.parse(textEditorContent)).toMatchObject(expectedStartFromScratch);
});

test('should create a full simulation', async ({ page }) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(JSON.stringify(empty));

  await test.step('Create new simulation', async () => {
    await page.getByRole('button', { name: 'Add request/response pair' }).click();
    await page.getByText('0 - →️ 200').click();
  });

  await test.step('Edit request HTTP method', async () => {
    await page.getByRole('tab', { name: 'Method' }).click();
    const currentTab = simulationPage.requestTabContentMethod;
    await currentTab.getByRole('button', { name: 'Add first field matcher for method' }).click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('GET');
  });

  await test.step('Edit request HTTP Scheme', async () => {
    await page.getByRole('tab', { name: 'Scheme' }).click();
    const currentTab = simulationPage.requestTabContentScheme;
    await currentTab.getByRole('button', { name: 'Add first field matcher for scheme' }).click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('http');
  });

  await test.step('Edit request HTTP Destination', async () => {
    await page.getByRole('tab', { name: 'Destination' }).click();
    const currentTab = simulationPage.requestTabContentDestination;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for destination' })
      .click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('mock.api.com');
  });

  await test.step('Edit request HTTP Path', async () => {
    await page.getByRole('tab', { name: 'Path' }).click();
    const currentTab = simulationPage.requestTabContentPath;
    await currentTab.getByRole('button', { name: 'Add first field matcher for method' }).click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('path1');

    await currentTab.locator(simulationPage.getAddMatcherButton()).click();
    await currentTab.locator(simulationPage.getMatcherInput(1)).fill('path2');
  });

  await test.step('Edit request HTTP Query params', async () => {
    await page.getByRole('tab', { name: 'Query Params' }).click();
    const currentTab = simulationPage.requestTabContentQuery;
    await currentTab
      .locator(page.getByPlaceholder('Enter the name of the new query'))
      .fill('param1');
    await currentTab.locator(page.getByRole('button', { name: 'Add', exact: true })).click();
    await currentTab
      .locator(page.getByRole('button', { name: "Add first field matcher for query 'param1'" }))
      .click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('value1');

    await currentTab
      .locator(page.getByPlaceholder('Enter the name of the new query'))
      .fill('param2');
    await currentTab.locator(page.getByRole('button', { name: 'Add', exact: true })).click();
    await currentTab
      .locator(page.getByRole('button', { name: "Add first field matcher for query 'param2'" }))
      .click();
    await currentTab.locator(simulationPage.getMatcherInput(1)).fill('value2');

    await currentTab.locator(simulationPage.getAddMatcherButton(1)).click();
    await currentTab.locator(simulationPage.getMatcherInput(2)).fill('value3');
  });

  await test.step('Edit request HTTP Headers', async () => {
    await page.getByRole('tab', { name: 'Headers' }).click();
    const currentTab = simulationPage.requestTabContentHeaders;
    await currentTab
      .locator(page.getByPlaceholder('Enter the name of the new header'))
      .fill('header1');
    await currentTab.locator(page.getByRole('button', { name: 'Add', exact: true })).click();
    await currentTab
      .locator(page.getByRole('button', { name: "Add first field matcher for header 'header1'" }))
      .click();

    await currentTab.locator(simulationPage.getMatcherInput()).fill('valueheader1');
    await currentTab.locator(page.getByText('Ignore Unknown')).click();
    await currentTab.locator(page.getByText('Ignore Order')).click();
    await currentTab.locator(page.getByText('Ignore Occurrences')).click();
  });

  await test.step('Edit request HTTP Body', async () => {
    await page.getByRole('tab', { name: 'Body' }).click();
    const currentTab = simulationPage.requestTabContentBody;
    await currentTab.getByRole('button', { name: 'Add first field matcher for body' }).click();
    await currentTab.locator(simulationPage.getSelectMatcherType()).selectOption('jsonPartial');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('{ "field1": "value1" }');
  });

  await test.step('Edit response HTTP Body', async () => {
    await simulationPage.setTextEditorContent(
      simulationPage.responseBodyEditor,
      '{ "response": "body" }'
    );
    await page.getByText('Prettify').click();
    await page.getByTestId('response-status-select').selectOption('204');
  });

  await test.step('Assert text editor content is correct', async () => {
    await expect(page.getByText('0 - GET http mock.api.com path1 →️ 204')).toBeVisible();

    const textEditorContent = await simulationPage.getTextEditorContent(
      simulationPage.simulationTextEditor
    );

    expect(JSON.parse(textEditorContent)).toMatchObject(expectedComplete);
  });
});
