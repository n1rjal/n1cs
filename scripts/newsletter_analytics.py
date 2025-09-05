#!/usr/bin/env python3
"""
Newsletter Analytics and Subscriber Management

This script provides analytics and management capabilities for newsletter operations.
It can analyze subscriber data, generate reports, and manage subscriber lists.
"""

import os
import json
import csv
import requests
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Optional, Any
import argparse
from collections import Counter, defaultdict


class MailChimpAPI:
    """Simple MailChimp API client for subscriber management."""
    
    def __init__(self, api_key: str, list_id: str):
        self.api_key = api_key
        self.list_id = list_id
        # Extract datacenter from API key (format: key-dc)
        self.datacenter = api_key.split('-')[-1] if '-' in api_key else 'us1'
        self.base_url = f"https://{self.datacenter}.api.mailchimp.com/3.0"
        self.headers = {
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        }
    
    def get_list_info(self) -> Optional[Dict]:
        """Get basic information about the mailing list."""
        try:
            response = requests.get(f"{self.base_url}/lists/{self.list_id}", headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching list info: {e}")
            return None
    
    def get_members(self, status: str = "subscribed", count: int = 1000) -> List[Dict]:
        """Get list members with specified status."""
        try:
            url = f"{self.base_url}/lists/{self.list_id}/members"
            params = {
                'status': status,
                'count': count,
                'fields': 'members.email_address,members.status,members.timestamp_signup,members.timestamp_opt,members.member_rating,members.location'
            }
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json().get('members', [])
        except requests.RequestException as e:
            print(f"Error fetching members: {e}")
            return []
    
    def get_campaigns(self, count: int = 50) -> List[Dict]:
        """Get recent email campaigns."""
        try:
            url = f"{self.base_url}/campaigns"
            params = {
                'count': count,
                'fields': 'campaigns.id,campaigns.web_id,campaigns.type,campaigns.create_time,campaigns.send_time,campaigns.status,campaigns.emails_sent,campaigns.settings.subject_line,campaigns.report_summary'
            }
            response = requests.get(url, headers=self.headers, params=params)
            response.raise_for_status()
            return response.json().get('campaigns', [])
        except requests.RequestException as e:
            print(f"Error fetching campaigns: {e}")
            return []
    
    def get_campaign_reports(self, campaign_id: str) -> Optional[Dict]:
        """Get detailed report for a specific campaign."""
        try:
            response = requests.get(f"{self.base_url}/reports/{campaign_id}", headers=self.headers)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            print(f"Error fetching campaign report: {e}")
            return None


class NewsletterAnalytics:
    """Analyzes newsletter performance and subscriber data."""
    
    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.data_dir.mkdir(exist_ok=True)
        self.reports_dir = self.data_dir / "reports"
        self.reports_dir.mkdir(exist_ok=True)
    
    def analyze_subscribers(self, subscribers: List[Dict]) -> Dict[str, Any]:
        """Analyze subscriber data and generate insights."""
        if not subscribers:
            return {'error': 'No subscriber data available'}
        
        analysis = {
            'total_subscribers': len(subscribers),
            'signup_analysis': {},
            'geographic_analysis': {},
            'engagement_analysis': {},
            'growth_trends': {},
            'summary': {}
        }
        
        # Analyze signup patterns
        signup_dates = []
        monthly_signups = defaultdict(int)
        
        for subscriber in subscribers:
            if subscriber.get('timestamp_signup'):
                try:
                    signup_date = datetime.fromisoformat(subscriber['timestamp_signup'].replace('Z', '+00:00'))
                    signup_dates.append(signup_date)
                    month_key = signup_date.strftime('%Y-%m')
                    monthly_signups[month_key] += 1
                except (ValueError, TypeError):
                    continue
        
        if signup_dates:
            analysis['signup_analysis'] = {
                'first_signup': min(signup_dates).isoformat(),
                'latest_signup': max(signup_dates).isoformat(),
                'monthly_signups': dict(monthly_signups),
                'average_signups_per_month': len(signup_dates) / max(1, len(monthly_signups))
            }
        
        # Analyze geographic distribution
        countries = []
        for subscriber in subscribers:
            location = subscriber.get('location', {})
            if location and location.get('country_code'):
                countries.append(location['country_code'])
        
        if countries:
            country_counts = Counter(countries)
            analysis['geographic_analysis'] = {
                'top_countries': dict(country_counts.most_common(10)),
                'total_countries': len(country_counts)
            }
        
        # Analyze engagement (member ratings)
        ratings = []
        for subscriber in subscribers:
            rating = subscriber.get('member_rating', 0)
            if rating:
                ratings.append(rating)
        
        if ratings:
            analysis['engagement_analysis'] = {
                'average_rating': sum(ratings) / len(ratings),
                'rating_distribution': dict(Counter(ratings)),
                'high_engagement_count': len([r for r in ratings if r >= 4])
            }
        
        # Calculate growth trends
        if signup_dates and len(signup_dates) > 1:
            recent_30_days = datetime.now() - timedelta(days=30)
            recent_signups = [d for d in signup_dates if d >= recent_30_days]
            
            recent_90_days = datetime.now() - timedelta(days=90)
            last_90_days = [d for d in signup_dates if d >= recent_90_days]
            
            analysis['growth_trends'] = {
                'signups_last_30_days': len(recent_signups),
                'signups_last_90_days': len(last_90_days),
                'growth_rate_30_days': (len(recent_signups) / 30) if recent_signups else 0,
                'growth_rate_90_days': (len(last_90_days) / 90) if last_90_days else 0
            }
        
        # Generate summary
        analysis['summary'] = {
            'health_score': self._calculate_health_score(analysis),
            'recommendations': self._generate_recommendations(analysis)
        }
        
        return analysis
    
    def analyze_campaigns(self, campaigns: List[Dict]) -> Dict[str, Any]:
        """Analyze email campaign performance."""
        if not campaigns:
            return {'error': 'No campaign data available'}
        
        sent_campaigns = [c for c in campaigns if c.get('status') == 'sent']
        
        if not sent_campaigns:
            return {'error': 'No sent campaigns found'}
        
        analysis = {
            'total_campaigns': len(campaigns),
            'sent_campaigns': len(sent_campaigns),
            'performance_metrics': {},
            'trends': {},
            'top_performers': [],
            'summary': {}
        }
        
        # Calculate performance metrics
        total_sent = sum(c.get('emails_sent', 0) for c in sent_campaigns)
        open_rates = []
        click_rates = []
        unsubscribe_rates = []
        
        for campaign in sent_campaigns:
            report = campaign.get('report_summary', {})
            if report:
                opens = report.get('opens', 0)
                clicks = report.get('clicks', 0)
                unsubscribes = report.get('unsubscribes', 0)
                sent = campaign.get('emails_sent', 1)
                
                if sent > 0:
                    open_rate = (opens / sent) * 100
                    click_rate = (clicks / sent) * 100
                    unsubscribe_rate = (unsubscribes / sent) * 100
                    
                    open_rates.append(open_rate)
                    click_rates.append(click_rate)
                    unsubscribe_rates.append(unsubscribe_rate)
        
        if open_rates:
            analysis['performance_metrics'] = {
                'average_open_rate': sum(open_rates) / len(open_rates),
                'average_click_rate': sum(click_rates) / len(click_rates),
                'average_unsubscribe_rate': sum(unsubscribe_rates) / len(unsubscribe_rates),
                'total_emails_sent': total_sent,
                'best_open_rate': max(open_rates),
                'best_click_rate': max(click_rates)
            }
        
        # Identify top performing campaigns
        campaign_performance = []
        for campaign in sent_campaigns:
            report = campaign.get('report_summary', {})
            if report and campaign.get('emails_sent', 0) > 0:
                opens = report.get('opens', 0)
                clicks = report.get('clicks', 0)
                sent = campaign.get('emails_sent', 1)
                
                performance_score = ((opens / sent) * 0.6 + (clicks / sent) * 0.4) * 100
                
                campaign_performance.append({
                    'subject': campaign.get('settings', {}).get('subject_line', 'Unknown'),
                    'send_time': campaign.get('send_time', ''),
                    'emails_sent': sent,
                    'opens': opens,
                    'clicks': clicks,
                    'open_rate': (opens / sent) * 100,
                    'click_rate': (clicks / sent) * 100,
                    'performance_score': performance_score
                })
        
        # Sort by performance score and get top 5
        campaign_performance.sort(key=lambda x: x['performance_score'], reverse=True)
        analysis['top_performers'] = campaign_performance[:5]
        
        return analysis
    
    def _calculate_health_score(self, analysis: Dict) -> float:
        """Calculate a health score for the newsletter (0-100)."""
        score = 50  # Base score
        
        # Growth component (30 points max)
        growth = analysis.get('growth_trends', {})
        if growth:
            recent_growth = growth.get('growth_rate_30_days', 0)
            if recent_growth > 1:
                score += min(30, recent_growth * 10)
            elif recent_growth > 0.5:
                score += 15
            elif recent_growth > 0:
                score += 5
        
        # Engagement component (20 points max)
        engagement = analysis.get('engagement_analysis', {})
        if engagement:
            avg_rating = engagement.get('average_rating', 0)
            score += min(20, avg_rating * 4)
        
        return min(100, max(0, score))
    
    def _generate_recommendations(self, analysis: Dict) -> List[str]:
        """Generate recommendations based on analysis."""
        recommendations = []
        
        # Growth recommendations
        growth = analysis.get('growth_trends', {})
        if growth:
            if growth.get('growth_rate_30_days', 0) < 0.5:
                recommendations.append("Consider adding more subscription prompts to your blog posts")
                recommendations.append("Try creating lead magnets like free resources or guides")
        
        # Engagement recommendations
        engagement = analysis.get('engagement_analysis', {})
        if engagement:
            if engagement.get('average_rating', 0) < 3:
                recommendations.append("Focus on improving content quality and relevance")
                recommendations.append("Consider segmenting your audience for more targeted content")
        
        # General recommendations
        recommendations.append("Regularly analyze and optimize your newsletter performance")
        recommendations.append("A/B test different subject lines and content formats")
        
        return recommendations
    
    def generate_report(self, analysis: Dict, output_file: Path):
        """Generate a comprehensive report."""
        report_content = f"""
Newsletter Analytics Report
Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

SUBSCRIBER ANALYSIS
==================
Total Subscribers: {analysis.get('total_subscribers', 'N/A')}
"""
        
        # Add signup analysis
        signup = analysis.get('signup_analysis', {})
        if signup:
            report_content += f"""
Signup Statistics:
- First signup: {signup.get('first_signup', 'N/A')}
- Latest signup: {signup.get('latest_signup', 'N/A')}
- Average signups per month: {signup.get('average_signups_per_month', 0):.1f}
"""
        
        # Add geographic analysis
        geo = analysis.get('geographic_analysis', {})
        if geo:
            report_content += f"""
Geographic Distribution:
- Total countries: {geo.get('total_countries', 'N/A')}
- Top countries: {', '.join(f"{k}({v})" for k, v in list(geo.get('top_countries', {}).items())[:5])}
"""
        
        # Add engagement analysis
        engagement = analysis.get('engagement_analysis', {})
        if engagement:
            report_content += f"""
Engagement Metrics:
- Average rating: {engagement.get('average_rating', 0):.2f}/5
- High engagement subscribers: {engagement.get('high_engagement_count', 'N/A')}
"""
        
        # Add growth trends
        growth = analysis.get('growth_trends', {})
        if growth:
            report_content += f"""
Growth Trends:
- Signups last 30 days: {growth.get('signups_last_30_days', 'N/A')}
- Signups last 90 days: {growth.get('signups_last_90_days', 'N/A')}
- Daily growth rate (30d): {growth.get('growth_rate_30_days', 0):.2f}
"""
        
        # Add health score and recommendations
        summary = analysis.get('summary', {})
        if summary:
            report_content += f"""
HEALTH SCORE: {summary.get('health_score', 0):.1f}/100

RECOMMENDATIONS:
"""
            for rec in summary.get('recommendations', []):
                report_content += f"- {rec}\n"
        
        # Save report
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report_content)
    
    def export_data(self, data: Dict, format: str, output_file: Path):
        """Export analysis data in specified format."""
        if format == 'json':
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False, default=str)
        elif format == 'csv' and 'subscribers' in str(output_file):
            # Special handling for subscriber data
            subscribers = data if isinstance(data, list) else []
            with open(output_file, 'w', newline='', encoding='utf-8') as f:
                if subscribers:
                    writer = csv.DictWriter(f, fieldnames=subscribers[0].keys())
                    writer.writeheader()
                    writer.writerows(subscribers)


