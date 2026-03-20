import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const categories = ['All', 'Wellness', 'Mental Health', 'Relationships', 'Student Life', 'Career'];

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {};
    if (filter !== 'All') params.category = filter;
    axios.get(`${API}/blog`, { params })
      .then(res => setPosts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="bg-gradient-to-br from-accent-muted via-white to-primary-muted pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-primary-dark font-body mb-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-stone-800 mb-4">Wellness Blog</h1>
          <p className="text-lg text-stone-500 font-body max-w-2xl">Expert insights, wellness tips, and mental health resources from our licensed professionals.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10">
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)} data-testid={`blog-filter-${c.toLowerCase().replace(/\s/g, '-')}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-body transition-all ${
                filter === c ? 'bg-accent-dark text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-accent-light'
              }`}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-400 font-body">Loading articles...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-stone-500 font-body">No articles found.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} data-testid={`blog-card-${post.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                {post.image_url && (
                  <div className="h-44 overflow-hidden">
                    <img src={post.image_url} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs bg-accent-muted text-accent-dark px-2.5 py-0.5 rounded-full font-body font-medium">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-stone-400 font-body"><Clock className="w-3 h-3" /> {post.read_time}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-stone-800 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-sm text-stone-500 font-body leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-body">{post.author}</span>
                    <Link to={`/blog/${post.id}`} data-testid={`read-blog-${post.id}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark hover:text-primary transition-colors">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
