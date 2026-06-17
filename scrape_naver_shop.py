import urllib.request
import re
import json

url = "https://search.shopping.naver.com/search/all?query=" + urllib.parse.quote("에버콜라겐 타임 비오틴 150g")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    # Naver shopping images usually look like https://shopping-phinf.pstatic.net/main_...
    urls = re.findall(r'https://shopping-phinf\.pstatic\.net/main_[^"\'\s]+', html)
    # Remove query params to get clean url
    clean_urls = list(set([u.split('?')[0] for u in urls]))
    print(json.dumps(clean_urls[:6], indent=2))
except Exception as e:
    print("Error:", e)
