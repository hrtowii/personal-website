import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string(),
  }),
});

export const collections = {
  'blog': blogCollection,
};