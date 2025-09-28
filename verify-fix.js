#!/usr/bin/env node

// Final verification that subtitle fix is working
console.log('🔍 Verifying subtitle fix in built HTML...\n');

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'out/posts/index.html');

if (!fs.existsSync(htmlPath)) {
  console.log('❌ Built posts page not found. Run `pnpm build` first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

// Check for subtitle text that should be hidden
const subtitleTexts = [
  'I want to learn DevOps',
  'Remote Work', 
  'How to start programing',
  'The world of Infosec',
  'What Software engineers should know about building docker files'
];

let foundSubtitles = 0;
let shouldBeHidden = 0;

for (const subtitle of subtitleTexts) {
  // Check if subtitle appears in the HTML
  if (html.includes(subtitle)) {
    foundSubtitles++;
    
    // Check the context - if it's in a card (look for nearby elements)
    const subtitleIndex = html.indexOf(subtitle);
    const contextBefore = html.substring(Math.max(0, subtitleIndex - 500), subtitleIndex);
    const contextAfter = html.substring(subtitleIndex, subtitleIndex + 500);
    
    // If it's in a card context (has card-like styling), it should be hidden
    if (contextBefore.includes('fontSize') && contextBefore.includes('color')) {
      console.log(`❌ FOUND SUBTITLE IN CARD: "${subtitle}"`);
      shouldBeHidden++;
    } else {
      console.log(`✅ Subtitle "${subtitle}" found in content (not card)`);
    }
  }
}

console.log(`\n📊 Results:`);
console.log(`   Subtitles found: ${foundSubtitles}`);
console.log(`   Should be hidden in cards: ${shouldBeHidden}`);

if (shouldBeHidden === 0) {
  console.log(`\n✅ SUCCESS! No subtitles found in card previews.`);
  console.log(`   The subtitle parameter fix is working correctly!`);
} else {
  console.log(`\n❌ FAILED! ${shouldBeHidden} subtitle(s) still showing in card previews.`);
  console.log(`   The fix needs more work.`);
  process.exit(1);
}