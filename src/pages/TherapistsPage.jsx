import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Globe, ArrowLeft, Filter } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const specialtyFilters = ['All', 'Anxiety', 'Depression', 'Career Counseling', 'Couples Therapy', 'Student Wellness', 'Stress Management', 'Mindfulness'];

export default function TherapistsPage() {
  const [therapists, setTherapists] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = {};
    if (search) params.search = search;
    if (filter !== 'All') params.specialty = filter;
    axios.get(`${API}/therapists`, { params })
      .then(res => setTherapists(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Hero */}
      <div className="bg-gradient-to-br from-secondary-muted via-white to-primary-muted pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-primary-dark font-body mb-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-heading font-medium text-stone-800 mb-4">Our Expert Therapists</h1>
          <p className="text-lg text-stone-500 font-body max-w-2xl mb-8">Find the perfect match for your mental health journey. All our therapists are licensed, experienced, and compassionate.</p>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" strokeWidth={1.5} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                data-testid="therapist-search-input" placeholder="Search by name or specialty..."
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-full text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10">
        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-stone-400 flex-shrink-0" strokeWidth={1.5} />
          {specialtyFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)} data-testid={`filter-${f.toLowerCase().replace(/\s/g, '-')}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium font-body transition-all duration-300 ${
                filter === f ? 'bg-primary text-white' : 'bg-white border border-stone-200 text-stone-600 hover:border-primary-light'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-16 text-stone-400 font-body">Loading therapists...</div>
        ) : therapists.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-stone-500 font-body">No therapists found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {therapists.map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }} data-testid={`therapist-card-${t.id}`}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">
                <div className="h-48 overflow-hidden relative">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-500" strokeWidth={1.5} fill="currentColor" />
                    <span className="text-xs font-semibold text-stone-800">{t.rating}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-heading font-semibold text-stone-800 text-lg">{t.name}</h3>
                  <p className="text-sm text-primary-dark font-body font-medium">{t.title}</p>
                  <p className="text-xs text-stone-500 font-body mt-1">{t.experience} experience</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {t.specialties?.slice(0, 3).map(s => (
                      <span key={s} className="text-xs bg-secondary-muted text-secondary-dark px-2 py-0.5 rounded-full font-body">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-xs text-stone-500 font-body">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> {t.languages?.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                    <span className="text-lg font-heading font-semibold text-stone-800">{'\u20B9'}{t.price}<span className="text-xs text-stone-400 font-body font-normal">/session</span></span>
                    <Link to={`/therapists/${t.id}`} data-testid={`view-therapist-${t.id}`}
                      className="bg-primary hover:bg-primary-dark text-white text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300">
                      View Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
