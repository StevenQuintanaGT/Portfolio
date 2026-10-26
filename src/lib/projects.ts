import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

// Published projects for one language, in the order set by `order`.
export async function getProjects(lang: Lang) {
  const projects = await getCollection(
    'projects',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}
