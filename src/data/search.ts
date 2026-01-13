/* Implement a helper that queries the AIC search endpoint,
 parses the JSON, and validates it with ArtworkSchema. 
 Reject or handle invalid data. */
import { z } from "zod/v4";
import {
  SearchResponseSchema,
  type SearchResponse,
} from "../schemas/ArtworkSchema";

type SearchProps = {
  q: string;
  limit: number;
  offset: number;
};
export async function searchArtworks(
  params: SearchProps,
  controller: AbortController
): Promise<SearchResponse> {
  const searchURL = `https://api.artic.edu/api/v1/artworks/search`;

  try {
    const searchRes = await fetch(searchURL, {
      signal: controller.signal,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: params.q,
        limit: params.limit,
        offset: params.offset,
        fields: [
          "id",
          "title",
          "artist_title",
          "artist_titles",
          "artist_id",
          "image_id",
        ],
      }),
    });
    if (!searchRes.ok) {
      throw new Error("Search failed");
    }
    const searchData = await searchRes.json();
    const { data, error, success } = SearchResponseSchema.safeParse(searchData);
    if (!success) {
      throw new Error(z.prettifyError(error));
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== "AbortError") {
      throw new Error("Search failed:", error);
    }
    throw new Error("unknown error");
  }
}
