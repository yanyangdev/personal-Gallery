import { z } from "zod/v4";
export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  artist_title: z.string().nullable(),
  artist_titles: z.array(z.string()).nullable(),
  artist_id: z.number().nullable(),
  image_id: z.string().nullable(),
});
export type Artwork = z.infer<typeof ArtworkSchema>;
export type GalleryArtworks = Artwork & {
  note: string;
};
export const SearchResponseSchema = z.object({
  pagination: z.object({
    total: z.number(),
    limit: z.number(),
    offset: z.number(),
    total_pages: z.number(),
    current_page: z.number(),
  }),
  data: z.array(ArtworkSchema),
  config: z.object({
    iiif_url: z.string(),
    website_url: z.string(),
  }),
});
export type SearchResponse = z.infer<typeof SearchResponseSchema>;
