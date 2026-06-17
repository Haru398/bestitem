const https = require('https');

const url = 'https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=url&generator=search&gsrsearch=banana&gsrnamespace=6&gsrlimit=10&format=json';

https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const json = JSON.parse(data);
    const pages = json.query.pages;
    const urls = [];
    for (const id in pages) {
      if (pages[id].imageinfo && pages[id].imageinfo[0] && pages[id].imageinfo[0].url) {
        const imgUrl = pages[id].imageinfo[0].url;
        if (imgUrl.endsWith('.jpg') || imgUrl.endsWith('.png')) {
           urls.push(imgUrl);
        }
      }
    }
    console.log('Wikimedia Banana Images:');
    urls.slice(0, 5).forEach(u => console.log(u));
  });
}).on('error', console.error);
