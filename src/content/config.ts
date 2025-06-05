import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    // excerpt: z.string(),
  }),
});

const albums = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      cover: image(),
    }),
});

export const collections = {
  blog: blogCollection,
  albums: albums,
};
