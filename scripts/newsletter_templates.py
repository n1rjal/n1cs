#!/usr/bin/env python3
"""
Newsletter Template Manager

This script manages newsletter templates for different occasions and purposes.
It provides functionality to create, edit, and use newsletter templates.
"""

import os
import json
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Optional
import argparse


class NewsletterTemplate:
    """Represents a newsletter template."""
    
    def __init__(self, name: str, subject: str, html_template: str, text_template: str, 
                 description: str = "", variables: List[str] = None):
        self.name = name
        self.subject = subject
        self.html_template = html_template
        self.text_template = text_template
        self.description = description
        self.variables = variables or []
        self.created_at = datetime.now().isoformat()
        self.updated_at = self.created_at
    
    def to_dict(self) -> Dict:
        """Convert template to dictionary."""
        return {
            'name': self.name,
            'subject': self.subject,
            'html_template': self.html_template,
            'text_template': self.text_template,
            'description': self.description,
            'variables': self.variables,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'NewsletterTemplate':
        """Create template from dictionary."""
        template = cls(
            name=data['name'],
            subject=data['subject'],
            html_template=data['html_template'],
            text_template=data['text_template'],
            description=data.get('description', ''),
            variables=data.get('variables', [])
        )
        template.created_at = data.get('created_at', template.created_at)
        template.updated_at = data.get('updated_at', template.updated_at)
        return template
    
    def render(self, variables: Dict[str, str]) -> Dict[str, str]:
        """Render template with provided variables."""
        rendered_subject = self.subject
        rendered_html = self.html_template
        rendered_text = self.text_template
        
        # Replace variables in templates
        for var_name, var_value in variables.items():
            placeholder = "{" + var_name + "}"
            rendered_subject = rendered_subject.replace(placeholder, str(var_value))
            rendered_html = rendered_html.replace(placeholder, str(var_value))
            rendered_text = rendered_text.replace(placeholder, str(var_value))
        
        return {
            'subject': rendered_subject,
            'html': rendered_html,
            'text': rendered_text
        }


class TemplateManager:
    """Manages newsletter templates."""
    
    def __init__(self, templates_dir: Path):
        self.templates_dir = templates_dir
        self.templates_dir.mkdir(exist_ok=True)
        self.templates_file = self.templates_dir / "templates.json"
        self.templates = {}
        self._load_templates()
    
    def _load_templates(self):
        """Load templates from JSON file."""
        if self.templates_file.exists():
            try:
                with open(self.templates_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    for name, template_data in data.items():
                        self.templates[name] = NewsletterTemplate.from_dict(template_data)
            except (json.JSONDecodeError, KeyError) as e:
                print(f"Error loading templates: {e}")
                self.templates = {}
    
    def _save_templates(self):
        """Save templates to JSON file."""
        data = {name: template.to_dict() for name, template in self.templates.items()}
        with open(self.templates_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
    
    def create_default_templates(self):
        """Create default newsletter templates."""
        
        # Weekly newsletter template
        weekly_html = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{newsletter_title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #333; margin: 0; }
        .greeting { font-size: 16px; margin-bottom: 20px; }
        .content { margin-bottom: 30px; }
        .posts-section { margin-bottom: 30px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        .footer a { color: #007cba; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{newsletter_title}</h1>
            <p>{newsletter_date}</p>
        </div>
        
        <div class="greeting">
            <p>Hi there! 👋</p>
            <p>{greeting_message}</p>
        </div>
        
        <div class="content">
            {main_content}
        </div>
        
        <div class="posts-section">
            <h2>Recent Posts</h2>
            {recent_posts}
        </div>
        
        <div class="footer">
            <p>Thank you for reading! Visit <a href="https://nirjalpaudel.com.np">nirjalpaudel.com.np</a> for more content.</p>
            <p>Follow me on <a href="https://twitter.com/n1rjal">Twitter</a> | <a href="https://github.com/n1rjal">GitHub</a> | <a href="https://linkedin.com/in/nirjalpaudel">LinkedIn</a></p>
            <p><em>You're receiving this because you subscribed to our newsletter.</em></p>
        </div>
    </div>
</body>
</html>
"""
        
        weekly_text = """
{newsletter_title}
{separator}

Hi there! 👋

{greeting_message}

{main_content}

Recent Posts:
{recent_posts}

---

Thank you for reading! Visit https://nirjalpaudel.com.np for more content.
Follow me on Twitter (@n1rjal) | GitHub (n1rjal) | LinkedIn (nirjalpaudel)

You're receiving this because you subscribed to our newsletter.
"""
        
        weekly_template = NewsletterTemplate(
            name="weekly",
            subject="Weekly Update from Nirjal's Blog - {newsletter_date}",
            html_template=weekly_html,
            text_template=weekly_text,
            description="Weekly newsletter template with recent posts and updates",
            variables=["newsletter_title", "newsletter_date", "greeting_message", "main_content", "recent_posts", "separator"]
        )
        
        # Special announcement template
        announcement_html = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{announcement_title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; background-color: #007cba; color: white; padding: 20px; margin: -30px -30px 30px -30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; }
        .announcement { background-color: #e8f4fd; padding: 20px; border-left: 4px solid #007cba; margin-bottom: 20px; }
        .content { margin-bottom: 30px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        .footer a { color: #007cba; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{announcement_title}</h1>
        </div>
        
        <div class="announcement">
            <h2>📢 Special Announcement</h2>
            <p>{announcement_message}</p>
        </div>
        
        <div class="content">
            {announcement_content}
        </div>
        
        <div class="footer">
            <p>Thank you for reading! Visit <a href="https://nirjalpaudel.com.np">nirjalpaudel.com.np</a> for more content.</p>
            <p>Follow me on <a href="https://twitter.com/n1rjal">Twitter</a> | <a href="https://github.com/n1rjal">GitHub</a> | <a href="https://linkedin.com/in/nirjalpaudel">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>
"""
        
        announcement_text = """
{announcement_title}
{separator}

📢 Special Announcement

{announcement_message}

{announcement_content}

---

Thank you for reading! Visit https://nirjalpaudel.com.np for more content.
Follow me on Twitter (@n1rjal) | GitHub (n1rjal) | LinkedIn (nirjalpaudel)
"""
        
        announcement_template = NewsletterTemplate(
            name="announcement",
            subject="📢 {announcement_title}",
            html_template=announcement_html,
            text_template=announcement_text,
            description="Template for special announcements and important updates",
            variables=["announcement_title", "announcement_message", "announcement_content", "separator"]
        )
        
        # Simple post notification template
        post_notification_html = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Post: {post_title}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
        .post { background-color: #f9f9f9; padding: 20px; border-left: 4px solid #007cba; margin-bottom: 20px; }
        .post h2 { margin-top: 0; color: #333; }
        .post-meta { color: #666; font-size: 14px; margin-bottom: 15px; }
        .read-more { display: inline-block; background-color: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-top: 15px; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; }
        .footer a { color: #007cba; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📝 New Blog Post</h1>
        </div>
        
        <div class="post">
            <h2>{post_title}</h2>
            <div class="post-meta">Published on {post_date}</div>
            <p>{post_excerpt}</p>
            <a href="{post_url}" class="read-more">Read Full Post →</a>
        </div>
        
        <div class="footer">
            <p>Thank you for reading! Visit <a href="https://nirjalpaudel.com.np">nirjalpaudel.com.np</a> for more content.</p>
            <p>Follow me on <a href="https://twitter.com/n1rjal">Twitter</a> | <a href="https://github.com/n1rjal">GitHub</a> | <a href="https://linkedin.com/in/nirjalpaudel">LinkedIn</a></p>
        </div>
    </div>
</body>
</html>
"""
        
        post_notification_text = """
📝 New Blog Post

{post_title}
Published on {post_date}

{post_excerpt}

Read the full post: {post_url}

---

Thank you for reading! Visit https://nirjalpaudel.com.np for more content.
Follow me on Twitter (@n1rjal) | GitHub (n1rjal) | LinkedIn (nirjalpaudel)
"""
        
        post_notification_template = NewsletterTemplate(
            name="post_notification",
            subject="📝 New Post: {post_title}",
            html_template=post_notification_html,
            text_template=post_notification_text,
            description="Template for notifying subscribers about new blog posts",
            variables=["post_title", "post_date", "post_excerpt", "post_url"]
        )
        
        # Add templates
        self.add_template(weekly_template)
        self.add_template(announcement_template)
        self.add_template(post_notification_template)
    
    def add_template(self, template: NewsletterTemplate):
        """Add a new template."""
        template.updated_at = datetime.now().isoformat()
        self.templates[template.name] = template
        self._save_templates()
    
    def get_template(self, name: str) -> Optional[NewsletterTemplate]:
        """Get a template by name."""
        return self.templates.get(name)
    
    def list_templates(self) -> List[str]:
        """List all available templates."""
        return list(self.templates.keys())
    
    def delete_template(self, name: str) -> bool:
        """Delete a template."""
        if name in self.templates:
            del self.templates[name]
            self._save_templates()
            return True
        return False
    
    def render_template(self, name: str, variables: Dict[str, str]) -> Optional[Dict[str, str]]:
        """Render a template with variables."""
        template = self.get_template(name)
        if template:
            return template.render(variables)
        return None


def main():
    """Main function to run the template manager."""
    parser = argparse.ArgumentParser(description="Manage newsletter templates")
    parser.add_argument("command", choices=["list", "create-defaults", "show", "render", "delete"],
                        help="Command to execute")
    parser.add_argument("--name", type=str,
                        help="Template name (for show, render, delete commands)")
    parser.add_argument("--variables", type=str,
                        help="JSON string of variables for rendering (for render command)")
    parser.add_argument("--output", type=str,
                        help="Output file path for rendered template")
    parser.add_argument("--format", choices=["html", "text", "both"], default="both",
                        help="Output format for rendered template")
    
    args = parser.parse_args()
    
    # Get the templates directory
    script_dir = Path(__file__).parent
    templates_dir = script_dir / "newsletter_templates"
    
    # Initialize template manager
    manager = TemplateManager(templates_dir)
    
    if args.command == "list":
        templates = manager.list_templates()
        if templates:
            print("Available templates:")
            for template_name in templates:
                template = manager.get_template(template_name)
                print(f"  - {template_name}: {template.description}")
        else:
            print("No templates available. Use 'create-defaults' to create default templates.")
    
    elif args.command == "create-defaults":
        manager.create_default_templates()
        print("Default templates created successfully!")
        print("Available templates:")
        for template_name in manager.list_templates():
            template = manager.get_template(template_name)
            print(f"  - {template_name}: {template.description}")
    
    elif args.command == "show":
        if not args.name:
            print("Error: --name is required for show command")
            return
        
        template = manager.get_template(args.name)
        if template:
            print(f"Template: {template.name}")
            print(f"Description: {template.description}")
            print(f"Subject: {template.subject}")
            print(f"Variables: {', '.join(template.variables)}")
            print(f"Created: {template.created_at}")
            print(f"Updated: {template.updated_at}")
        else:
            print(f"Template '{args.name}' not found")
    
    elif args.command == "render":
        if not args.name:
            print("Error: --name is required for render command")
            return
        
        variables = {}
        if args.variables:
            try:
                variables = json.loads(args.variables)
            except json.JSONDecodeError:
                print("Error: Invalid JSON in --variables")
                return
        
        rendered = manager.render_template(args.name, variables)
        if rendered:
            if args.output:
                if args.format in ["html", "both"]:
                    html_file = args.output.replace(".txt", "").replace(".html", "") + ".html"
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(rendered['html'])
                    print(f"HTML rendered to {html_file}")
                
                if args.format in ["text", "both"]:
                    text_file = args.output.replace(".html", "").replace(".txt", "") + ".txt"
                    with open(text_file, 'w', encoding='utf-8') as f:
                        f.write(rendered['text'])
                    print(f"Text rendered to {text_file}")
            else:
                print(f"Subject: {rendered['subject']}")
                print("\n--- HTML ---")
                print(rendered['html'])
                print("\n--- TEXT ---")
                print(rendered['text'])
        else:
            print(f"Template '{args.name}' not found")
    
    elif args.command == "delete":
        if not args.name:
            print("Error: --name is required for delete command")
            return
        
        if manager.delete_template(args.name):
            print(f"Template '{args.name}' deleted successfully")
        else:
            print(f"Template '{args.name}' not found")


if __name__ == "__main__":
    main()