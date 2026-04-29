import { Trip, ItineraryDay } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8888/api";
const IMAGE_BASE_URL = API_BASE_URL.replace("/api", "");

/**
 * Normalizes image URLs to be fully qualified and accessible.
 * Handles: local uploads (/uploads/...), external URLs (https://...), and empty values.
 */
export const normalizeImageUrl = (url: string | null | undefined): string | null => {
  if (!url) return null;
  if (url.trim() === "") return null;

  // Enforce Cloudinary / External URLs only
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // If a local path (like /uploads/...) slips through, return null.
  // This prevents Vercel from returning a 404 HTML page (causing ORB errors)
  // and immediately triggers the frontend component's default fallback image.
  return null;
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
