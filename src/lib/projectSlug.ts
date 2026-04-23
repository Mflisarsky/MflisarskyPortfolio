import type { CollectionEntry } from 'astro:content';

export function getProjectSlug(entry: CollectionEntry<'projects'>): string {
  return entry.data.slug ?? entry.id;
}
