import filmsData from '../../content/films.json';
import siteData from '../../content/site.json';

export interface FilmInput {
  slug: string;
  title: string;
  title_fa?: string;
  director: string;
  year: number;
  date: string; // YYYY-MM-DD
  poster: string;
  focal?: string;
  imdb?: string;
  luma?: string;
  trailer?: string;
  website?: string;
  extras?: string;
  synopsis?: string;
}
export interface Film extends FilmInput {
  number: number;
}

export const site = siteData;

const sorted = [...(filmsData as FilmInput[])].sort((a, b) => a.date.localeCompare(b.date));
export const films: Film[] = sorted.map((f, i) => ({ ...f, number: i + 1 }));
export const filmsNewestFirst: Film[] = [...films].reverse();

export function formatDate(iso: string, opts: Intl.DateTimeFormatOptions = {}): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  return dt.toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    ...opts,
  });
}

export const pad = (n: number) => String(n).padStart(2, '0');
