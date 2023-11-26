import {z, defineCollection} from "astro:content"
import {format} from "date-fns"

const authorsCollection = defineCollection({
    schema: ({image}) =>
        z.object({
            name: z.string(),
            image: image(),
        }),
})

const postsCollection = defineCollection({
    schema: ({image}) =>
        z.object({
            author: z.string(),
            categories: z.array(z.string()),
            date: z
                .string()
                .transform(str => format(new Date(str), "MMMM d, yyyy")),
            featured: z.boolean().default(false),
            cover: image().refine((img) => img.width >= 1080, {
                message: "Cover image must be at least 1080 pixels wide!",
              }),
            coverAlt: z.string(),
            title: z.string(),
            description: z.string(),
        }),
})

export const collections = {
    authors: authorsCollection,
    posts: postsCollection,
}