def main():
    """Main function to run the newsletter analytics."""
    parser = argparse.ArgumentParser(description="Newsletter analytics and subscriber management")
    parser.add_argument("command", choices=["analyze-subscribers", "analyze-campaigns", "generate-report", "export-data"],
                        help="Command to execute")
    parser.add_argument("--api-key", type=str,
                        help="MailChimp API key (or set MAILCHIMP_API_KEY env var)")
    parser.add_argument("--list-id", type=str,
                        help="MailChimp list ID (or set MAILCHIMP_LIST_ID env var)")
    parser.add_argument("--output", type=str,
                        help="Output file path")
    parser.add_argument("--format", choices=["json", "csv", "txt"], default="json",
                        help="Output format")
    parser.add_argument("--days", type=int, default=30,
                        help="Number of days to analyze (for recent data)")
    
    args = parser.parse_args()
    
    # Get API credentials
    api_key = args.api_key or os.getenv('MAILCHIMP_API_KEY')
    list_id = args.list_id or os.getenv('MAILCHIMP_LIST_ID')
    
    if not api_key or not list_id:
        print("Error: MailChimp API key and list ID are required.")
        print("Set them via --api-key and --list-id or environment variables MAILCHIMP_API_KEY and MAILCHIMP_LIST_ID")
        return
    
    # Initialize components
    script_dir = Path(__file__).parent
    data_dir = script_dir / "newsletter_data"
    analytics = NewsletterAnalytics(data_dir)
    mailchimp = MailChimpAPI(api_key, list_id)
    
    if args.command == "analyze-subscribers":
        print("Fetching subscriber data...")
        subscribers = mailchimp.get_members()
        
        if subscribers:
            print(f"Analyzing {len(subscribers)} subscribers...")
            analysis = analytics.analyze_subscribers(subscribers)
            
            if args.output:
                output_file = Path(args.output)
                if args.format == "json":
                    analytics.export_data(analysis, 'json', output_file)
                else:
                    analytics.generate_report(analysis, output_file)
                print(f"Analysis saved to {output_file}")
            else:
                print("\nSUBSCRIBER ANALYSIS SUMMARY:")
                print(f"Total subscribers: {analysis.get('total_subscribers', 'N/A')}")
                
                growth = analysis.get('growth_trends', {})
                if growth:
                    print(f"Recent growth (30d): {growth.get('signups_last_30_days', 'N/A')} new subscribers")
                
                summary = analysis.get('summary', {})
                if summary:
                    print(f"Health score: {summary.get('health_score', 0):.1f}/100")
        else:
            print("No subscriber data retrieved.")
    
    elif args.command == "analyze-campaigns":
        print("Fetching campaign data...")
        campaigns = mailchimp.get_campaigns()
        
        if campaigns:
            print(f"Analyzing {len(campaigns)} campaigns...")
            analysis = analytics.analyze_campaigns(campaigns)
            
            if args.output:
                output_file = Path(args.output)
                analytics.export_data(analysis, args.format, output_file)
                print(f"Campaign analysis saved to {output_file}")
            else:
                print("\nCAMPAIGN ANALYSIS SUMMARY:")
                metrics = analysis.get('performance_metrics', {})
                if metrics:
                    print(f"Average open rate: {metrics.get('average_open_rate', 0):.1f}%")
                    print(f"Average click rate: {metrics.get('average_click_rate', 0):.1f}%")
                    print(f"Total emails sent: {metrics.get('total_emails_sent', 'N/A')}")
                
                top_performers = analysis.get('top_performers', [])
                if top_performers:
                    print("\nTop performing campaigns:")
                    for i, campaign in enumerate(top_performers[:3], 1):
                        print(f"{i}. {campaign['subject']} - {campaign['open_rate']:.1f}% open rate")
        else:
            print("No campaign data retrieved.")
    
    elif args.command == "generate-report":
        print("Generating comprehensive report...")
        
        # Fetch both subscriber and campaign data
        subscribers = mailchimp.get_members()
        campaigns = mailchimp.get_campaigns()
        
        if subscribers:
            subscriber_analysis = analytics.analyze_subscribers(subscribers)
            
            output_file = Path(args.output) if args.output else Path("newsletter_report.txt")
            analytics.generate_report(subscriber_analysis, output_file)
            print(f"Report generated: {output_file}")
        else:
            print("No data available for report generation.")
    
    elif args.command == "export-data":
        if not args.output:
            print("Error: --output is required for export-data command")
            return
        
        print("Exporting subscriber data...")
        subscribers = mailchimp.get_members()
        
        if subscribers:
            output_file = Path(args.output)
            analytics.export_data(subscribers, args.format, output_file)
            print(f"Data exported to {output_file}")
        else:
            print("No data available for export.")


if __name__ == "__main__":
    main()