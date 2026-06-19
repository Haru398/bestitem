const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const axios = require('axios');
const sizeOf = require('image-size');
const Tesseract = require('tesseract.js');

const imagesDir = path.join(process.cwd(), 'images');
if (!fs.existsSync(imagesDir)) fs.mkdirSync(imagesDir, { recursive: true });

// 헬퍼: 실제 이미지 다운로드
function downloadImage(url, filename) {
  return new Promise((resolve) => {
    const dest = path.join(imagesDir, filename);
    const lib = url.startsWith('https') ? https : http;
    const opts = {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36', 'Referer': 'https://shopping.naver.com/' },
      timeout: 10000
    };
    lib.get(url, opts, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) return resolve(downloadImage(res.headers.location, filename));
      if (res.statusCode !== 200) return resolve(null);
      const chunks = [];
      res.on('data', d => chunks.push(d));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        fs.writeFileSync(dest, buf);
        resolve(dest);
      });
      res.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

// 헬퍼: 네이버 쇼핑 검색결과에서 이미지 추출 (실제 HTML 파싱)
async function scrapeNaverImages(keyword) {
  try {
    const url = `https://search.shopping.naver.com/search/all?query=${encodeURIComponent(keyword)}`;
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const regex = /"imageUrl":"(https:\/\/shopping-phinf\.pstatic\.net[^"]+)"/g;
    const images = [];
    let match;
    while ((match = regex.exec(data)) !== null && images.length < 5) {
      images.push(match[1]);
    }
    return images;
  } catch (e) {
    console.error('네이버 쇼핑 스크래핑 실패:', e.message);
    return [];
  }
}

// 헬퍼: Tesseract OCR을 통한 오염도 체크 (글자수)
async function getOcrPollution(imagePath) {
  try {
    const ocrResult = await Tesseract.recognize(imagePath, 'kor+eng');
    const text = ocrResult.data.text.replace(/\s/g, '');
    return text.length; // 글자 수가 많을수록 오염도 높음
  } catch (e) {
    return 100; // OCR 실패 시 패널티
  }
}

/**
 * 1. 실제 이미지 수집 파이프라인
 */
async function scrapeImages(productName, userAttachedImages = [], coupangHtml = '', isBrand = false) {
  let collected = [];
  console.log(`[ImageScraper] 상품명: ${productName} / 브랜드: ${isBrand}`);

  // 1순위: 사용자 첨부 이미지
  for (let imgUrl of userAttachedImages) {
    const dest = await downloadImage(imgUrl, `user_${Date.now()}_${Math.floor(Math.random()*1000)}.jpg`);
    if (dest) collected.push({ localPath: dest, source: 'USER', isFixed: true });
  }

  // 2순위: 쿠팡 HTML 파싱
  if (coupangHtml) {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    while ((match = regex.exec(coupangHtml)) !== null && collected.length < 10) {
      let url = match[1];
      if (url.startsWith('//')) url = 'https:' + url;
      const dest = await downloadImage(url, `coupang_${Date.now()}_${Math.floor(Math.random()*1000)}.jpg`);
      if (dest) collected.push({ localPath: dest, source: 'COUPANG', isFixed: false });
    }
  }

  // 3순위: 네이버 쇼핑 등 외부 스크래핑
  if (collected.length < 5) {
    const naverImgs = await scrapeNaverImages(productName);
    for (let imgUrl of naverImgs) {
      const dest = await downloadImage(imgUrl, `naver_${Date.now()}_${Math.floor(Math.random()*1000)}.jpg`);
      if (dest) collected.push({ localPath: dest, source: 'NAVER', isFixed: false });
      if (collected.length >= 10) break;
    }
  }

  console.log(`[ImageScraper] 총 ${collected.length}장 수집 완료. 품질 평가 시작...`);

  // 2. 실제 품질 평가 엔진
  for (let i = 0; i < collected.length; i++) {
    const item = collected[i];
    if (item.isFixed) {
      item.score = 100; // 사용자 이미지는 무조건 만점
      continue;
    }

    try {
      const stats = fs.statSync(item.localPath);
      const dimensions = sizeOf(item.localPath);
      
      // 파일 크기 10KB 미만은 0점 처리 (폐기)
      if (stats.size < 10240) {
        item.score = 0;
        continue;
      }

      // 1. 해상도 점수 (최대 40점)
      const resScore = Math.min((dimensions.width * dimensions.height) / (800 * 800) * 40, 40);
      
      // 2. OCR 오염도 감점 (글자수당 -0.5점, 최대 -30점)
      const charCount = await getOcrPollution(item.localPath);
      const ocrPenalty = Math.min(charCount * 0.5, 30);

      // 3. 출처 가산점 (네이버 쇼핑 공식이미지 +10)
      const sourceBonus = item.source === 'NAVER' ? 10 : 0;

      item.score = Math.round(resScore - ocrPenalty + sourceBonus + 50); // 기본점수 50
      if (item.score < 0) item.score = 0;
      if (item.score > 100) item.score = 100;

      console.log(`  -> [${item.source}] ${path.basename(item.localPath)} | 해상도:${dimensions.width}x${dimensions.height} | 크기:${stats.size} | 글자수:${charCount} | 최종점수:${item.score}`);
    } catch (e) {
      item.score = 0;
    }
  }

  // 0점짜리 제거 및 점수 내림차순 정렬
  collected = collected.filter(c => c.score > 0).sort((a, b) => b.score - a.score);

  // 상위 5장 채택
  const top5 = collected.slice(0, 5);
  
  // URL 형태 변환 (로컬 경로 -> /images/...)
  return top5.map(item => ({
    localPath: '/images/' + path.basename(item.localPath),
    originalUrl: item.localPath,
    score: item.score,
    isFixed: item.isFixed
  }));
}

module.exports = { scrapeImages };
