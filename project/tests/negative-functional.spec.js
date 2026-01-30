const { test, expect } = require('@playwright/test');

async function typeAndConvert(page, text) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.type(text, { delay: 100 });
  await inputBox.press(' ');
  await inputBox.press('Backspace');
  await page.waitForTimeout(800);
  return await inputBox.inputValue();
}

async function clearTextarea(page) {
  const inputBox = page.locator('textarea');
  await inputBox.click();
  await inputBox.press('Control+A');
  await inputBox.press('Delete');
  await page.waitForTimeout(300);
}

test.describe('Negative Functional Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://tamil.changathi.com/');
    await page.waitForLoadState('networkidle');
  });

  async function runTest(page, testInfo, input, expectedOutput) {
    let actualOutput = '';

    try {
      await page.goto('https://tamil.changathi.com', {
        waitUntil: 'domcontentloaded'
      });

      const inputBox = page.locator('textarea, input[type="text"]').first();
      await inputBox.click();
      await inputBox.fill('');
      await inputBox.type(input + ' ', { delay: 80 });
      await page.waitForTimeout(2000);

      actualOutput = await inputBox.inputValue();

      if (expectedOutput) {
        expect(actualOutput.trim()).toContain(expectedOutput);
      } else {
        const hasTamil = /[\u0B80-\u0BFF]/.test(actualOutput);
        expect(hasTamil).toBe(true);
      }

    } finally {
      await testInfo.attach('test-data', {
        body: JSON.stringify(
          { input, actual: actualOutput.trim(), expected: expectedOutput || '<any Tamil>' },
          null,
          2
        ),
        contentType: 'application/json'
      });
    }
  }

  /* ---------------- NEGATIVE TEST CASES (structure like positive) ---------------- */

  test('Fail_IO_N001: Joined words - naanapookkali', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'naanapookkali', '');
  });

  test('Fail_IO_N002: Joined words - vanakkamennakku', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'vanakkamennakku', '');
  });

  test('Fail_IO_N003: Joined words - eppadithaalum', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'eppadithaalum', '');
  });

  test('Fail_IO_N004: Slang - yo vanakkam da', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'yo vanakkam da', '');
  });

  test('Fail_IO_N005: Slang - oru katta kai po', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'oru katta kai po', '');
  });

  test('Fail_IO_N006: Long paragraph - first part', async ({ page }, testInfo) => {
    const text = 'naan oru student aan padipukkarai engineering college vala naan irukkiren computer science branch padippu seiyum appadi naan oru nalla student aan padippu vella student kum tuitionum kodukkaren';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N007: Long paragraph - second part', async ({ page }, testInfo) => {
    const text = 'aval oru kattikai aan padippu seiyum school vala appadi iruppaa teacher aaganum niya irukkaa padippu seiyum appoadi engineer aaganum venum naa industry vala vaalkai katharkkakum kovarkkum appadi seiyum';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N008: Long paragraph - third part', async ({ page }, testInfo) => {
    const text = 'avan oru good doctor aan vaalkai katharkkaren appo appadi hospital vala vaalkai katharkkaren patient kum medicine kodukkaren naa appadi venum padippu seiyum school vala doctor aan padippukkarai medical college vala';
    await runTest(page, testInfo, text, '');
  });

  test('Fail_IO_N009: Formatting - multiple spaces', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'vanakkam  naan sari', '');
  });

  test('Fail_IO_N010: Formatting - special characters', async ({ page }, testInfo) => {
    await runTest(page, testInfo, 'enna-seiyum-naa', '');
  });

});