import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Globe, Clock, MapPin, Shield, Video, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const plans = [
  { id: 'basic', name: 'Basic', duration: '45 min', price: 499 },
  { id: 'standard', name: 'Standard', duration: '60 min', price: 799 },
  { id: 'premium', name: 'Premium', duration: '90 min', price: 1299 },
];

export default function TherapistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [therapist, setTherapist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('standard');
  const [bookingForm, setBookingForm] = useState({ date: '', time: '', message: '' });
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios.get(`${API}/therapists/${id}`)
      .then(res => setTherapist(res.data))
      .catch(() => navigate('/therapists'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleBook = async (e) => {
    e.preventDefault();
    setBooking(true);
    const plan = plans.find(p => p.id === selectedPlan);
    try {
      const bookingRes = await axios.post(`${API}/bookings`, {
        name: user?.name || 'Guest',
        email: user?.email || '',
        phone: '',
        service: therapist.title,
        date: bookingForm.date,
        time: bookingForm.time,
        message: bookingForm.message,
        therapist_id: id,
        plan: selectedPlan,
      });
      // Create payment order
      const paymentRes = await axios.post(`${API}/payments/create-order`, {
        booking_id: bookingRes.data.id,
        amount: plan.price,
      });
      if (paymentRes.data.mock) {
        // Mock payment flow
        await axios.post(`${API}/payments/verify`, {
          razorpay_order_id: paymentRes.data.order_id,
          razorpay_payment_id: `pay_mock_${Date.now()}`,
          razorpay_signature: 'mock_signature',
          booking_id: bookingRes.data.id,
        });
        setSuccess(true);
      } else {
        // Real Razorpay flow
        const options = {
          key: paymentRes.data.key_id,
          amount: paymentRes.data.amount,
          currency: paymentRes.data.currency,
          order_id: paymentRes.data.order_id,
          name: 'Peacix',
          description: `${plan.name} Session with ${therapist.name}`,
          handler: async (response) => {
            await axios.post(`${API}/payments/verify`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              booking_id: bookingRes.data.id,
            });
            setSuccess(true);
          },
          prefill: { name: user?.name, email: user?.email },
        };
        if (window.Razorpay) {
          new window.Razorpay(options).open();
        } else {
          setSuccess(true);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-stone-400 font-body">Loading...</div>;
  if (!therapist) return null;

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="bg-gradient-to-br from-primary-muted via-white to-secondary-muted pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <Link to="/therapists" className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-primary-dark font-body mb-6">
            <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Therapists
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 -mt-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                <img src={therapist.image} alt={therapist.name} className="w-32 h-32 rounded-2xl object-cover flex-shrink-0" />
                <div>
                  <h1 className="text-2xl font-heading font-semibold text-stone-800" data-testid="therapist-name">{therapist.name}</h1>
                  <p className="text-primary-dark font-body font-medium">{therapist.title}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-stone-500 font-body">
                    <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" fill="currentColor" /> {therapist.rating} ({therapist.reviews} reviews)</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" strokeWidth={1.5} /> {therapist.experience}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {therapist.specialties?.map(s => (
                      <span key={s} className="text-xs bg-secondary-muted text-secondary-dark px-2.5 py-1 rounded-full font-body">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-stone-500 font-body">
                    <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {therapist.languages?.join(', ')}</span>
                    <span className="flex items-center gap-1"><Video className="w-4 h-4" /> {therapist.mode?.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-stone-100 p-6">
                <h3 className="font-heading font-medium text-stone-800 mb-3">About</h3>
                <p className="text-stone-600 font-body leading-relaxed">{therapist.bio}</p>
              </div>
              <div className="border-t border-stone-100 p-6">
                <div className="flex items-center gap-6">
                  {[{ icon: Shield, text: 'Licensed' }, { icon: Clock, text: therapist.availability }, { icon: Star, text: `${therapist.reviews}+ reviews` }].map(b => (
                    <div key={b.text} className="flex items-center gap-2 text-sm text-stone-600 font-body">
                      <b.icon className="w-4 h-4 text-accent-dark" strokeWidth={1.5} />
                      {b.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            {success ? (
              <div data-testid="booking-success" className="bg-white rounded-2xl border border-stone-200 p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7 text-accent-dark" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-heading font-medium text-stone-800 mb-2">Booking Confirmed!</h3>
                <p className="text-sm text-stone-500 font-body mb-4">Your session with {therapist.name} has been booked.</p>
                <Link to="/dashboard" className="inline-flex bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-all">
                  Go to Dashboard
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-6">
                <h3 className="font-heading font-medium text-stone-800 mb-4">Book a Session</h3>

                {/* Plan Selection */}
                <div className="space-y-2 mb-5">
                  {plans.map(p => (
                    <button key={p.id} onClick={() => setSelectedPlan(p.id)} data-testid={`plan-select-${p.id}`}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        selectedPlan === p.id ? 'border-primary bg-primary-muted' : 'border-stone-200 hover:border-primary-light'
                      }`}>
                      <div>
                        <span className="text-sm font-semibold text-stone-800 font-body">{p.name}</span>
                        <span className="text-xs text-stone-500 font-body ml-2">{p.duration}</span>
                      </div>
                      <span className="text-sm font-semibold text-stone-800 font-body">{'\u20B9'}{p.price}</span>
                    </button>
                  ))}
                </div>

                <form onSubmit={handleBook} data-testid="therapist-booking-form" className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1 font-body">Date</label>
                    <input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                      data-testid="therapist-booking-date" className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-stone-200 rounded-xl text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1 font-body">Time</label>
                    <input type="time" required value={bookingForm.time} onChange={e => setBookingForm({...bookingForm, time: e.target.value})}
                      data-testid="therapist-booking-time" className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-stone-200 rounded-xl text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 mb-1 font-body">Message (optional)</label>
                    <textarea rows="2" value={bookingForm.message} onChange={e => setBookingForm({...bookingForm, message: e.target.value})}
                      className="w-full px-3 py-2.5 bg-[#FAFAF9] border border-stone-200 rounded-xl text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" />
                  </div>
                  <button type="submit" disabled={booking} data-testid="therapist-book-submit"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-full transition-all duration-300 disabled:opacity-60">
                    {booking ? 'Processing...' : `Book & Pay \u20B9${currentPlan?.price}`}
                  </button>
                </form>
                {!user && (
                  <p className="text-center text-xs text-stone-500 mt-3 font-body">
                    <Link to="/login" className="text-primary-dark font-semibold hover:underline">Sign in</Link> for a personalized experience
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
