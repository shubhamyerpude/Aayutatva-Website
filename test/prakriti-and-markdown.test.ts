import test from 'node:test';
import assert from 'node:assert/strict';
import {
  safeEncodeURIComponent,
  parseAyurvedicMarkdown,
  computeInChatPrakritiAnalysis,
  isPrakritiQuizRequest,
  IN_CHAT_PRAKRITI_QUESTIONS
} from '../src/ayurvedicInternalEngine.ts';

// ============================================================================
// SUITE 1: REPRODUCTION & VERIFICATION OF ATTACHED SCREENSHOT ERROR
// ============================================================================

test('Test 1: Reproduction check - WhatsApp link with percentage encoded parameters must not leak raw URL characters into text', () => {
  const analysis = computeInChatPrakritiAnalysis(['Vata', 'Vata', 'Pitta', 'Pitta', 'Kapha'], 'mr');
  const renderedHtml = parseAyurvedicMarkdown(analysis.reply);

  // In the attached screenshot, "%20%E0%A4%86%E0%A4%B2%E0%A5%80..." was visible as raw text outside the anchor tag
  assert.ok(
    !renderedHtml.includes('करा%20%E0'),
    'Raw percent-encoded text must not leak outside the anchor tag'
  );
  
  // Extract all text outside of <a>...</a> tags:
  const textOutsideAnchors = renderedHtml.replace(/<a\b[^>]*>.*?<\/a>/g, '');
  assert.ok(
    !textOutsideAnchors.includes('%20%E0'),
    'Percent-encoded Marathi words must remain strictly inside href attributes and never leak into outer text'
  );

  assert.ok(
    renderedHtml.includes('<a href="https://wa.me/917758816074?text='),
    'Anchor tag for WhatsApp must be correctly formed with valid href'
  );
});

test('Test 2: safeEncodeURIComponent must safely escape parentheses, quotes, and asterisks', () => {
  const input = "माझी प्रकृती (वात: 40%, पित्त: 40%, कफ: 20%) *महत्त्वाची* 'चाचणी'";
  const encoded = safeEncodeURIComponent(input);

  assert.ok(!encoded.includes('('), 'Unencoded open parenthesis must not be present');
  assert.ok(!encoded.includes(')'), 'Unencoded close parenthesis must not be present');
  assert.ok(encoded.includes('%28'), 'Open parenthesis must be encoded as %28');
  assert.ok(encoded.includes('%29'), 'Close parenthesis must be encoded as %29');
  assert.ok(!encoded.includes("'"), "Single quote must not be unencoded");
  assert.ok(!encoded.includes('*'), 'Asterisk must not be unencoded');
});

test('Test 3: parseAyurvedicMarkdown parses standard markdown links into HTML anchors', () => {
  const md = '[Google](https://google.com)';
  const html = parseAyurvedicMarkdown(md);
  assert.strictEqual(
    html,
    '<a href="https://google.com" target="_blank" rel="noopener noreferrer" style="color:#1b3b22;font-weight:700;text-decoration:underline;">Google</a>'
  );
});

test('Test 4: parseAyurvedicMarkdown parses links with telephone schemes', () => {
  const md = '📞 [**कॉल करा: +91 77588 16074**](tel:+917758816074)';
  const html = parseAyurvedicMarkdown(md);
  assert.ok(html.includes('href="tel:+917758816074"'));
  assert.ok(html.includes('<b>कॉल करा: +91 77588 16074</b>'));
});

test('Test 5: parseAyurvedicMarkdown handles side-by-side links on the same line', () => {
  const md = '📞 [कॉल](tel:+917758816074) | 💬 [व्हॉट्सॲप](https://wa.me/917758816074?text=Hello)';
  const html = parseAyurvedicMarkdown(md);

  const phoneMatches = html.match(/href="tel:\+917758816074"/g);
  const waMatches = html.match(/href="https:\/\/wa\.me\/917758816074\?text=Hello"/g);

  assert.strictEqual(phoneMatches?.length, 1, 'Phone link should appear exactly once');
  assert.strictEqual(waMatches?.length, 1, 'WhatsApp link should appear exactly once');
  assert.ok(html.includes('|'), 'Separator pipe must remain intact');
});

