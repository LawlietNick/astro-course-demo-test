import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import MarkdownIt from "markdown-it";
import sanitizeHtml from "sanitize-html";

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');
  return rss({
    title: 'Rhythm Nation',
    description: 'A community of Music Producers and Enthusiasts',
    site: context.site?.toString() ?? "",
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.description,
      // Compute RSS link from post `slug`
      // This example assumes all posts are rendered as `/blog/[slug]` routes
      link: `/blog/${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      image: post.data.cover.src,
    })),
  });
}