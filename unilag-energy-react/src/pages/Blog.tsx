import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getBlogPosts } from '../lib/contentful';
import type { BlogPost } from '../types/blog';
import { format } from 'date-fns';

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            const fetchedPosts = await getBlogPosts();
            setPosts(fetchedPosts);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    return (
        <Layout activePage="blog">
            {/* Hero Section */}
            <section className="bg-sectionBg2 text-white py-20 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-down">
                        Our Blog
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mx-auto" data-aos="fade-up" data-aos-delay="200">
                        Insights, updates, and stories from the University of Lagos Energy Club.
                    </p>
                </div>
                {/* Decorative Background Elements if needed */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/20 z-0"></div>
            </section>

            {/* Blog Listing Section */}
            <section className="py-20 bg-white min-h-[50vh]">
                <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-bold text-gray-600">No posts found yet.</h3>
                            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full"
                                    data-aos="fade-up"
                                >
                                    {/* Cover Image */}
                                    <div className="h-56 overflow-hidden relative">
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
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default Blog;
