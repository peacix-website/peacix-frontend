import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, BookOpen, Lightbulb, Trophy } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        await axios.post(`${API}/newsletter/subscribe`, { email });
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 4000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section data-testid="newsletter-section" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-secondary-muted via-white to-primary-muted rounded-3xl p-10 md:p-16 relative overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary-light/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-light/30 rounded-full blur-3xl" />

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-stone-800 mb-4">
              Get expert mental health insights
            </h2>
            <p className="text-stone-500 font-body mb-8 text-lg">
              Join our community to receive expert advice, wellness tips, and updates on our services.
            </p>

            <form onSubmit={handleSubmit} data-testid="newsletter-form" className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-10">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  data-testid="newsletter-email-input"
                  className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-full text-sm font-body text-stone-800 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                data-testid="newsletter-subscribe-btn"
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-500 font-body">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-stone-400 tracking-wider uppercase">Join 5,000+ subscribers</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { icon: BookOpen, label: 'Expert Articles', freq: 'Weekly' },
                { icon: Lightbulb, label: 'Wellness Tips', freq: 'Monthly' },
                { icon: Trophy, label: 'Success Stories', freq: 'Quarterly' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/80 border border-stone-100 flex items-center justify-center mx-auto mb-2">
                    <item.icon className="w-5 h-5 text-secondary-dark" strokeWidth={1.5} />
                  </div>
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">{item.freq}</p>
                  <p className="text-sm font-medium text-stone-700">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
