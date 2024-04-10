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

const skillsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        slot: z.number(),
        skills: z.array(z.object({
            name: z.string(),
            icon: z.string()
        }))
    })
});

export const collections = {
    'projects': projectCollection,
    'skills': skillsCollection
};