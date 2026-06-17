import json
import os
import sys
import subprocess
from datetime import datetime

DATA_FILE = os.path.join("src", "app", "data.json")

def add_post(category, title, content, price, image_url, coupang_link):
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            posts = json.load(f)
    else:
        posts = []

    new_id = f"item-{datetime.now().strftime('%Y%m%d%H%M%S')}"

    disclaimer = "\n\n---\n*이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.*"
    if disclaimer not in content:
        content += disclaimer

    new_post = {
        "id": new_id,
        "category": category,
        "title": title,
        "content": content,
        "price": price,
        "imageUrl": image_url,
        "coupangLink": coupang_link
    }

    posts.insert(0, new_post)

    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    
    print(f"Success: {title}".encode('utf-8').decode('utf-8', 'ignore'))

def deploy():
    print("Starting Vercel deploy...")
    # Run Vercel deployment with --yes to auto-confirm defaults, and --prod for production
    result = subprocess.run(["npx", "vercel", "--yes", "--prod"], capture_output=True, text=True, shell=True)
    
    if result.returncode == 0:
        print("Vercel Deploy completed successfully!")
        print(result.stdout)
    else:
        print("Vercel Deploy failed.")
        print(result.stderr)

if __name__ == "__main__":
    if len(sys.argv) < 7:
        print("Test run: Coupang item auto posting...")
        add_post(
            "생활용품", 
            "목디스크 달고 살던 직장인이 정착한 꿀잠 베개", 
            "아침마다 목이 뻐근해서 한의원에 돈 갖다 바치다가 결국 샀습니다. 처음 이틀은 좀 낯설었는데, 3일 차부터 진짜 기절하듯이 잡니다.\n\n경추를 싹 잡아주는 느낌이 다르더라고요. 저처럼 거북목 심하신 분들 제발 한 번만 써보세요. 솜베개랑은 차원이 다릅니다. 삶의 질이 달라져요 진짜 ㅠㅠ", 
            "39,800원", 
            "https://images.unsplash.com/photo-1541781283675-04533037ceeb?q=80&w=800", 
            "https://coupang.com"
        )
        deploy()
    else:
        add_post(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], sys.argv[6])
        deploy()
