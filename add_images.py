import json
import os

DATA_FILE = os.path.join("src", "app", "data.json")

with open(DATA_FILE, "r", encoding="utf-8") as f:
    posts = json.load(f)

for post in posts:
    if post["id"].startswith("item-"):
        post["additionalImages"] = [
            "/images/altenbach_pan_closeup.png",
            "/images/altenbach_pan_steak.png"
        ]

with open(DATA_FILE, "w", encoding="utf-8") as f:
    json.dump(posts, f, ensure_ascii=False, indent=2)

print("Images added to data.json")
