import { Trip, ItineraryDay } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888/api";
const IMAGE_BASE_URL = API_BASE_URL.replace("/api", "");

/**
 * Normalizes image URLs to be fully qualified and accessible.
 * Handles: local uploads (/uploads/...), external URLs (https://...), and empty values.
 */
export const normalizeImageUrl = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined;
  if (url.trim() === "") return undefined;

  // ── SELF-HEALING: Support mobile/remote testing ──
  let base = IMAGE_BASE_URL;
  if (typeof window !== "undefined" && base.includes("localhost") && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1")) {
    // If we are accessing via IP (e.g. 192.168.1.5), replace localhost in API URL with that IP
    base = base.replace("localhost", window.location.hostname);
  }

  // Already a full external URL — return as-is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Local upload path (e.g. /uploads/trips/123-photo.jpg)
  if (url.startsWith('/uploads/')) {
    const parts = url.split('/');
    const filename = parts.pop() || '';
    const dir = parts.join('/');
    return `${base}${dir}/${encodeURIComponent(filename)}`;
  }

  // Bare filename without path prefix
  if (!url.startsWith('/') && (url.includes('.jpg') || url.includes('.png') || url.includes('.webp') || url.includes('.jpeg'))) {
    return `${base}/uploads/trips/${encodeURIComponent(url)}`;
  }

  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
};

export async function fetchTrips(): Promise<Trip[]> {
  const res = await fetch(`${API_BASE_URL}/trips`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch trips");
  const json = await res.json();
  return json.data || [];
}

export async function fetchTripBySlug(slug: string): Promise<Trip | null> {
  const res = await fetch(`${API_BASE_URL}/trips/slug/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchItinerary(tripId: string): Promise<ItineraryDay[]> {
  const res = await fetch(`${API_BASE_URL}/itinerary/${tripId}`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch itinerary");
  return res.json();
}

export async function fetchReviews(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/reviews`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  const json = await res.json();
  return json.data || [];
}

export async function fetchBlogs(): Promise<any[]> {
  const res = await fetch(`${API_BASE_URL}/blogs`, { cache: 'no-store' });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const json = await res.json();
  return json.data || [];
}

export async function fetchBlogBySlug(slug: string): Promise<any | null> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}

export async function fetchPageBySlug(slug: string): Promise<any | null> {
  const res = await fetch(`${API_BASE_URL}/page-builder/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();

  if (json.success && json.data) {
    return {
      ...json.data,
      sections: (json.data.sections || []).map((s: any) => ({
        ...s,
        data: s.content
      }))
    };
  }

  return null;
}

export async function fetchDraftPageBySlug(slug: string): Promise<any | null> {
  const res = await fetch(`${API_BASE_URL}/page-builder/${slug}/draft`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();

  if (json.success && json.data) {
    return {
      ...json.data,
      sections: (json.data.sections || []).map((s: any) => ({
        ...s,
        data: s.draft || s.content
      }))
    };
  }

  return null;
}

export async function fetchSettings(): Promise<any | null> {
  const res = await fetch(`${API_BASE_URL}/settings`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  return json.data || null;
}
