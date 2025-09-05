import requests
from datetime import datetime
import json
import os

NOTION_DATABASE = os.getenv("NOTION_DATABASE").strip()
NOTION_SECRET = os.getenv("NOTION_SECRET").strip()


def query_notion_database(start_cursor):
    url = f"https://api.notion.com/v1/databases/{NOTION_DATABASE}/query"

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
      'Authorization': f'Bearer {NOTION_SECRET}',
      'Content-Type': 'application/json',
      'Notion-Version': '2022-02-22',
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    if response.status_code != 200:
        print(response.json())
        raise Exception("Notion api error")

    data = response.json()
    next_cursor = data.get("next_cursor")
    entries = []

    for res in data.get("results", []):
        properties = res.get("properties")
        entry = {}
        entry["url"] = properties.get("URL").get("url")
        try:
            entry["category"] = properties.get("Category").get("select").get("name")
        except:
            entry["category"] = "Uncategorized"

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

mapped = {}
for entry in reading_list_entries:
    date = entry.get("created_at")
    date_object = datetime.fromisoformat(date)
    date_string = date_object.strftime("%B %d, %Y")
    key = date_object.strftime("%B, %Y")
    if not mapped.get(key):
        mapped[key] = []

    mapped[key].append(entry)

with open("data/reading_list.json", "w") as f:
    json.dump(
        mapped, f,
        ensure_ascii=False,
        indent=2
    )

