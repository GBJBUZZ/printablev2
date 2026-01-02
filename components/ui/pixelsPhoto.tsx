// hooks/useFirstPexelsImage.ts
"use client";

import { useState, useEffect, useCallback } from "react";

export interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

/**
 * Fetches the first (most relevant) image from Pexels for a given query.
 *
 * @param query           Search term (e.g. "ocean", "forest")
 * @param options.refreshInterval  ms between auto-fetch; 0 = no auto-refresh
 */
export function useFirstPexelsImage(
  query: string,
  options?: { refreshInterval?: number },
) {
  const [photo, setPhoto] = useState<PexelsPhoto | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { refreshInterval = 0 } = options ?? {};

  const fetchPhoto = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?` +
          new URLSearchParams({ query, per_page: "1" }),
        {
          headers: {
            Authorization: process.env.NEXT_PUBLIC_PIXELS || "",
          },
          // Always fetch fresh unless you change revalidate
          next: { revalidate: 0 },
        },
      );
      if (!res.ok) {
        throw new Error(`Pexels API error: ${res.statusText}`);
      }
      const data = await res.json();
      const hits: PexelsPhoto[] = data.photos;
      if (hits.length === 0) {
        throw new Error(`No images found for "${query}"`);
      }
      setPhoto(hits[0]);
    } catch (err) {
      setError(err as Error);
    }
  }, [query]);

  useEffect(() => {
    // Initial fetch on mount or when `query` changes
    fetchPhoto();
    // Optional polling
    if (refreshInterval > 0) {
      const id = setInterval(fetchPhoto, refreshInterval);
      return () => clearInterval(id);
    }
  }, [fetchPhoto, refreshInterval]);

  return { photo, error, refresh: fetchPhoto };
}
