import { expect } from '@playwright/test';

export default {
  meta: expect.objectContaining({
    schemaVersion: 'v5.2',
    hoverflyVersion: 'v1.6.0',
    timeExported: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/),
  }),
  data: expect.objectContaining({
    pairs: [],
  }),
};
