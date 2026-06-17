const fs = require('fs');

const lines = fs.readFileSync('C:\\Users\\my\\.gemini\\antigravity\\brain\\73c79e9c-ef8b-48a2-a5a4-cc2eb473f107\\.system_generated\\logs\\transcript.jsonl', 'utf8').split('\n');

for (const line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.type === 'USER_INPUT' && obj.content && (obj.content.includes('사이트') || obj.content.includes('임시'))) {
      console.log(`[${obj.step_index}] USER: ${obj.content}`);
    }
    if (obj.type === 'PLANNER_RESPONSE' && obj.content && obj.content.includes('임시')) {
      // maybe check model response
      // console.log(`[${obj.step_index}] MODEL: ${obj.content.substring(0, 100)}`);
    }
  } catch (e) {}
}
