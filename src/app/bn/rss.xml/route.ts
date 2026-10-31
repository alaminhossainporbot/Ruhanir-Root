import { getAllNews } from '@/lib/news';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllNews('bn');
  const baseUrl = 'https://ruhanir.com';

  const itemsXml = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/bn/news/${post.slug}/</link>
      <guid>${baseUrl}/bn/news/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary}]]></description>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>রুহানীর ইঞ্জিন - সংবাদ</title>
    <link>${baseUrl}/bn/news/</link>
    <description>রুহানীর ইঞ্জিনের অফিসিয়াল ঘোষণা ও সংবাদ</description>
    <language>bn</language>
    <atom:link href="${baseUrl}/bn/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
