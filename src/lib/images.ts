import type { ImageMetadata } from 'astro';

const posters = import.meta.glob<{ default: ImageMetadata }>('/src/assets/posters/*', { eager: true });

export function posterFor(file: string): ImageMetadata {
  const hit = posters[`/src/assets/posters/${file}`];
  if (!hit) throw new Error(`Poster not found in src/assets/posters: ${file}`);
  return hit.default;
}

/** Like posterFor, but returns null when the file is missing (used for optional series posters). */
export function posterMaybe(file?: string | null): ImageMetadata | null {
  if (!file) return null;
  return posters[`/src/assets/posters/${file}`]?.default ?? null;
}
