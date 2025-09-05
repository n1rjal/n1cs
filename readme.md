## N1CS
Nirjal Paudel & Computer science

## General Info
This repo powers my blog which is about my love with computer science and my passion put into words.

## Tech Stack Used:
1. [GoHugo - Static Site generator](https://gohugo.io/)
2. CSS
3. HTML
4. Python
5. Tailwind

## Precommits Installed
I have one pre-commit here and it changes any png, jpg or jpeg images and changes it into WEBP format compressing it and then replacing the images in content of markdown as well.

## Scripts files
I have 5 scripts file here and they do the following:
1. **Reading List Sync**: Updates the reading list with my notion reading list. If you want to peek into my reading list. [Click me](https://nirjalpaudel.com.np/reading-list/)
2. **Image Compression**: Changes all the png, jpg images into webp as discussed in precommit portion above.
3. **Newsletter Generator**: Generates newsletter content from recent blog posts in HTML, Markdown, or text formats
4. **Newsletter Templates**: Manages reusable newsletter templates for different occasions (weekly updates, announcements, post notifications)
5. **Newsletter Analytics**: Analyzes newsletter performance and subscriber data via MailChimp API integration

For detailed documentation on the newsletter scripts, see [scripts/README.md](scripts/README.md).

## Github Actions
I have a github actions that does the following
1. Redeploys the server in cloudflare, You may also like section in the blogs are supposed to be random and static sites aren't random so, this action refresh it and making it somewhat random.
2. Syncs my notion reading list with reading list data over here, commmits the changes and the reading list in the site updates




