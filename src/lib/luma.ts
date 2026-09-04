import { site } from './site';

export interface LumaEvent {
  name: string;
  start: string;
  end: string;
  url: string;
  cover: string | null;
  venue: string | null;
  soldOut: boolean;
  price: string | null;
}

const TZ = 'America/Los_Angeles';

export function formatLumaDate(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    timeZone: TZ,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/** Fetches upcoming events from Luma's public calendar API at build time. Returns [] on any failure. */
export async function getUpcoming(): Promise<LumaEvent[]> {
  const url = `https://api.lu.ma/calendar/get-items?calendar_api_id=${site.luma.calendarId}&period=future&pagination_limit=20`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'farcinema-site' } });
    if (!res.ok) return [];
    const data = await res.json();
    const entries: any[] = data?.entries ?? [];
    return entries
      .map((e) => {
        const ev = e.event ?? {};
        const ticket = e.ticket_info ?? {};
        const cents = ticket.price?.cents;
        const price = ticket.is_free ? 'Free' : typeof cents === 'number' ? `$${Math.round(cents / 100)}` : null;
        return {
          name: ev.name ?? 'Screening',
          start: ev.start_at,
          end: ev.end_at,
          url: `https://luma.com/${ev.url}`,
          cover: ev.cover_url ?? null,
          venue: ev.geo_address_info?.address ?? null,
          soldOut: Boolean(ticket.is_sold_out),
          price,
        } as LumaEvent;
      })
      .filter((e) => e.start)
      .sort((a, b) => a.start.localeCompare(b.start));
  } catch {
    return [];
  }
}
