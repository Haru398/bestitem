const fs = require('fs');

let code = fs.readFileSync('auto_guide.js', 'utf8');

// Add https
if (!code.includes("require('https')")) {
  code = code.replace("const path = require('path');", "const path = require('path');\nconst https = require('https');\n\nfunction getYoutubeVideoId(query) {\n  return new Promise((resolve) => {\n    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);\n    https.get(url, (res) => {\n      let data = '';\n      res.on('data', chunk => data += chunk);\n      res.on('end', () => {\n        const match = data.match(/\"videoId\":\"([^\"]{11})\"/);\n        if (match && match[1]) {\n          resolve(match[1]);\n        } else {\n          resolve('dQw4w9WgXcQ'); // fallback\n        }\n      });\n    }).on('error', () => resolve('dQw4w9WgXcQ'));\n  });\n}");
}

// Make main IIFE async if it isn't
code = code.replace("function generateGuideContent", "async function generateGuideContent");

// Await the builders
code = code.replace(/content = build(GPU|CPU|SSD|RAM|MB|Generic)Guide/g, "content = await build$1Guide");

// Update builder signatures
code = code.replace(/function build(GPU|CPU|SSD|RAM|MB|Generic)Guide\(name, iframe, imgPath\) \{/g, "async function build$1Guide(name, iframe, imgPath) {");

// Inject video ID fetching and replace iframe
const queries = {
  'GPU': "name + ' 리뷰 성능'",
  'CPU': "name + ' 리뷰 성능 메인보드'",
  'SSD': "name + ' 리뷰 설치 속도'",
  'RAM': "name + ' 리뷰 오버클럭 XMP'",
  'MB':  "name + ' 리뷰 조립 바이오스'",
  'Generic': "name + ' 리뷰 사용기'"
};

for (const type of Object.keys(queries)) {
  const queryStr = queries[type];
  const funcRegex = new RegExp(`async function build${type}Guide\\(name, iframe, imgPath\\) \\{`);
  
  if (code.match(funcRegex)) {
    code = code.replace(funcRegex, `async function build${type}Guide(name, iframe, imgPath) {\n  const videoId = await getYoutubeVideoId(${queryStr});`);
  }
}

// Replace all iframes in the templates
code = code.replace(/src="https:\/\/www\.youtube\.com\/embed\?listType=search&list=\\?\$\{encodeURIComponent\([^)]+\)\}"/g, 'src="https://www.youtube.com/embed/${videoId}"');

// Update the main execution to handle async
code = code.replace(
  "const product = pickProduct();\nconst guideData = generateGuideContent(product.name, product.iframe);",
  "const product = pickProduct();\n// Wrap in async IIFE\n(async () => {\nconst guideData = await generateGuideContent(product.name, product.iframe);"
);

// Close the IIFE at the very end
code = code.replace("console.log('✅ GitHub 배포가 백그라운드에서 시작되었습니다.');\n} catch (error) {\n  console.error('❌ 자동화 스크립트 실행 중 오류 발생:', error);\n}", "console.log('✅ GitHub 배포가 백그라운드에서 시작되었습니다.');\n} catch (error) {\n  console.error('❌ 자동화 스크립트 실행 중 오류 발생:', error);\n}\n})();");

fs.writeFileSync('auto_guide.js', code);
console.log('auto_guide.js updated for async youtube fetching!');
