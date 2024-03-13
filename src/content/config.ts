import { z, defineCollection } from 'astro:content';

const projectCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        desc: z.string(),
        img: z.string().optional(),
        imgAlt: z.string().optional(),
        url: z.string().optional(),
        github: z.string().optional(),
        tags: z.array(z.string()),
      }),
});

export const collections = {
    'projects': projectCollection,
};