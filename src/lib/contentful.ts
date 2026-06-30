import { createClient } from 'contentful';
import type { BlogPost } from '../types/blog';

export const contentfulClient = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID || 'place_holder_space_id',
    accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN || 'place_holder_access_token',
});

// Helper to fetch all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
    try {
        const response = await contentfulClient.getEntries({
            content_type: 'blogPost',
            order: ['-fields.publishDate'], // Newest first
        });

        return response.items.map((item) => ({
            title: item.fields.title as string,
            slug: item.fields.slug as string,
            coverImage: item.fields.coverImage ? (item.fields.coverImage as any).fields : undefined,
            author: item.fields.author ? (item.fields.author as any).fields : undefined,
            excerpt: item.fields.excerpt as string,
            content: item.fields.content as any,
            publishDate: item.fields.publishDate as string,
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};

// Helper to fetch a single post by slug
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const response = await contentfulClient.getEntries({
            content_type: 'blogPost',
            'fields.slug': slug,
            limit: 1,
        });

        if (response.items.length > 0) {
            const item = response.items[0];
            return {
                title: item.fields.title as string,
                slug: item.fields.slug as string,
                coverImage: item.fields.coverImage ? (item.fields.coverImage as any).fields : undefined,
                author: item.fields.author ? (item.fields.author as any).fields : undefined,
                excerpt: item.fields.excerpt as string,
                content: item.fields.content as any,
                publishDate: item.fields.publishDate as string,
            };
        }
        return null;
    } catch (error) {
        console.error(`Error fetching blog post with slug ${slug}:`, error);
        return null;
    }
};
