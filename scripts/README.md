# Newsletter Scripts Documentation

This directory contains three powerful scripts for managing newsletter operations for Nirjal's Blog. These scripts complement the existing MailChimp subscription forms and provide automated content generation, template management, and analytics capabilities.

## Scripts Overview

### 1. newsletter_generator.py
Generates newsletter content from blog posts with multiple output formats.

**Features:**
- Extracts recent blog posts from the Hugo content directory
- Generates HTML, Markdown, or plain text newsletters
- Filters posts by tags or date ranges
- Automatically creates excerpts and formats URLs
- Supports custom newsletter titles

**Usage Examples:**
```bash
# Generate HTML newsletter for last 30 days
python3 scripts/newsletter_generator.py --format html --days 30 --limit 5

# Generate newsletter for specific tag
python3 scripts/newsletter_generator.py --tag python --format markdown --limit 3

# Save newsletter to file
python3 scripts/newsletter_generator.py --format html --output newsletter.html --title "Weekly Tech Update"
```

**Options:**
- `--format`: Output format (html, markdown, text)
- `--days`: Number of days to look back for posts (default: 30)
- `--limit`: Maximum number of posts to include (default: 5)
- `--tag`: Filter posts by specific tag
- `--output`: Output file path
- `--title`: Newsletter title

### 2. newsletter_templates.py
Manages reusable newsletter templates for different occasions.

**Features:**
- Pre-built templates for weekly newsletters, announcements, and post notifications
- Variable substitution system for dynamic content
- Template creation, editing, and deletion
- Export templates in HTML and text formats
- JSON-based template storage

**Available Default Templates:**
1. **weekly**: Weekly newsletter with recent posts and updates
2. **announcement**: Special announcements and important updates  
3. **post_notification**: Individual blog post notifications

**Usage Examples:**
```bash
# Create default templates
python3 scripts/newsletter_templates.py create-defaults

# List available templates
python3 scripts/newsletter_templates.py list

# View template details
python3 scripts/newsletter_templates.py show --name weekly

# Render template with variables
python3 scripts/newsletter_templates.py render --name post_notification \
  --variables '{"post_title": "My Post", "post_date": "Sept 5, 2024", "post_excerpt": "Brief description", "post_url": "https://example.com"}'

# Save rendered template to file
python3 scripts/newsletter_templates.py render --name weekly \
  --variables '{"newsletter_title": "Weekly Update", "newsletter_date": "Sept 5, 2024"}' \
  --output weekly_newsletter --format both
```

### 3. newsletter_analytics.py
Analyzes newsletter performance and manages subscriber data via MailChimp API.

**Features:**
- Subscriber analysis (growth trends, geographic distribution, engagement)
- Campaign performance analysis (open rates, click rates, top performers)
- Health score calculation for newsletter performance
- Data export in JSON, CSV, and text formats
- Automated recommendations based on analytics

**Setup Requirements:**
Set environment variables or use command-line options:
```bash
export MAILCHIMP_API_KEY="your-api-key"
export MAILCHIMP_LIST_ID="your-list-id"
```

**Usage Examples:**
```bash
# Analyze subscribers
python3 scripts/newsletter_analytics.py analyze-subscribers --output subscriber_analysis.json

# Analyze campaign performance
python3 scripts/newsletter_analytics.py analyze-campaigns --output campaign_report.json

# Generate comprehensive report
python3 scripts/newsletter_analytics.py generate-report --output newsletter_report.txt

# Export subscriber data
python3 scripts/newsletter_analytics.py export-data --format csv --output subscribers.csv
```

## Integration with Existing Blog

The scripts are designed to work seamlessly with the existing Hugo blog structure:

### Blog Post Structure
Scripts automatically parse Hugo markdown files with YAML frontmatter:
```yaml
---
title: "Your Post Title"
date: "2024-09-05T10:00:00Z"
tags: ["python", "programming"]
categories: ["tech"]
---
```

### Existing Newsletter Integration
The blog already includes MailChimp subscription forms in:
- `layouts/partials/newsletter.html` - General subscription form
- `layouts/posts/baseof.html` - Post-specific subscription form

These scripts complement the existing subscription system by providing content generation and management capabilities.

## Workflow Examples

### Weekly Newsletter Workflow
1. Generate recent posts content:
   ```bash
   python3 scripts/newsletter_generator.py --format html --days 7 --output recent_posts.html
   ```

2. Use template for consistent formatting:
   ```bash
   python3 scripts/newsletter_templates.py render --name weekly \
     --variables '{"newsletter_title": "Weekly Update", "newsletter_date": "Sept 5, 2024", "recent_posts": "content from step 1"}' \
     --output weekly_newsletter.html
   ```

3. Analyze performance after sending:
   ```bash
   python3 scripts/newsletter_analytics.py analyze-campaigns --output weekly_performance.json
   ```

### New Post Notification Workflow
1. Generate post notification:
   ```bash
   python3 scripts/newsletter_templates.py render --name post_notification \
     --variables '{"post_title": "Your New Post", "post_date": "Sept 5, 2024", "post_excerpt": "Brief description", "post_url": "https://nirjalpaudel.com.np/blogs/2024/09/your-post/"}' \
     --output post_notification.html
   ```

## File Structure

After running the scripts, the following directory structure will be created:

```
scripts/
├── newsletter_generator.py      # Content generation
├── newsletter_templates.py      # Template management
├── newsletter_analytics.py      # Analytics and subscriber management
├── newsletter_templates/        # Template storage
│   └── templates.json          # Template definitions
└── newsletter_data/            # Analytics data storage
    └── reports/                # Generated reports
```

## Dependencies

The scripts require the following Python packages (already added to requirements.txt):
- `requests` - For MailChimp API calls
- `pyyaml` - For parsing blog post frontmatter
- `pillow` - For image processing (existing dependency)

## Environment Variables

For newsletter analytics, set these environment variables:
```bash
# MailChimp API credentials
MAILCHIMP_API_KEY=your-mailchimp-api-key
MAILCHIMP_LIST_ID=your-mailchimp-list-id
```

## Security Notes

- Never commit API keys to the repository
- Use environment variables for sensitive credentials
- The MailChimp list ID can be found in your MailChimp dashboard
- API keys should have appropriate permissions (read-only for analytics)

## Customization

### Adding New Templates
1. Create template using the template manager or manually edit `newsletter_templates/templates.json`
2. Include necessary variables and styling
3. Test with sample data using the render command

### Custom Content Filters
Modify `newsletter_generator.py` to add:
- Custom post filtering logic
- Additional metadata extraction
- Different URL generation patterns
- Custom excerpt generation

### Analytics Extensions
Extend `newsletter_analytics.py` to add:
- Custom metrics calculation
- Integration with other analytics services
- Advanced reporting features
- Automated alerting based on performance

## Troubleshooting

### Common Issues

1. **DateTime comparison errors**: Ensure your blog posts have valid ISO format dates
2. **MailChimp API errors**: Check API key format and permissions
3. **Missing dependencies**: Run `pip install -r requirements.txt`
4. **File permission errors**: Ensure scripts are executable with `chmod +x scripts/*.py`

### Debug Mode
Add print statements or use Python's logging module for debugging:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Contributing

When modifying these scripts:
1. Maintain backward compatibility with existing blog structure
2. Update documentation for new features
3. Test with sample data before committing
4. Follow the existing code style and patterns