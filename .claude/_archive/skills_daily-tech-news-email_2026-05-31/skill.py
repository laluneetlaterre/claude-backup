#!/usr/bin/env python3
"""Daily tech news email skill - fetches RSS feeds and outputs articles as JSON."""
import json
from datetime import datetime
from zoneinfo import ZoneInfo
from collections import defaultdict
import sys
import urllib.request
import xml.etree.ElementTree as ET
from urllib.error import URLError
import re

NEWS_SOURCES = {
    "tech": [
        ("Hacker News", "https://news.ycombinator.com/rss"),
        ("Ars Technica", "https://feeds.arstechnica.com/arstechnica/index"),
        ("The Verge", "https://www.theverge.com/rss/index.xml"),
        ("MIT Technology Review", "https://www.technologyreview.com/feed/"),
    ],
    "world": [
        ("BBC News", "https://feeds.bbci.co.uk/news/world/rss.xml"),
        ("The Guardian", "https://www.theguardian.com/international/rss"),
        ("Al Jazeera", "https://www.aljazeera.com/xml/rss/all.xml"),
        ("France 24", "https://www.france24.com/en/rss"),
    ],
    "japan": [
        ("NHK World", "https://www3.nhk.or.jp/rss/news/cat0.xml"),
        ("Japan Times", "https://www.japantimes.co.jp/feed/topstories/"),
    ],
    "real_estate": [
        ("The Real Deal", "https://therealdeal.com/feed/"),
        ("HousingWire", "https://www.housingwire.com/feed/"),
    ],
    "us": [
        ("NPR", "https://feeds.npr.org/1017/rss.xml"),
        ("CBS News", "https://www.cbsnews.com/latest/rss/main"),
        ("ABC News", "https://abcnews.go.com/abcnews/topstories"),
    ],
    "auto": [
        ("Car and Driver", "https://www.caranddriver.com/rss/all.xml"),
        ("Electrek", "https://electrek.co/feed/"),
    ],
}

CATEGORY_DISPLAY = {
    "tech": ("🤖 テック・AI・Anthropic・Google・OpenAI", 2),
    "world": ("🌍 世界情勢・国際ニュース", 2),
    "japan": ("🗾 日本ニュース", 2),
    "real_estate": ("🏢 不動産・不動産投資", 2),
    "us": ("🇺🇸 アメリカ経済・動向", 2),
    "auto": ("🚗 車・自動車業界", 2),
}

def strip_html(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&').replace('&nbsp;', ' ')
    return text.strip()

def parse_rss_feed(url):
    articles = []
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            content = response.read()
            root = ET.fromstring(content)
            ns = {'atom': 'http://www.w3.org/2005/Atom'}

            items = root.findall('.//item')
            if not items:
                items = root.findall('atom:entry', ns)

            for item in items[:5]:
                title_elem = item.find('title')
                if title_elem is None:
                    title_elem = item.find('atom:title', ns)
                desc_elem = item.find('description')
                if desc_elem is None:
                    desc_elem = item.find('atom:summary', ns)
                link_elem = item.find('link')
                if link_elem is None:
                    link_elem = item.find('atom:link', ns)

                if title_elem is None:
                    continue

                title = strip_html(title_elem.text or '')[:120]
                summary = strip_html(desc_elem.text or '')[:300] if desc_elem is not None else ''

                link = url
                if link_elem is not None:
                    link = link_elem.text or link_elem.get('href', url)

                if title:
                    articles.append({'title': title, 'summary': summary, 'link': link})
    except Exception as e:
        print(f"⚠️  {url[:40]}: {str(e)[:60]}", file=sys.stderr)
    return articles

def fetch_articles():
    articles_by_category = defaultdict(list)
    for category, sources in NEWS_SOURCES.items():
        for source_name, url in sources:
            for article in parse_rss_feed(url):
                article['source'] = source_name
                articles_by_category[category].append(article)
    return articles_by_category

def select_articles(articles_by_category):
    selected = {}
    for category, (_, count) in CATEGORY_DISPLAY.items():
        if articles_by_category.get(category):
            selected[category] = articles_by_category[category][:count]
    return selected

def format_email_body(selected_articles):
    total = sum(len(v) for v in selected_articles.values())
    body = f"おはようございます。本日のニュース厳選{total}件をお知らせいたします。\n\n"
    num = 1
    sources_used = set()

    for category, (emoji_name, _) in CATEGORY_DISPLAY.items():
        articles = selected_articles.get(category, [])
        if not articles:
            continue
        body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
        body += f"【{emoji_name}】({len(articles)}件)\n\n"
        for article in articles:
            body += f"【{num}】{article['title']}\n"
            if article['summary']:
                body += f"{article['summary']}\n"
            body += f"📰 記事：{article['source']}（{article['link']}）\n\n"
            sources_used.add(article['source'])
            num += 1

    body += "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n"
    body += "【📚 引用ニュースサイト一覧】\n\n"
    for source in sorted(sources_used):
        body += f"- {source}\n"
    body += "\n本日もよろしくお願いいたします。"
    return body

def main():
    print("📰 RSSフィードから記事を取得中...", file=sys.stderr)
    articles_by_category = fetch_articles()

    print("🎯 記事を選択中...", file=sys.stderr)
    selected = select_articles(articles_by_category)

    today = datetime.now(ZoneInfo('Asia/Tokyo')).strftime("%-Y年%-m月%-d日")
    subject = f"デイリーニュース - {today}"
    body = format_email_body(selected)

    output = {
        "subject": subject,
        "body": body,
        "email_addresses": ["hydeistpunk10ve@gmail.com", "saintnyah@gmail.com"],
    }

    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
