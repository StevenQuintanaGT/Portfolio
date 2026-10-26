import { getPosts, getTags } from './blog';

// getStaticPaths helpers shared by the English and Spanish blog pages

export async function postPaths() {
  const posts = await getPosts();
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function tagPaths() {
  const tags = getTags(await getPosts());
  return tags.map(([slug]) => ({ params: { tag: slug } }));
}
