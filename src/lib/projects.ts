import { getCollection } from 'astro:content';
import type { Lang } from '../i18n/ui';

export function projectAnchor(id: string) {
  return `project-${id.slice(id.lastIndexOf('/') + 1)}`;
}

// Published projects for one language, in the order set by `order`.
export async function getProjects(lang: Lang) {
  const projects = await getCollection(
    'projects',
    ({ id, data }) => id.startsWith(`${lang}/`) && !data.draft,
  );
  return projects.sort((a, b) => a.data.order - b.data.order);
}