test('Test 6: Markdown headings ### and #### are correctly converted', () => {
  const md = '### मुख्य शीर्षक\n#### उपशीर्षक\nसामान्य मजकूर';
  const html = parseAyurvedicMarkdown(md);
  assert.ok(html.includes('<b style="display:block;margin-bottom:6px;color:#1b3b22;font-size:13px">मुख्य शीर्षक</b>'));
  assert.ok(html.includes('<b style="display:block;margin-top:8px;margin-bottom:4px;color:#274b2a;font-size:12px">उपशीर्षक</b>'));
});

test('Test 7: Markdown blockquotes and formatting are converted', () => {
  const md = '> आयुर्वेदाचे सुप्रसिद्ध वचन\n**ठळक अक्षरे** आणि *तिरपे अक्षरे*';
  const html = parseAyurvedicMarkdown(md);
  assert.ok(html.includes('<blockquote'));
  assert.ok(html.includes('<b>ठळक अक्षरे</b>'));
  assert.ok(html.includes('<em>तिरपे अक्षरे</em>'));
});

test('Test 8: Double and single line breaks are converted to HTML br tags', () => {
  const md = 'पहिला परिच्छेद\n\nदुसरा परिच्छेद\nतिसरी ओळ';
  const html = parseAyurvedicMarkdown(md);
  assert.ok(html.includes('<br/><br/>'));
  assert.ok(html.includes('<br/>'));
});

// ============================================================================
// SUITE 2: IN-CHAT PRAKRITI QUIZ ENGINE & CONSTITUTION COMPUTATION
// ============================================================================

test('Test 9: Pure Vata constitution calculation (5 Vata answers)', () => {
  const result = computeInChatPrakritiAnalysis(['Vata', 'Vata', 'Vata', 'Vata', 'Vata'], 'mr');
  assert.strictEqual(result.dominant, 'Vata');
  assert.strictEqual(result.vata, 100);
  assert.strictEqual(result.pitta, 0);
  assert.strictEqual(result.kapha, 0);
  assert.ok(result.pulseGati.includes('सर्प गती'));
  assert.ok(result.reply.includes('वात प्रधान प्रकृती'));
});

test('Test 10: Pure Pitta constitution calculation (5 Pitta answers)', () => {
  const result = computeInChatPrakritiAnalysis(['Pitta', 'Pitta', 'Pitta', 'Pitta', 'Pitta'], 'mr');
  assert.strictEqual(result.dominant, 'Pitta');
  assert.strictEqual(result.vata, 0);
  assert.strictEqual(result.pitta, 100);
  assert.strictEqual(result.kapha, 0);
  assert.ok(result.pulseGati.includes('मण्डूक गती'));
  assert.ok(result.reply.includes('पित्त प्रधान प्रकृती'));
});

test('Test 11: Pure Kapha constitution calculation (5 Kapha answers)', () => {
  const result = computeInChatPrakritiAnalysis(['Kapha', 'Kapha', 'Kapha', 'Kapha', 'Kapha'], 'mr');
  assert.strictEqual(result.dominant, 'Kapha');
  assert.strictEqual(result.vata, 0);
  assert.strictEqual(result.pitta, 0);
  assert.strictEqual(result.kapha, 100);
  assert.ok(result.pulseGati.includes('हंस गती'));
  assert.ok(result.reply.includes('कफ प्रधान प्रकृती'));
});

test('Test 12: Dual Vata-Pitta constitution calculation (3 Vata, 2 Pitta)', () => {
  const result = computeInChatPrakritiAnalysis(['Vata', 'Vata', 'Vata', 'Pitta', 'Pitta'], 'mr');
  assert.strictEqual(result.dominant, 'Vata-Pitta');
  assert.strictEqual(result.vata, 60);
  assert.strictEqual(result.pitta, 40);
  assert.strictEqual(result.kapha, 0);
  assert.ok(result.pulseGati.includes('सर्प-मण्डूक गती'));
  assert.ok(result.reply.includes('द्विदोषात्मक'));
});

