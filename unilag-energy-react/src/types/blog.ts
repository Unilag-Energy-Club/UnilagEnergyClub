import type { Document } from '@contentful/rich-text-types';

export interface Author {
    name: string;
    avatar?: {
        fields: {
            file: {
                url: string;
            };
        };
    };
    role?: string;
}

export interface BlogPost {
    title: string;
    slug: string;
    coverImage?: {
        file: {
            url: string;
        };
        title?: string;
    };
    author?: Author;
    excerpt?: string;
    content: Document;
    publishDate: string;
}
