import { test, expect } from '@playwright/test';
import empty from './test-data/input/empty';
import { WebUiSimulationPage } from './utils/WebUiSimulationPage';
import expectedComplete from './test-data/output/expected-complete';
import expectedStartFromScratch from './test-data/output/expected-start-from-scratch';
import { simulationWithContentType } from './test-data/input/simulation-with-content-type';
import { expectContentTypeUpdated } from './test-data/output/expected-content-type-updated';
import { expectedMinifiedResponse } from './test-data/output/expected-minified-response';
import { simulationWithPrettyResponse } from './test-data/input/simulation-with-pretty-response';

test('should display a simulation example on first app launch', async ({
  page,
}) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto();

  await expect(page.getByText('0 - GET /api/users →️ 200')).toBeVisible();
});

test('should be able to start from scratch when simulation is invalid', async ({
  page,
}) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(
    JSON.stringify({ data: 'invalid simulation JSON' }),
  );

  await page.getByRole('button', { name: 'Reset simulation' }).click();

  const textEditorContent = await simulationPage.getTextEditorContent(
    simulationPage.simulationTextEditor,
  );
  expect(JSON.parse(textEditorContent)).toMatchObject(expectedStartFromScratch);
});

test('should create a full simulation', async ({ page }) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(JSON.stringify(empty));

  await test.step('Create new simulation', async () => {
    await page
      .getByRole('button', { name: 'Add request/response pair' })
      .click();
    await page.getByText('0 - →️ 200').click();
  });

  await test.step('Edit request HTTP method', async () => {
    await page.getByRole('tab', { name: 'Method' }).click();
    const currentTab = simulationPage.requestTabContentMethod;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for method' })
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'Glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('GET');
  });

  await test.step('Edit request HTTP Scheme', async () => {
    await page.getByRole('tab', { name: 'Scheme' }).click();
    const currentTab = simulationPage.requestTabContentScheme;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for scheme' })
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'Glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('http');
  });

  await test.step('Edit request HTTP Destination', async () => {
    await page.getByRole('tab', { name: 'Destination' }).click();
    const currentTab = simulationPage.requestTabContentDestination;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for destination' })
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'Glob');
    await currentTab
      .locator(simulationPage.getMatcherInput())
      .fill('mock.api.com');
  });

  await test.step('Edit request HTTP Path', async () => {
    await page.getByRole('tab', { name: 'Path' }).click();
    const currentTab = simulationPage.requestTabContentPath;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for path' })
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'Glob');
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
    await currentTab
      .locator(page.getByRole('button', { name: 'Add', exact: true }))
      .click();
    await currentTab
      .locator(
        page.getByRole('button', {
          name: "Add first field matcher for query 'param1'",
        }),
      )
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'Glob');
    await currentTab.locator(simulationPage.getMatcherInput()).fill('value1');

    await currentTab
      .locator(page.getByPlaceholder('Enter the name of the new query'))
      .fill('param2');
    await currentTab
      .locator(page.getByRole('button', { name: 'Add', exact: true }))
      .click();
    await currentTab
      .locator(
        page.getByRole('button', {
          name: "Add first field matcher for query 'param2'",
        }),
      )
      .click();
    await currentTab.locator(simulationPage.getMatcherInput()).fill('value2');

    await currentTab.locator(simulationPage.getAddMatcherButton()).click();
    await currentTab.locator(simulationPage.getMatcherInput(1)).fill('value3');
  });

  await test.step('Edit request HTTP Headers', async () => {
    await page.getByRole('tab', { name: 'Headers' }).click();
    const currentTab = simulationPage.requestTabContentHeaders;
    await currentTab
      .locator(page.getByPlaceholder('Enter the name of the new header'))
      .fill('header1');
    await currentTab
      .locator(page.getByRole('button', { name: 'Add', exact: true }))
      .click();
    await currentTab
      .locator(
        page.getByRole('button', {
          name: "Add first field matcher for header 'header1'",
        }),
      )
      .click();

    await currentTab
      .locator(simulationPage.getMatcherInput())
      .fill('valueheader1');
    await currentTab.getByLabel('Advanced options').click();
    await page.getByText('Ignore Unknown').click();
    await page.getByText('Ignore Order').click();
    await page.getByText('Ignore Occurrences').click();
  });

  await test.step('Edit request HTTP Body', async () => {
    await page.getByRole('tab', { name: 'Body' }).click();
    const currentTab = simulationPage.requestTabContentBody;
    await currentTab
      .getByRole('button', { name: 'Add first field matcher for body' })
      .click();
    await simulationPage.selectMatcherOption(currentTab, 'JSON Partial');
    await simulationPage.appendTextToEditor(
      currentTab.locator(simulationPage.requestEditor),
      '{ "field1": "value1" }',
    );
  });

  await test.step('Edit response HTTP Body', async () => {
    await simulationPage.appendTextToEditor(
      simulationPage.responseBodyEditor,
      '{ "response": "body" }',
    );

    await page.getByText('Prettify').click();
    await page.getByLabel('Status').click();
    await page.getByText('204').click();

    await page.getByText('Encoded body').click();
    await page.getByRole('button', { name: 'Delay' }).click();
    await page.getByLabel('Fixed Delay (ms)').fill('500');
  });

  await test.step('Edit response HTTP headers', async () => {
    // Delete a header
    await page.getByRole('button', { name: 'Add header' }).click();
    await page.getByLabel('Header name').fill('a header to be');
    await page.getByLabel('Header value').fill('removed');
    await page.getByText('Submit').click();
    await page.getByLabel('Delete response header').click();

    // Add header (fill with keyboard)
    await page.getByRole('button', { name: 'Add header' }).click();
    await page.getByLabel('Header name').fill('Content-type');
    await page.getByLabel('Header name').press('Tab');
    await page.getByLabel('Header value').fill('application/json');
    await page.getByLabel('Header value').press('Enter');
    await expect(
      page.getByText('Content-type: application/json'),
    ).toBeVisible();

    // Edit header
    await page.getByText('Content-type: application/json').click();
    await page.getByLabel('Header name').last().fill('Content-Type');
    await page.getByText('Submit').last().click();
    await expect(
      page.getByText('Content-Type: application/json'),
    ).toBeVisible();

    // Add another header (with multiple values)
    await page.getByRole('button', { name: 'Add header' }).click();
    await page.getByLabel('Header name').last().fill('Cache-control');
    await page
      .getByLabel('Header value')
      .last()
      .fill('max-age=604800&must-revalidate');
    await page.getByText('Submit').last().click();
    await expect(
      page.getByText('Cache-control: max-age=604800,must-revalidate'),
    ).toBeVisible();
  });

  await test.step('Assert text editor content is correct', async () => {
    await expect(
      page.getByText('0 - GET http mock.api.com path1 →️ 204'),
    ).toBeVisible();

    const textEditorContent = await simulationPage.getTextEditorContent(
      simulationPage.simulationTextEditor,
    );

    expect(JSON.parse(textEditorContent)).toMatchObject(expectedComplete);
  });
});

test('Content-type headers should update when body change', async ({
  page,
}) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(JSON.stringify(simulationWithContentType));

  await page.getByRole('button', { name: '- →️ 200' }).click();

  await simulationPage.appendTextToEditor(
    simulationPage.responseBodyEditor,
    ', how is it going ?',
  );

  const textEditorContent = await simulationPage.getTextEditorContent(
    simulationPage.simulationTextEditor,
  );
  expect(JSON.parse(textEditorContent)).toMatchObject(expectContentTypeUpdated);
});

test('Should be able to minify JSON', async ({ page }) => {
  const simulationPage = new WebUiSimulationPage(page);
  await simulationPage.goto(JSON.stringify(simulationWithPrettyResponse));

  await page.getByRole('button', { name: '- →️ 200' }).click();
  await page.getByRole('button', { name: 'Minify' }).click();

  const textEditorContent = await simulationPage.getTextEditorContent(
    simulationPage.simulationTextEditor,
  );
  expect(JSON.parse(textEditorContent)).toMatchObject(expectedMinifiedResponse);
});
