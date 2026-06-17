import json
import os
from datetime import datetime
import subprocess

DATA_FILE = os.path.join("src", "app", "data.json")

def add_post():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        posts = json.load(f)

    with open("review_content.txt", "r", encoding="utf-8") as f:
        content = f.read()

    new_id = f"item-{datetime.now().strftime('%Y%m%d%H%M%S')}"

    disclaimer = "\n\n---\n*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*"
    if disclaimer not in content:
        content += disclaimer

    new_post = {
        "id": new_id,
        "category": "주방가전",
        "title": "코팅팬 버리세요! 알텐바흐 헥사 통5중 프라이팬 세트 리얼 후기",
        "content": content,
        "price": "98,000원",
        "imageUrl": "/images/altenbach_pan.png",
        "coupangLink": "https://link.coupang.com/a/ewahRchmcm"
    }

    posts.insert(0, new_post)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    print("Post added.")
    
    print("Deploying to Vercel...")
    result = subprocess.run(["npx", "vercel", "--yes", "--prod"], capture_output=True, text=True, shell=True)
    if result.returncode == 0:
        print("Vercel Deploy completed successfully!")
    else:
        print("Vercel Deploy failed.")
        print(result.stderr)

if __name__ == "__main__":
    add_post()
