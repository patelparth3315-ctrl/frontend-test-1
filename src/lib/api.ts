import { Trip, ItineraryDay } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const IMAGE_BASE_URL = API_BASE_URL.replace("/api", "");

export const normalizeImageUrl = (url: string | null | undefined): string | undefined => {
  if (!url) return undefined;
  
  // If it's already an external URL, don't modify it
  if (url.startsWith('http') && !url.includes('localhost') && !url.includes('127.0.0.1')) {
    return url;
  }
  
  // 1. Remove the base URL if it's already there to avoid double processing
  let relativePath = url.replace(IMAGE_BASE_URL, "").replace("http://localhost:8888", "").replace("http://127.0.0.1:8888", "");
  
  // 2. Fully decode the path to handle any previous encoding layers (like %2520)
  // We call it multiple times just in case there's deep nested encoding
  let decodedPath = relativePath;
  try {
    decodedPath = decodeURIComponent(decodeURIComponent(relativePath));
  } catch (e) {
    try {
      decodedPath = decodeURIComponent(relativePath);
    } catch (e2) {}
  }
  
  // 3. Ensure it starts with /uploads if it's a local file
  if (!decodedPath.startsWith('http') && !decodedPath.startsWith('/uploads') && (decodedPath.includes('trips') || decodedPath.includes('blogs'))) {
    decodedPath = `/uploads/trips/${decodedPath.split('/').pop()}`;
  }
  
  // 4. Encode the filename part safely
  try {
    const segments = decodedPath.split('/');
    const encodedSegments = segments.map(s => encodeURIComponent(s));
    const finalPath = encodedSegments.join('/').replace(/%2F/g, '/');
    
    // 5. Prepend base URL and clean up double slashes
    return `${IMAGE_BASE_URL}${finalPath.startsWith('/') ? '' : '/'}${finalPath}`;
  } catch (e) {
    return `${IMAGE_BASE_URL}${decodedPath.startsWith('/') ? '' : '/'}${decodedPath.replace(/ /g, '%20')}`;
  }
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
  // Use the Page Builder API which is what the Admin Panel updates
  const res = await fetch(`${API_BASE_URL}/page-builder/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  const json = await res.json();
  
  if (json.success && json.data) {
    // Normalize: PageBuilder uses 'content' while PageRenderer uses 'data'
    return {
      ...json.data,
      sections: (json.data.sections || []).map((s: any) => ({
        ...s,
        data: s.content // Map content to data for PageRenderer
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
    // For drafts, we want to use the 'draft' content if it exists, otherwise 'content'
    return {
      ...json.data,
      sections: (json.data.sections || []).map((s: any) => ({
        ...s,
        data: s.draft || s.content // Prefer draft content in preview
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
