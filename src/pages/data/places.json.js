import { getCollection } from 'astro:content';

const allPosts = await getCollection('posts');
const mapData = allPosts.map(post => {
  return {
    fullname: post.data.title,
    slug: post.data.slug,
    coords: post.data.coords,
    image: post.data.image,
    excerpt: post.data.excerpt,
    tags: post.data.tags.flat()
  }
});

export async function GET({params, request}) {
  return new Response(
    JSON.stringify(mapData)
  )
}