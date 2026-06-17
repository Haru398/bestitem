const fs = require('fs');

const lines = fs.readFileSync('C:\\Users\\my\\.gemini\\antigravity\\brain\\73c79e9c-ef8b-48a2-a5a4-cc2eb473f107\\.system_generated\\logs\\transcript.jsonl', 'utf8').split('\n');

for (const line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.content && obj.content.toLowerCase().includes('surge')) {
      console.log(`[${obj.step_index}] ${obj.type}: ${obj.content.substring(0, 100)}`);
    }
  } catch (e) {}
}
