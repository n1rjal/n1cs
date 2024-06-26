import requests
from datetime import datetime
import json

def query_notion_database(start_cursor):
    url = "https://api.notion.com/v1/databases/2f9e511d9a074163bd3a813b80fccbbd/query"

    payload = {
      "sorts": [
        {
          "property": "Created",
          "direction": "descending"
        }
      ]
    }

    if (start_cursor):
        payload["start_cursor"] = start_cursor

    payload = json.dumps(payload)
    headers = {
      'Authorization': 'Bearer secret_tAl9cuams6aDzo21TNHnPvSlr0uY0gpcIUdHs4EDcyT',
      'Content-Type': 'application/json',
      'Notion-Version': '2022-02-22',
      'Cookie': '__cf_bm=GtRReduBKyvsYsgUpS64yfBeP00cc0pbpiLRPo6w2co-1719416595-1.0.1.1-gZl0OpSO52FDFgI83jFz4.RhkbWkTsj6IgDiaIYoJMTJGemb3cTsLqc7K7gWQhRMkh0rVTEIQqnppy6Q5KSNUg'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code != 200:
        print(response.json())
        exit(1)

    data = response.json()
    next_cursor = data.get("next_cursor")
    entries = []

    for res in data.get("results", []):
        properties = res.get("properties")
        entry = {}
        entry["url"] = properties.get("URL").get("url")
        entry["category"] = properties.get("Category").get("select").get("name")
        entry["created_at"] = properties.get("Created").get("created_time")
        entry["name"] = properties.get("Name").get("title")[0].get("plain_text")
        entries.append(entry)

    return next_cursor, entries

reading_list_entries = []

start_cursor = None
while True:
    next_cursor, entries = query_notion_database(start_cursor)
    reading_list_entries.extend(entries)
    if next_cursor:
        start_cursor = next_cursor
    else:
        break

md = """
---
title: Nirjal Paudel - Reading List 
date: '2024-06-26T03:14:32.068Z'
categories: []
keywords: ['reading', 'nirjal paudel', 'reading-list']
slug: /@nirjalpaudel54312/reading-list
type: list
categories:
- reading-list
summary: 'Here is my reading list. These are all the blogs that I find really inreesting to read and will suggest you read as well. These are really really great engineering content'
params:
  author: Nirjal Paudel
  images: 
  - read_list.png
---
"""
mapped = {}
for entry in reading_list_entries:
    date = entry.get("created_at")
    date_object = datetime.fromisoformat(date)
    date_string = date_object.strftime("%B %d, %Y")
    key = date_object.strftime("%B, %Y")
    if not mapped.get(key):
        mapped[key] = []

    content = f"### [{entry.get("name")}]({entry.get('url')})"
    mapped[key].append(content)

for time in mapped.keys():
    md+= f"\n## {time}\n\n"
    contents = mapped[time]
    for i, content in enumerate(contents):
        md+= f"{i+1}. {content}\n\n"



with open("content/posts/reading-list/index.md", "w") as f:
    f.write(md)

