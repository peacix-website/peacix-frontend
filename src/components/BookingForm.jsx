import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, MapPin, Shield, Award, Zap, Send } from 'lucide-react';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', date: '', time: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/bookings`, form);
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', service: '', date: '', time: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" data-testid="booking-section" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-muted/50 via-white to-secondary-muted/30" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Book Your Session
          </h2>
          <p className="text-lg text-stone-500 font-body">
            Take the first step towards better mental health. We're here to support you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-xl font-heading font-medium text-stone-800 mb-6">Schedule Your Appointment</h3>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  data-testid="booking-success-message"
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-muted flex items-center justify-center mx-auto mb-4">
                    <Send className="w-7 h-7 text-accent-dark" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-heading font-medium text-stone-800 mb-2">Booking Received!</h4>
                  <p className="text-stone-500 font-body">We'll contact you within 24 hours to confirm your appointment.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} data-testid="booking-form" className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Full Name *</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        data-testid="booking-name-input"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Email Address *</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        data-testid="booking-email-input"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Phone Number *</label>
                      <input
                        type="tel" name="phone" required value={form.phone} onChange={handleChange}
                        data-testid="booking-phone-input"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Service Type *</label>
                      <select
                        name="service" required value={form.service} onChange={handleChange}
                        data-testid="booking-service-select"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none"
                      >
                        <option value="">Select a service</option>
                        <option value="online">Online Video Counseling</option>
                        <option value="career">Career Counseling</option>
                        <option value="relationship">Relationship & Family Counseling</option>
                        <option value="student">Student Mental Health Support</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Preferred Date *</label>
                      <input
                        type="date" name="date" required value={form.date} onChange={handleChange}
                        data-testid="booking-date-input"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Preferred Time *</label>
                      <input
                        type="time" name="time" required value={form.time} onChange={handleChange}
                        data-testid="booking-time-input"
                        className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1.5 font-body">Additional Message</label>
                    <textarea
                      name="message" rows="3" value={form.message} onChange={handleChange}
                      data-testid="booking-message-input"
                      className="w-full px-4 py-3 bg-[#FAFAF9] border border-stone-200 rounded-xl text-stone-800 text-sm font-body focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your concerns (optional)"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="booking-submit-btn"
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 disabled:opacity-60"
                  >
                    {submitting ? 'Submitting...' : 'Book Your Session'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info */}
            <div id="contact" className="bg-white rounded-2xl p-6 border border-stone-200">
              <h4 className="font-heading font-medium text-stone-800 mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary-muted flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">support@peacix.com</p>
                    <p className="text-xs text-stone-500 font-body">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-secondary-muted flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-secondary-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">+91 8510055849</p>
                    <p className="text-xs text-stone-500 font-body">Mon-Sat: 9AM - 9PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-muted flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-accent-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-800">Mon-Sat: 9AM - 9PM</p>
                    <p className="text-xs text-stone-500 font-body">Sunday: 10AM - 6PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h4 className="font-heading font-medium text-stone-800 mb-4">Why Choose Peacix?</h4>
              <div className="space-y-3">
                {[
                  { icon: Shield, label: 'HIPAA Compliant', color: 'primary' },
                  { icon: Award, label: 'Licensed Professionals', color: 'secondary' },
                  { icon: Zap, label: 'Quick Response', color: 'accent' },
                ].map(badge => (
                  <div key={badge.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-${badge.color}-muted flex items-center justify-center`}>
                      <badge.icon className={`w-4 h-4 text-${badge.color}-dark`} strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-stone-700 font-body">{badge.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-stone-100">
                <p className="text-xs text-stone-500 font-body"><strong className="text-stone-700">Response Time Guarantee:</strong> We'll contact you within 24 hours to confirm your appointment.</p>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200">
              <h4 className="font-heading font-medium text-stone-800 mb-3">Our Location</h4>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-dark flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-stone-700 font-body">Shalimar City, Shahibabad</p>
                  <p className="text-sm text-stone-700 font-body">Ghaziabad, UP, 201005</p>
                  <p className="text-sm text-stone-500 font-body mt-1">Virtual sessions available nationwide</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
