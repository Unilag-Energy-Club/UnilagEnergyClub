import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { getBlogPostBySlug } from '../lib/contentful';
import type { BlogPost as BlogPostType } from '../types/blog';
import { format } from 'date-fns';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPostType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                const fetchedPost = await getBlogPostBySlug(slug);
                setPost(fetchedPost);
                setLoading(false);
            };
            fetchPost();
        }
    }, [slug]);


    // Rich Text Rendering Options
    const renderOptions = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
                void node;
                return <p className="mb-6 text-lg text-gray-700 leading-relaxed">{children}</p>;
            },
            [BLOCKS.HEADING_1]: (node: any, children: any) => {
                void node;
                return <h1 className="text-4xl font-bold text-mainText mt-10 mb-4">{children}</h1>;
            },
            [BLOCKS.HEADING_2]: (node: any, children: any) => {
                void node;
                return <h2 className="text-3xl font-bold text-mainText mt-10 mb-4">{children}</h2>;
            },
            [BLOCKS.HEADING_3]: (node: any, children: any) => {
                void node;
                return <h3 className="text-2xl font-bold text-mainText mt-8 mb-3">{children}</h3>;
            },
            [BLOCKS.QUOTE]: (node: any, children: any) => {
                void node;
                return (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-xl text-gray-600 my-8 bg-gray-50 p-4 rounded-r-lg">
                        {children}
                    </blockquote>
                );
            },
            [BLOCKS.UL_LIST]: (node: any, children: any) => {
                void node;
                return <ul className="list-disc ml-6 mb-6 space-y-2 text-lg text-gray-700">{children}</ul>;
            },
            [BLOCKS.OL_LIST]: (node: any, children: any) => {
                void node;
                return <ol className="list-decimal ml-6 mb-6 space-y-2 text-lg text-gray-700">{children}</ol>;
            },
            [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
                const { file, title } = node.data.target.fields;
                return (
                    <div className="my-8 rounded-xl overflow-hidden shadow-md">
                        <img src={file.url} alt={title} className="w-full h-auto" />
                        {title && <p className="text-center text-sm text-gray-500 mt-2 italic">{title}</p>}
                    </div>
                );
            },
        },
        renderMark: {
            [MARKS.BOLD]: (text: any) => <strong className="font-bold text-gray-900">{text}</strong>,
            [MARKS.ITALIC]: (text: any) => <em className="italic">{text}</em>,
            [MARKS.CODE]: (text: any) => <code className="bg-gray-100 rounded px-1 py-0.5 font-mono text-sm text-red-500">{text}</code>,
        },
    };

    if (loading) {
        return (
            <Layout activePage="blog">
                <div className="flex justify-center items-center h-screen bg-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            </Layout>
        );
    }

    if (!post) {
        return (
            <Layout activePage="blog">
                <div className="container mx-auto px-4 py-32 text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Post Not Found</h1>
                    <p className="text-gray-600 mb-8">The article you are looking for does not exist.</p>
                    <Link to="/blog" className="text-primary hover:underline font-bold">Back to Blog</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout activePage="blog">
            <article className="bg-white">
                {/* Cover Image Header */}
                <div className="w-full h-[60vh] relative">
                    <div className="absolute inset-0 bg-black/40 z-10"></div>
                    {post.coverImage ? (
                        <img
                            src={post.coverImage.file.url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                            No Cover Image
                        </div>
                    )}

                    <div className="absolute bottom-0 left-0 w-full z-20 pb-16 pt-32 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
                            <span className="bg-primary text-white text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                                Blog Post
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 text-white/90">
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        {post.author.avatar && (
                                            <img src={post.author.avatar.fields.file.url} alt={post.author.name} className="w-10 h-10 rounded-full border-2 border-white/50 object-cover" />
                                        )}
                                        <span className="font-bold">{post.author.name}</span>
                                    </div>
                                )}
                                <span className="text-white/60">•</span>
                                <span>{format(new Date(post.publishDate), 'MMMM d, yyyy')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 lg:px-8 max-w-4xl py-16">
                    <div className="prose prose-lg max-w-none text-gray-800">
                        {documentToReactComponents(post.content, renderOptions)}
                    </div>

                    {/* Back Button */}
                    <div className="mt-16 pt-8 border-t border-gray-200">
                        <Link to="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default BlogPost;
