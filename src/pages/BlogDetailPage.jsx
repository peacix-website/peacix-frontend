import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/blog/${id}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/blog'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-body">Loading...</div>;
  if (!post) return null;

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="bg-gradient-to-br from-accent-muted via-white to-primary-muted pt-24 pb-8">
        <div className="max-w-3xl mx-auto px-6 md:px-12">
          <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-primary-dark font-body mb-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Blog
          </Link>
        </div>
      </div>

      <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto px-6 md:px-12 pb-16">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs bg-accent-muted text-accent-dark px-2.5 py-1 rounded-full font-body font-medium">{post.category}</span>
          <span className="flex items-center gap-1 text-xs text-stone-400 font-body"><Clock className="w-3 h-3" /> {post.read_time}</span>
          <span className="flex items-center gap-1 text-xs text-stone-400 font-body"><User className="w-3 h-3" /> {post.author}</span>
        </div>

        <h1 data-testid="blog-post-title" className="text-3xl md:text-4xl font-heading font-medium text-stone-800 mb-6 leading-snug">{post.title}</h1>

        {post.image_url && (
          <div className="rounded-2xl overflow-hidden mb-8">
            <img src={post.image_url} alt={post.title} className="w-full h-64 md:h-80 object-cover" />
          </div>
        )}

        <div className="prose prose-stone max-w-none font-body" data-testid="blog-post-content">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={i} className="text-xl font-heading font-medium text-stone-800 mt-8 mb-3">{para.replace(/\*\*/g, '')}</h3>;
            }
            if (para.startsWith('**')) {
              return <h4 key={i} className="text-lg font-heading font-medium text-stone-800 mt-6 mb-2">{para.replace(/\*\*/g, '')}</h4>;
            }
            if (para.startsWith('- ')) {
              return (
                <ul key={i} className="list-none space-y-2 my-4">
                  {para.split('\n').map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-stone-600 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-dark mt-2 flex-shrink-0" />
                      {item.replace('- ', '')}
                    </li>
                  ))}
                </ul>
              );
            }
            return <p key={i} className="text-stone-600 leading-relaxed mb-4">{para.replace(/\*\*/g, '')}</p>;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <Link to="/blog" className="text-primary-dark font-semibold font-body hover:underline">&larr; Back to all articles</Link>
        </div>
      </motion.article>
    </div>
  );
}
