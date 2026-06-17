

async function getOGImage() {
  try {
    const res = await fetch('https://www.coupang.com/vp/products/7235454776', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7'
      }
    });
    const html = await res.text();
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    console.log('Image:', match ? match[1] : 'Not found');
  } catch(e) {
    console.error(e);
  }
}

getOGImage();
