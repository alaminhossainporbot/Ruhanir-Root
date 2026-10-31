import { getAllNews } from '@/lib/news';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllNews('en');
  const baseUrl = 'https://ruhanir.com';

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/en/news/${post.slug}/</link>
      <guid>${baseUrl}/en/news/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ruhanir Engine - News</title>
    <link>${baseUrl}/en/news/</link>
    <description>Official announcements and updates from Ruhanir Engine</description>
    <language>en</language>
    <atom:link href="${baseUrl}/en/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
