import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    tools: z.array(z.string()),
    summary: z.string(),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
});

export const collections = { projects };