test('Test 13: Dual Pitta-Kapha constitution calculation (3 Pitta, 2 Kapha)', () => {
  const result = computeInChatPrakritiAnalysis(['Pitta', 'Pitta', 'Pitta', 'Kapha', 'Kapha'], 'mr');
  assert.strictEqual(result.dominant, 'Pitta-Kapha');
  assert.strictEqual(result.vata, 0);
  assert.strictEqual(result.pitta, 60);
  assert.strictEqual(result.kapha, 40);
  assert.ok(result.pulseGati.includes('मण्डूक-हंस गती'));
  assert.ok(result.reply.includes('द्विदोषात्मक'));
});

test('Test 14: Dual Vata-Kapha constitution calculation (3 Kapha, 2 Vata)', () => {
  const result = computeInChatPrakritiAnalysis(['Kapha', 'Kapha', 'Kapha', 'Vata', 'Vata'], 'mr');
  assert.ok(result.dominant.includes('Kapha') && result.dominant.includes('Vata'));
  assert.ok(result.pulseGati.includes('सर्प-हंस गती'));
});

test('Test 15: Hindi language output generates accurate Hindi pulse and dietary advice', () => {
  const result = computeInChatPrakritiAnalysis(['Pitta', 'Pitta', 'Vata', 'Vata', 'Pitta'], 'hi');
  assert.ok(result.reply.includes('आपका देह प्रकृति परीक्षण'));
  assert.ok(result.reply.includes('आयुतत्व हॉस्पिटल, भंडारा'));
  assert.ok(result.reply.includes('https://wa.me/917758816074?text='));
});

test('Test 16: English language output generates accurate English pulse and dietary advice', () => {
  const result = computeInChatPrakritiAnalysis(['Vata', 'Pitta', 'Kapha', 'Vata', 'Vata'], 'en');
  assert.ok(result.reply.includes('Your Prakriti & Nadi Evaluation is Complete!'));
  assert.ok(result.reply.includes('AayuTatva Ayurvedic Hospital, Bhandara'));
  assert.ok(result.reply.includes('https://wa.me/917758816074?text='));
});

// ============================================================================
// SUITE 3: PRAKRITI QUESTION INTEGRITY & USER-FACING CLEANLINESS
// ============================================================================

test('Test 17: Marathi question list contains exactly 5 well-formed questions', () => {
  const mrQuestions = IN_CHAT_PRAKRITI_QUESTIONS.mr;
  assert.strictEqual(mrQuestions.length, 5, 'Must have exactly 5 questions');
  mrQuestions.forEach((q, idx) => {
    assert.ok(q.id, `Question ${idx} must have an id`);
    assert.ok(q.title.length > 5, `Question ${idx} must have a descriptive title`);
    assert.strictEqual(q.options.length, 3, `Question ${idx} must have 3 options`);
  });
});

test('Test 18: Hindi question list contains exactly 5 well-formed questions', () => {
  const hiQuestions = IN_CHAT_PRAKRITI_QUESTIONS.hi;
  assert.strictEqual(hiQuestions.length, 5);
  hiQuestions.forEach((q, idx) => {
    assert.ok(q.id);
    assert.strictEqual(q.options.length, 3);
  });
});

test('Test 19: English question list contains exactly 5 well-formed questions', () => {
  const enQuestions = IN_CHAT_PRAKRITI_QUESTIONS.en;
  assert.strictEqual(enQuestions.length, 5);
  enQuestions.forEach((q, idx) => {
    assert.ok(q.id);
    assert.strictEqual(q.options.length, 3);
  });
});

test('Test 20: Options must NOT reveal dosha names to prevent biased answering', () => {
  const mrQuestions = IN_CHAT_PRAKRITI_QUESTIONS.mr;
  mrQuestions.forEach(q => {
    q.options.forEach(opt => {
      // Option labels should describe physical/mental signs, not mention 'वात दोष', 'पित्त दोष', etc.
      assert.ok(
        !opt.label.startsWith('वात दोष'),
        `Option label must be unbiased: "${opt.label}"`
      );
      assert.ok(
        !opt.label.startsWith('पित्त दोष'),
        `Option label must be unbiased: "${opt.label}"`
      );
      assert.ok(
        !opt.label.startsWith('कफ दोष'),
        `Option label must be unbiased: "${opt.label}"`
      );
    });
  });
});

