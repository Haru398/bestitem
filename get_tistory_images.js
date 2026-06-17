const https = require('https');

function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

(async () => {
  try {
    const searchUrl = 'https://html.duckduckgo.com/html/?q=' + encodeURIComponent('로열스테디 초경량 우양산 site:tistory.com');
    const searchHtml = await fetchHTML(searchUrl);
    
    let match;
    const regex = /href="([^"]+tistory\.com[^"]+)"/g;
    const links = [];
    while ((match = regex.exec(searchHtml)) !== null) {
      if(match[1].startsWith('//')) {
          links.push('https:' + match[1]);
      } else if (match[1].startsWith('http')) {
          links.push(match[1]);
      }
    }
    
    // Clean up duckduckgo redirect wrapper
    const cleanLinks = links.map(l => {
        if(l.includes('uddg=')) {
            return decodeURIComponent(l.split('uddg=')[1].split('&')[0]);
        }
        return l;
    }).filter(l => l.includes('tistory.com') && !l.includes('duckduckgo'));
    
    console.log("Found Tistory links:", cleanLinks.slice(0, 3));
    
    if(cleanLinks.length > 0) {
        const blogHtml = await fetchHTML(cleanLinks[0]);
        const imgRegex = /src="([^"]+kakaocdn\.net[^"]+)"/g;
        const imgLinks = [];
        let m;
        while((m = imgRegex.exec(blogHtml)) !== null) {
            let src = m[1];
            if (src.includes('fname=')) {
                src = decodeURIComponent(src.split('fname=')[1]);
            }
            if(!src.includes('new_ico_5') && !src.includes('profile')) {
                imgLinks.push(src);
            }
        }
        console.log("Images found:", [...new Set(imgLinks)]);
    }

  } catch (e) {
    console.error(e);
  }
})();
