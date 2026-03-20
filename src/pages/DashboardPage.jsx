import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, LogOut, FileText, ChevronRight, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-accent-muted text-accent-dark border-accent-light',
  completed: 'bg-secondary-muted text-secondary-dark border-secondary-light',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
};

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    axios.get(`${API}/bookings`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setBookings(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      {/* Header */}
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-heading text-xl font-semibold text-stone-800">Peacix</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/therapists" className="text-sm text-stone-600 hover:text-primary-dark font-body font-medium hidden sm:block">Find Therapist</Link>
            <Link to="/blog" className="text-sm text-stone-600 hover:text-primary-dark font-body font-medium hidden sm:block">Blog</Link>
            <button onClick={() => { logout(); navigate('/'); }} data-testid="dashboard-logout-btn" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-red-500 font-body transition-colors">
              <LogOut className="w-4 h-4" strokeWidth={1.5} /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-medium text-stone-800">Welcome, {user?.name || 'User'}</h1>
              <p className="text-stone-500 font-body mt-1">Manage your appointments and wellness journey</p>
            </div>
            <Link to="/therapists" data-testid="dashboard-book-btn" className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all duration-300">
              Book New Session
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: 'Find Therapist', icon: User, href: '/therapists', color: 'primary' },
              { label: 'Take Quiz', icon: FileText, href: '/quiz', color: 'secondary' },
              { label: 'Read Blog', icon: FileText, href: '/blog', color: 'accent' },
            ].map(action => (
              <Link key={action.label} to={action.href} data-testid={`quick-action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
                className={`flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}>
                <div className={`w-10 h-10 rounded-lg bg-${action.color}-muted flex items-center justify-center`}>
                  <action.icon className={`w-5 h-5 text-${action.color}-dark`} strokeWidth={1.5} />
                </div>
                <span className="font-medium text-stone-700 font-body text-sm">{action.label}</span>
                <ChevronRight className="w-4 h-4 text-stone-400 ml-auto" strokeWidth={1.5} />
              </Link>
            ))}
          </div>

          {/* Bookings */}
          <h2 className="text-xl font-heading font-medium text-stone-800 mb-4">Your Appointments</h2>
          {loading ? (
            <div className="text-center py-12 text-stone-400 font-body">Loading...</div>
          ) : bookings.length === 0 ? (
            <div data-testid="no-bookings-message" className="text-center py-16 bg-white rounded-2xl border border-stone-200">
              <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-heading font-medium text-stone-700 mb-2">No appointments yet</h3>
              <p className="text-stone-500 font-body text-sm mb-4">Book your first session to start your wellness journey.</p>
              <Link to="/therapists" className="inline-flex bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all">
                Find a Therapist
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map(b => (
                <div key={b.id} data-testid={`booking-card-${b.id}`} className="bg-white rounded-xl border border-stone-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-heading font-medium text-stone-800">{b.service}</h4>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[b.status] || statusColors.pending}`}>
                        {b.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-stone-500 font-body">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" strokeWidth={1.5} /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" strokeWidth={1.5} /> {b.time}</span>
                      <span className="flex items-center gap-1">Plan: {b.plan}</span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${b.payment_status === 'paid' ? 'bg-accent-muted text-accent-dark' : 'bg-yellow-50 text-yellow-700'}`}>
                    {b.payment_status === 'paid' ? 'Paid' : 'Unpaid'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
