import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../../lib/contentful';
import type { BlogPost } from '../../types/blog';
import { format } from 'date-fns';

const BlogGrid = ({ limit = 3 }: { limit?: number }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getBlogPosts();
            setPosts(fetchedPosts.slice(0, limit));
            setLoading(false);
        };

        fetchPosts();
    }, [limit]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (posts.length === 0) {
        return <div className="text-center text-gray-500">No blog posts found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
                <article
                    key={post.slug}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                    data-aos="fade-up"
                >
                    {/* Cover Image */}
                    <div className="h-48 overflow-hidden relative">
                        {post.coverImage ? (
                            <img
                                src={post.coverImage.file.url}
                                alt={post.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}
                        <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Article
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                        {/* Date & Author */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <span>{post.publishDate ? format(new Date(post.publishDate), 'MMM d, yyyy') : 'Date N/A'}</span>
                            <span>•</span>
                            <span className="font-medium text-secondary">
                                {post.author ? post.author.name : 'UEC Team'}
                            </span>
                        </div>

                        <h2 className="text-xl font-bold text-mainText mb-3 block group-hover:text-primary transition-colors line-clamp-2">
                            <Link to={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h2>

                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {post.excerpt}
                        </p>

                        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                            <Link
                                to={`/blog/${post.slug}`}
                                className="text-primary font-bold text-sm hover:underline inline-flex items-center gap-1"
                            >
                                Read More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
};

export default BlogGrid;
