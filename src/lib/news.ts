import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { Lang } from './i18n';

export interface NewsPostMeta {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export interface NewsPost extends NewsPostMeta {
  contentHtml: string;
}

const newsDirectory = path.join(process.cwd(), 'src/content/news');

export function getAllNewsSlugs(lang: Lang): string[] {
  const dir = path.join(newsDirectory, lang);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export function getAllNews(lang: Lang): NewsPostMeta[] {
  const slugs = getAllNewsSlugs(lang);
  const posts: NewsPostMeta[] = [];

  for (const slug of slugs) {
    const fullPath = path.join(newsDirectory, lang, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    posts.push({
      slug,
      title: data.title || '',
      date: data.date || '',
      summary: data.summary || '',
    });
  }

  return posts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export async function getNewsPost(lang: Lang, slug: string): Promise<NewsPost | null> {
  const fullPath = path.join(newsDirectory, lang, `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const contentHtml = await marked.parse(content);

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    summary: data.summary || '',
    contentHtml,
  };
}

export function checkEquivalentPostExists(targetLang: Lang, slug: string): boolean {
  const targetPath = path.join(newsDirectory, targetLang, `${slug}.md`);
  return fs.existsSync(targetPath);
}
