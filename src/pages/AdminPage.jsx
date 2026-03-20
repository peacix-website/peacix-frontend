import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Users, Calendar, Mail, CreditCard, UserCheck, BarChart3, LogOut, Check, X, Clock } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const statusColors = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-accent-muted text-accent-dark',
  completed: 'bg-secondary-muted text-secondary-dark',
  cancelled: 'bg-red-50 text-red-600',
};

export default function AdminPage() {
  const { user, token, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    if (!token || !isAdmin) { navigate('/login'); return; }
    Promise.all([
      axios.get(`${API}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(`${API}/bookings/all`, { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(([statsRes, bookingsRes]) => {
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
    }).catch(() => {})
      .finally(() => setLoading(false));
  }, [token, isAdmin, navigate]);

  const updateStatus = async (bookingId, status) => {
    try {
      await axios.patch(`${API}/bookings/${bookingId}/status?status=${status}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setBookings(bookings.map(b => b.id === bookingId ? { ...b, status } : b));
    } catch (err) { console.error(err); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-body">Loading...</div>;

  const statCards = [
    { label: 'Total Bookings', value: stats?.total_bookings || 0, icon: Calendar, color: 'primary' },
    { label: 'Pending', value: stats?.pending_bookings || 0, icon: Clock, color: 'secondary' },
    { label: 'Confirmed', value: stats?.confirmed_bookings || 0, icon: Check, color: 'accent' },
    { label: 'Total Users', value: stats?.total_users || 0, icon: Users, color: 'primary' },
    { label: 'Subscribers', value: stats?.total_subscribers || 0, icon: Mail, color: 'secondary' },
    { label: 'Payments', value: stats?.paid_payments || 0, icon: CreditCard, color: 'accent' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <header className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <span className="font-heading text-xl font-semibold text-stone-800">Peacix</span>
            </Link>
            <span className="text-xs bg-primary-muted text-primary-dark px-2 py-0.5 rounded-full font-body font-medium">Admin</span>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} data-testid="admin-logout-btn" className="flex items-center gap-1.5 text-sm text-stone-500 hover:text-red-500 font-body">
            <LogOut className="w-4 h-4" strokeWidth={1.5} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-heading font-medium text-stone-800 mb-8">Admin Dashboard</h1>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
            {statCards.map((s, i) => (
              <div key={s.label} data-testid={`admin-stat-${s.label.toLowerCase().replace(/\s/g, '-')}`}
                className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow">
                <div className={`w-9 h-9 rounded-lg bg-${s.color}-muted flex items-center justify-center mb-3`}>
                  <s.icon className={`w-4 h-4 text-${s.color}-dark`} strokeWidth={1.5} />
                </div>
                <p className="text-2xl font-heading font-semibold text-stone-800">{s.value}</p>
                <p className="text-xs text-stone-500 font-body">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {['overview', 'bookings'].map(t => (
              <button key={t} onClick={() => setTab(t)} data-testid={`admin-tab-${t}`}
                className={`px-4 py-2 rounded-full text-sm font-medium font-body transition-all ${
                  tab === t ? 'bg-stone-800 text-white' : 'bg-white border border-stone-200 text-stone-600'
                }`}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {/* Bookings Table */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="admin-bookings-table">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    {['Name', 'Service', 'Date', 'Time', 'Plan', 'Status', 'Payment', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-medium text-stone-500 uppercase tracking-wider font-body">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-8 text-center text-stone-400 font-body">No bookings yet</td></tr>
                  ) : bookings.map(b => (
                    <tr key={b.id} data-testid={`admin-booking-${b.id}`} className="hover:bg-stone-50 transition-colors">
                      <td className="px-4 py-3 font-body font-medium text-stone-800">{b.name}</td>
                      <td className="px-4 py-3 font-body text-stone-600">{b.service}</td>
                      <td className="px-4 py-3 font-body text-stone-600">{b.date}</td>
                      <td className="px-4 py-3 font-body text-stone-600">{b.time}</td>
                      <td className="px-4 py-3 font-body text-stone-600 capitalize">{b.plan}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusColors[b.status] || statusColors.pending}`}>{b.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium ${b.payment_status === 'paid' ? 'text-accent-dark' : 'text-yellow-600'}`}>
                          {b.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {b.status === 'pending' && (
                            <>
                              <button onClick={() => updateStatus(b.id, 'confirmed')} data-testid={`confirm-booking-${b.id}`}
                                className="w-7 h-7 rounded-lg bg-accent-muted flex items-center justify-center hover:bg-accent-light transition-colors">
                                <Check className="w-3.5 h-3.5 text-accent-dark" strokeWidth={2} />
                              </button>
                              <button onClick={() => updateStatus(b.id, 'cancelled')} data-testid={`cancel-booking-${b.id}`}
                                className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors">
                                <X className="w-3.5 h-3.5 text-red-500" strokeWidth={2} />
                              </button>
                            </>
                          )}
                          {b.status === 'confirmed' && (
                            <button onClick={() => updateStatus(b.id, 'completed')} data-testid={`complete-booking-${b.id}`}
                              className="text-xs text-secondary-dark font-medium font-body hover:underline">Complete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
