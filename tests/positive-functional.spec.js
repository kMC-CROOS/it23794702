const { test, expect } = require('@playwright/test');

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
    expect(actualOutput.trim()).toContain(expectedOutput);

  } finally {
    await testInfo.attach('test-data', {
      body: JSON.stringify(
        { input, actual: actualOutput.trim(), expected: expectedOutput },
        null,
        2
      ),
      contentType: 'application/json'
    });
  }
}

/* ---------------- Positive functional test cases (Appendix 2: Pos_Fun_xxxx) ---------------- */

test('Pos_Fun_0001: Greeting sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'kaalai vanakkam',
    'காலை வணக்கம்'
  );
});

test('Pos_Fun_0002: Travel question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nee',
    'நீ எங்க போய் நீவந்திருக்க'
  );
});

test('Pos_Fun_0003: Future tense sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nan rathiri poga poren',
    'நான் இராத்திரி போகப் போகிறேன்'
  );
});

test('Pos_Fun_0004: Weather observation', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'innikku naalai mazhai varum',
    'இன்றிக்கு நாளை மழை வரும்'
  );
});

test('Pos_Fun_0005: Daily routine', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'avan kaalaiyil vazhthi padikirar',
    'அவன் காலை வழுதி படிக்கிறார்'
  );
});

test('Pos_Fun_0006: Food sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naan saapadu thaan pidikiren',
    'நான் சாப்பாடு தான் பிடிக்கிறேன்'
  );
});

test('Pos_Fun_0007: School activity', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'pasanga playground la kalikkiranga',
    'பசங்க் பிளேக்ரவுண்ட் லா களிக்கிறாங்க'
  );
});

test('Pos_Fun_0008: Emotional expression', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'manam santhosham aayiduchu',
    'மனம் சந்தோஷம் ஆனது'
  );
});

test('Pos_Fun_0009: Work sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'aval velaiyai sariyaga seithal',
    'அவள் வேலையை சரியாக செய்தாள்'
  );
});

test('Pos_Fun_0010: Simple exclamation', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'sundaram!',
    'சுந்தரம்!'
  );
});

test('Pos_Fun_0011: Advice sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nalladhu seyyungal',
    'நல்லது செய்யுங்கள்'
  );
});

test('Pos_Fun_0012: Question about time', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'ippa mani enna aayiduchu',
    'இப்ப மணி என்ன ஆனது'
  );
});

test('Pos_Fun_0013: Travel plan', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'naliku nan pondraen kodaikanal',
    'நாளைக்கு நான் போகிறேன் கோடைக்கானல்'
  );
});

test('Pos_Fun_0014: Poetic line', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'malargal pozhiyum kadalil',
    'மலர்கள் பொழியும் கடலில்'
  );
});

test('Pos_Fun_0015: Nature description', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'kadal theeram alayudhu',
    'கடல் தெரம் அலையுது'
  );
});

test('Pos_Fun_0016: Asking for help', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enna udhavi seivanga',
    'என்ன உதவி செய்வாங்க'
  );
});

test('Pos_Fun_0017: Positive quote', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'unarchigal periyathu',
    'உணர்ச்சிகள் பெரியது'
  );
});

test('Pos_Fun_0018: Family sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'annan vela seithan',
    'அண்ணன் வேலா செய்தான்'
  );
});

test('Pos_Fun_0019: Daily question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'neenga saapattukku ready ah',
    'நீங்கள் சாப்பாட்டுக்கு ரெடி ஆஹ்'
  );
});

test('Pos_Fun_0020: Emotional question', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nee santhosham aa irukkinga',
    'நீ சந்தோஷம் ஆ இருக்கிறாய்'
  );
});

test('Pos_Fun_0021: Future intention', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'nan padikka poren',
    'நான் படிக்கப் போகிறேன்'
  );
});

test('Pos_Fun_0022: Observation sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'poo virundhugal romba azhaga irukku',
    'பூ விருந்து கள் ரொம்ப அழகா இருக்கு'
  );
});

test('Pos_Fun_0023: Exclamation of wonder', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'ammaa enna azhaga irukku',
    'அம்மா என்ன அழகா இருக்கு'
  );
});

test('Pos_Fun_0024: Possessive sentence', async ({ page }, testInfo) => {
  await runTest(page, testInfo,
    'enga veedu romba periya veedu',
    'எங்க வீடு ரொம்ப பெரிய வீடு'
  );
});
