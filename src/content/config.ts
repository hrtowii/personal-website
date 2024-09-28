import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    // excerpt: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
};
