const fs = require('fs');

try {
  fs.copyFileSync("D:\\서버구축폴더\\bestitem\\src\\app\\icon.png", "C:\\Users\\my\\Desktop\\item_monster_logo.png");
  console.log("Copied original logo");
} catch(e) {
  console.error("Logo error:", e);
}
