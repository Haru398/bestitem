const fs = require('fs');

try {
  fs.copyFileSync("C:\\Users\\my\\.gemini\\antigravity\\brain\\0096a6d6-9821-41a9-86e2-7f03765275fa\\twitter_mascot_1781665235276.png", "C:\\Users\\my\\Desktop\\twitter_mascot.png");
  console.log("Copied Twitter mascot");
} catch(e) {
  console.error("Twitter mascot error:", e);
}

try {
  fs.copyFileSync("C:\\Users\\my\\.gemini\\antigravity\\brain\\0096a6d6-9821-41a9-86e2-7f03765275fa\\tistory_mascot_1781665247488.png", "C:\\Users\\my\\Desktop\\tistory_mascot.png");
  console.log("Copied Tistory mascot");
} catch(e) {
  console.error("Tistory mascot error:", e);
}
