// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect:
  {
    timeout: 40*1000,
  },
  reporter: 'html',

  use: {
    headless: false,
    browserName: 'chromium',
    trace: 'retain-on-failure',

    
  },

  
});

