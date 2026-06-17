import json
import os

DATA_FILE = os.path.join("src", "app", "data.json")

with open(DATA_FILE, "r", encoding="utf-8") as f:
    posts = json.load(f)

for post in posts:
    if "hashtags" not in post:
        if post["id"].startswith("item-"):
            post["hashtags"] = ["알텐바흐", "스텐팬추천", "통5중프라이팬", "인덕션프라이팬"]
            post["additionalImages"] = [] # We'll generate one and add it later
        elif post["id"] == "tech-2":
            post["hashtags"] = ["로봇청소기", "물걸레로봇청소기", "가전추천"]
            post["additionalImages"] = []
        elif post["id"] == "tech-1":
            post["hashtags"] = ["에어프라이어", "자취생필수템", "대용량에어프라이어"]
            post["additionalImages"] = []

with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("data.json updated successfully.")