test('Test 21: Every option maps to a valid Dosha type (Vata, Pitta, or Kapha)', () => {
  const validDoshas = new Set(['Vata', 'Pitta', 'Kapha']);
  ['mr', 'hi', 'en'].forEach(lang => {
    IN_CHAT_PRAKRITI_QUESTIONS[lang as 'mr' | 'hi' | 'en'].forEach(q => {
      const assigned = q.options.map(o => o.dosha);
      assert.strictEqual(assigned.length, 3);
      assigned.forEach(d => assert.ok(validDoshas.has(d)));
      assert.strictEqual(new Set(assigned).size, 3, 'Each question must offer Vata, Pitta, and Kapha options');
    });
  });
});

// ============================================================================
// SUITE 4: INTENT RECOGNITION (isPrakritiQuizRequest)
// ============================================================================

test('Test 22: isPrakritiQuizRequest recognizes Marathi user requests', () => {
  assert.ok(isPrakritiQuizRequest('प्रकृती क्विझ सुरू करा'));
  assert.ok(isPrakritiQuizRequest('माझी देह प्रकृती तपासायची आहे'));
  assert.ok(isPrakritiQuizRequest('माझे त्रिदोष प्रमाण सांगा'));
  assert.ok(isPrakritiQuizRequest('दोष क्विझ'));
});

test('Test 23: isPrakritiQuizRequest recognizes Hindi user requests', () => {
  assert.ok(isPrakritiQuizRequest('प्रकृति क्विज शुरू करें'));
  assert.ok(isPrakritiQuizRequest('मुझे अपनी त्रिदोष प्रकृति जाननी है'));
});

test('Test 24: isPrakritiQuizRequest recognizes English user requests', () => {
  assert.ok(isPrakritiQuizRequest('Start prakriti quiz'));
  assert.ok(isPrakritiQuizRequest('I want to take the dosha quiz'));
  assert.ok(isPrakritiQuizRequest('Check my constitution quiz'));
});

test('Test 25: isPrakritiQuizRequest does not false-trigger on standard clinical questions', () => {
  assert.strictEqual(isPrakritiQuizRequest('मला स्लिप डिस्क आणि सायटिकाचा त्रास आहे'), false);
  assert.strictEqual(isPrakritiQuizRequest('गुडघेदुखीवर कोणता उपचार करावा?'), false);
  assert.strictEqual(isPrakritiQuizRequest('How does Cashless Mediclaim work?'), false);
  assert.strictEqual(isPrakritiQuizRequest('कटी बस्ती उपचार कसा करतात?'), false);
});

// ============================================================================
// SUITE 5: COMPREHENSIVE END-TO-END RENDER PIPELINE
// ============================================================================

test('Test 26: Full end-to-end test - Quiz completion in Marathi produces valid, non-corrupt HTML with clickable links', () => {
  const answers: ('Vata' | 'Pitta' | 'Kapha')[] = ['Vata', 'Pitta', 'Vata', 'Pitta', 'Kapha'];
  const analysis = computeInChatPrakritiAnalysis(answers, 'mr');
  const renderedHtml = parseAyurvedicMarkdown(analysis.reply);

  // Assertions for end-to-end safety
  assert.ok(renderedHtml.includes('<b>आपली शारीरिक प्रकृती</b>'));
  assert.ok(renderedHtml.includes('वात: <b>40%</b> | पित्त: <b>40%</b> | कफ: <b>20%</b>'));
  assert.ok(renderedHtml.includes('href="tel:+917758816074"'));
  assert.ok(renderedHtml.includes('href="https://wa.me/917758816074?text='));
  assert.ok(!renderedHtml.includes('undefined'));
  assert.ok(!renderedHtml.includes('NaN'));
  assert.ok(!renderedHtml.includes('करा%20%E0'));
});
