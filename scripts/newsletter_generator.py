#!/usr/bin/env python3
"""
Newsletter Content Generator

This script generates newsletter content from recent blog posts.
It extracts recent posts, formats them into newsletter-friendly content,
and can output HTML, markdown, or plain text formats.
"""

import os
import re
import json
import yaml
from datetime import datetime, timedelta
from pathlib import Path
from typing import List, Dict, Optional
import argparse


class BlogPost:
    """Represents a blog post with metadata and content."""
    
    def __init__(self, post_path: Path):
        self.path = post_path
        self.metadata = {}
        self.content = ""
        self.excerpt = ""
        self._parse_post()
    
    def _parse_post(self):
        """Parse the blog post markdown file."""
        index_file = self.path / "index.md"
        if not index_file.exists():
            return
        
        with open(index_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split frontmatter and content
        parts = content.split('---', 2)
        if len(parts) >= 3:
            # Parse YAML frontmatter
            try:
                self.metadata = yaml.safe_load(parts[1])
            except yaml.YAMLError:
                self.metadata = {}
            
            # Get content after frontmatter
            self.content = parts[2].strip()
            
            # Generate excerpt (first 200 characters of content)
            content_text = re.sub(r'[#*`\[\]()]', '', self.content)
            content_text = re.sub(r'\n+', ' ', content_text).strip()
            self.excerpt = content_text[:200] + "..." if len(content_text) > 200 else content_text
    
    @property
    def title(self) -> str:
        """Get the post title."""
        return self.metadata.get('title', 'Untitled')
    
    @property
    def date(self) -> Optional[datetime]:
        """Get the post date."""
        date_str = self.metadata.get('date')
        if date_str:
            try:
                # Handle different date formats
                if 'T' in str(date_str):
                    return datetime.fromisoformat(str(date_str).replace('Z', '+00:00'))
                else:
                    return datetime.strptime(str(date_str), '%Y-%m-%d')
            except (ValueError, TypeError):
                pass
        return None
    
    @property
    def tags(self) -> List[str]:
        """Get the post tags."""
        return self.metadata.get('tags', [])
    
    @property
    def categories(self) -> List[str]:
        """Get the post categories."""
        return self.metadata.get('categories', [])
    
    @property
    def url(self) -> str:
        """Generate the post URL based on permalink structure."""
        if self.date:
            # Following Hugo permalink pattern: /blogs/:year/:month/:slug/
            slug = self.metadata.get('slug', self.path.name)
            # Clean up slug if it contains medium-style format
            if '/@' in slug:
                slug = slug.split('/')[-1]
            return f"/blogs/{self.date.year:04d}/{self.date.month:02d}/{slug}/"
        return f"/posts/{self.path.name}/"


class NewsletterGenerator:
    """Generates newsletter content from blog posts."""
    
    def __init__(self, content_dir: Path, base_url: str = "https://nirjalpaudel.com.np"):
        self.content_dir = content_dir
        self.base_url = base_url.rstrip('/')
        self.posts = []
        self._load_posts()
    
    def _load_posts(self):
        """Load all blog posts from the content directory."""
        posts_dir = self.content_dir / "posts"
        if not posts_dir.exists():
            return
        
        for post_dir in posts_dir.iterdir():
            if post_dir.is_dir() and (post_dir / "index.md").exists():
                post = BlogPost(post_dir)
                if post.title != 'Untitled' and post.date:
                    self.posts.append(post)
        
        # Sort posts by date (newest first)
        self.posts.sort(key=lambda p: p.date or datetime.min, reverse=True)
    
    def get_recent_posts(self, days: int = 30, limit: int = 5) -> List[BlogPost]:
        """Get recent posts within the specified number of days."""
        from datetime import timezone
        cutoff_date = datetime.now(timezone.utc) - timedelta(days=days)
        recent_posts = []
        
        for post in self.posts:
            if post.date:
                # Make cutoff_date naive if post.date is naive, or vice versa
                post_date = post.date
                if post_date.tzinfo is None and cutoff_date.tzinfo is not None:
                    cutoff_comparison = cutoff_date.replace(tzinfo=None)
                elif post_date.tzinfo is not None and cutoff_date.tzinfo is None:
                    cutoff_comparison = cutoff_date.replace(tzinfo=timezone.utc)
                else:
                    cutoff_comparison = cutoff_date
                    
                if post_date >= cutoff_comparison:
                    recent_posts.append(post)
        
        return recent_posts[:limit]
    
    def get_posts_by_tag(self, tag: str, limit: int = 5) -> List[BlogPost]:
        """Get posts by specific tag."""
        tagged_posts = [
            post for post in self.posts
            if tag.lower() in [t.lower() for t in post.tags]
        ]
        return tagged_posts[:limit]
    
    def generate_html_newsletter(self, posts: List[BlogPost], title: str = "Latest Posts") -> str:
        """Generate HTML newsletter content."""
        html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Nirjal's Blog Newsletter</title>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }}
        .container {{ max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }}
        .header {{ text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }}
        .header h1 {{ color: #333; margin: 0; }}
        .post {{ margin-bottom: 30px; padding: 20px; border-left: 4px solid #007cba; background-color: #f9f9f9; }}
        .post h2 {{ color: #333; margin-top: 0; }}
        .post h2 a {{ color: #007cba; text-decoration: none; }}
        .post h2 a:hover {{ text-decoration: underline; }}
        .post-meta {{ color: #666; font-size: 14px; margin-bottom: 10px; }}
        .post-excerpt {{ color: #444; margin-bottom: 15px; }}
        .post-tags {{ margin-top: 15px; }}
        .tag {{ display: inline-block; background-color: #007cba; color: white; padding: 3px 8px; border-radius: 3px; font-size: 12px; margin-right: 5px; }}
        .footer {{ text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }}
        .footer a {{ color: #007cba; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{title}</h1>
            <p>Latest insights from Nirjal Paudel's Tech Blog</p>
        </div>
        
        <div class="content">
"""
        
        for post in posts:
            full_url = f"{self.base_url}{post.url}"
            date_str = post.date.strftime("%B %d, %Y") if post.date else "Unknown date"
            
            html += f"""
            <div class="post">
                <h2><a href="{full_url}">{post.title}</a></h2>
                <div class="post-meta">Published on {date_str}</div>
                <div class="post-excerpt">{post.excerpt}</div>
                <div class="post-tags">
"""
            
            for tag in post.tags:
                html += f'<span class="tag">{tag}</span>'
            
            html += f"""
                </div>
            </div>
"""
        
        html += f"""
        </div>
        
        <div class="footer">
            <p>Thank you for reading! Visit <a href="{self.base_url}">nirjalpaudel.com.np</a> for more content.</p>
            <p>You're receiving this because you subscribed to our newsletter.</p>
        </div>
    </div>
</body>
</html>
"""
        return html
    
    def generate_markdown_newsletter(self, posts: List[BlogPost], title: str = "Latest Posts") -> str:
        """Generate Markdown newsletter content."""
        markdown = f"""# {title}

Welcome to the latest newsletter from Nirjal's Tech Blog! Here are the recent posts:

"""
        
        for i, post in enumerate(posts, 1):
            full_url = f"{self.base_url}{post.url}"
            date_str = post.date.strftime("%B %d, %Y") if post.date else "Unknown date"
            tags_str = ", ".join(post.tags) if post.tags else "No tags"
            
            markdown += f"""## {i}. [{post.title}]({full_url})

**Published:** {date_str}  
**Tags:** {tags_str}

{post.excerpt}

---

"""
        
        markdown += f"""
## Follow & Connect

- Blog: [{self.base_url}]({self.base_url})
- Twitter: [@n1rjal](https://twitter.com/n1rjal)
- GitHub: [n1rjal](https://github.com/n1rjal)
- LinkedIn: [nirjalpaudel](https://linkedin.com/in/nirjalpaudel)

Thanks for reading! 🚀
"""
        return markdown
    
    def generate_plain_text_newsletter(self, posts: List[BlogPost], title: str = "Latest Posts") -> str:
        """Generate plain text newsletter content."""
        text = f"""{title}
{'=' * len(title)}

Welcome to the latest newsletter from Nirjal's Tech Blog!

Recent Posts:
"""
        
        for i, post in enumerate(posts, 1):
            full_url = f"{self.base_url}{post.url}"
            date_str = post.date.strftime("%B %d, %Y") if post.date else "Unknown date"
            tags_str = ", ".join(post.tags) if post.tags else "No tags"
            
            text += f"""
{i}. {post.title}
   Published: {date_str}
   Tags: {tags_str}
   URL: {full_url}
   
   {post.excerpt}

{'-' * 60}
"""
        
        text += f"""

Follow & Connect:
- Blog: {self.base_url}
- Twitter: @n1rjal
- GitHub: github.com/n1rjal
- LinkedIn: linkedin.com/in/nirjalpaudel

Thanks for reading!
"""
        return text


def main():
    """Main function to run the newsletter generator."""
    parser = argparse.ArgumentParser(description="Generate newsletter content from blog posts")
    parser.add_argument("--format", choices=["html", "markdown", "text"], default="html",
                        help="Output format (default: html)")
    parser.add_argument("--days", type=int, default=30,
                        help="Number of days to look back for recent posts (default: 30)")
    parser.add_argument("--limit", type=int, default=5,
                        help="Maximum number of posts to include (default: 5)")
    parser.add_argument("--tag", type=str,
                        help="Filter posts by specific tag")
    parser.add_argument("--output", type=str,
                        help="Output file path (default: stdout)")
    parser.add_argument("--title", type=str, default="Latest Posts",
                        help="Newsletter title (default: 'Latest Posts')")
    
    args = parser.parse_args()
    
    # Get the content directory
    script_dir = Path(__file__).parent
    content_dir = script_dir.parent / "content"
    
    # Initialize newsletter generator
    generator = NewsletterGenerator(content_dir)
    
    # Get posts based on criteria
    if args.tag:
        posts = generator.get_posts_by_tag(args.tag, args.limit)
        title = f"Posts tagged '{args.tag}'"
    else:
        posts = generator.get_recent_posts(args.days, args.limit)
        title = args.title
    
    if not posts:
        print("No posts found matching the criteria.")
        return
    
    # Generate newsletter content
    if args.format == "html":
        content = generator.generate_html_newsletter(posts, title)
    elif args.format == "markdown":
        content = generator.generate_markdown_newsletter(posts, title)
    else:
        content = generator.generate_plain_text_newsletter(posts, title)
    
    # Output content
    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Newsletter generated and saved to {args.output}")
    else:
        print(content)


if __name__ == "__main__":
    main()