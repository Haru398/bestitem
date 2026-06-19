const fs = require('fs');
const path = require('path');
const db = require('better-sqlite3')('dev.db');
const https = require('https');
const http = require('http');

// n8n이 환경변수로 전달한 값 읽기
let data = {};
try {
  data = JSON.parse(process.env.POST_DATA || '{}');
} catch(e) {
  console.error('POST_DATA 파싱 오류:', e.message);
  process.exit(1);
}

const { title, content, category, imageUrls, coupangLink, coupangIframe, postId } = data;

// 이미지 디렉토리 확인
const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// 이미지 다운로드 함수
function downloadImage(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(imagesDir, filename);
    const lib = url.startsWith('https') ? https : http;
    const opts = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://shopping.naver.com/',
        'Accept': 'image/*'
      },
      timeout: 10000
    };

    lib.get(url, opts, (res) => {
      // 리다이렉트 처리
      if (res.statusCode === 301 || res.statusCode === 302) {
        return resolve(downloadImage(res.headers.location, filename));
      }
      if (res.statusCode !== 200) {
        console.log(`❌ ${filename}: HTTP ${res.statusCode}`);
        return resolve(null);
      }

      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (buf.length > 5000) {
          fs.writeFileSync(dest, buf);
          console.log(`✅ 이미지: ${filename} (${(buf.length/1024).toFixed(1)}KB)`);
          resolve('/images/' + filename);
        } else {
          console.log(`❌ ${filename}: 너무 작음 (${buf.length}bytes)`);
          resolve(null);
        }
      });
      res.on('error', () => resolve(null));
    }).on('error', (e) => {
      console.log(`❌ ${filename}: ${e.message}`);
      resolve(null);
    });
  });
}

(async () => {
  const ts = Date.now();
  const finalPostId = postId || `item-${ts}`;

  console.log('=== 자동 포스팅 시작 ===');
  console.log('상품명:', title);
  console.log('이미지 URL 수:', imageUrls?.length || 0);

  // 이미지 다운로드 (최대 5장)
  const downloadedImages = [];
  if (imageUrls && imageUrls.length > 0) {
    for (let i = 0; i < Math.min(imageUrls.length, 5); i++) {
      const url = imageUrls[i];
      if (!url) continue;
      const ext = url.match(/\.(png|gif)$/i) ? '.png' : '.jpg';
      const filename = `auto_${ts}_${i+1}${ext}`;
      const saved = await downloadImage(url, filename);
      if (saved) downloadedImages.push(saved);
    }
  }

  const thumbnailUrl = downloadedImages[0] || '';
  console.log(`이미지 다운로드 완료: ${downloadedImages.length}장`);

  // DB 구조 확인
  const tableInfo = db.prepare("PRAGMA table_info(posts)").all();
  const columns = tableInfo.map(c => c.name);
  console.log('DB 컬럼:', columns.join(', '));

  // DB 삽입
  try {
    // subCategory 컬럼 있는지 확인
    const hasSubCat = columns.includes('subCategory');

    let stmt;
    if (hasSubCat) {
      stmt = db.prepare(`
        INSERT INTO posts (id, category, subCategory, title, content, imageUrl, coupangIframe, coupangLink, views, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
      `);
      stmt.run(finalPostId, category || '생활용품', '', title, content, thumbnailUrl, coupangIframe || '', coupangLink || '');
    } else {
      stmt = db.prepare(`
        INSERT INTO posts (id, category, title, content, imageUrl, coupangIframe, coupangLink, views, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP)
      `);
      stmt.run(finalPostId, category || '생활용품', title, content, thumbnailUrl, coupangIframe || '', coupangLink || '');
    }

    console.log('✅ DB 삽입 완료! ID:', finalPostId);
    
    // 성공 결과 출력 (n8n이 읽음)
    const result = {
      success: true,
      postId: finalPostId,
      title,
      imagesCount: downloadedImages.length,
      images: downloadedImages,
      thumbnailUrl
    };
    console.log('RESULT:' + JSON.stringify(result));
    
  } catch(e) {
    console.error('❌ DB 오류:', e.message);
    process.exit(1);
  }
})();
