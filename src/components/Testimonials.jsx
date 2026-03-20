import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Rahul Mehta', role: 'Software Engineer', text: 'Peacix helped me overcome my anxiety and work-related stress. The counselors are professional and empathetic.', color: 'primary' },
  { name: 'Sneha Reddy', role: 'College Student', text: 'The sessions helped me manage exam pressure and improve my focus. I felt heard and supported.', color: 'secondary' },
  { name: 'Arjun Patel', role: 'Business Owner', text: 'Career counseling gave me clarity and practical tools to handle business challenges confidently.', color: 'accent' },
  { name: 'Divya Kumar', role: 'Marketing Manager', text: 'Relationship counseling helped rebuild trust and communication. Forever grateful.', color: 'primary' },
  { name: 'Vikram Shah', role: 'Teacher', text: 'Convenient, professional, and effective. The video sessions fit perfectly into my schedule.', color: 'secondary' },
];

const bgMap = {
  primary: 'from-primary-muted to-primary-light/30',
  secondary: 'from-secondary-muted to-secondary-light/30',
  accent: 'from-accent-muted to-accent-light/30',
};

const quoteMap = {
  primary: 'text-primary-dark/20',
  secondary: 'text-secondary-dark/20',
  accent: 'text-accent-dark/20',
};

const initialsMap = {
  primary: 'bg-primary-light text-primary-dark',
  secondary: 'bg-secondary-light text-secondary-dark',
  accent: 'bg-accent-light text-accent-dark',
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" data-testid="testimonials-section" className="py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary-dark mb-3 block">Client Stories</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Hear from real clients
          </h2>
          <p className="text-lg text-stone-500 max-w-xl mx-auto font-body">
            Real stories from people who transformed their mental health journey.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-testid={`testimonial-card-${i}`}
              className={`bg-gradient-to-br ${bgMap[t.color]} rounded-2xl p-8 relative overflow-hidden`}
            >
              <Quote className={`absolute top-4 right-4 w-10 h-10 ${quoteMap[t.color]}`} strokeWidth={1.5} />
              <p className="text-stone-700 leading-relaxed mb-6 font-body relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-full ${initialsMap[t.color]} flex items-center justify-center font-heading font-semibold text-sm`}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{t.name}</p>
                  <p className="text-xs text-stone-500 font-body">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {testimonials.slice(3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 3) * 0.12 }}
              data-testid={`testimonial-card-${i + 3}`}
              className={`bg-gradient-to-br ${bgMap[t.color]} rounded-2xl p-8 relative overflow-hidden`}
            >
              <Quote className={`absolute top-4 right-4 w-10 h-10 ${quoteMap[t.color]}`} strokeWidth={1.5} />
              <p className="text-stone-700 leading-relaxed mb-6 font-body relative z-10">"{t.text}"</p>
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-10 h-10 rounded-full ${initialsMap[t.color]} flex items-center justify-center font-heading font-semibold text-sm`}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">{t.name}</p>
                  <p className="text-xs text-stone-500 font-body">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.35 }}
                className={`bg-gradient-to-br ${bgMap[testimonials[current].color]} rounded-2xl p-8 relative overflow-hidden`}
              >
                <Quote className={`absolute top-4 right-4 w-10 h-10 ${quoteMap[testimonials[current].color]}`} strokeWidth={1.5} />
                <p className="text-stone-700 leading-relaxed mb-6 font-body relative z-10">"{testimonials[current].text}"</p>
                <div className="flex items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded-full ${initialsMap[testimonials[current].color]} flex items-center justify-center font-heading font-semibold text-sm`}>
                    {testimonials[current].name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800">{testimonials[current].name}</p>
                    <p className="text-xs text-stone-500 font-body">{testimonials[current].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} data-testid="testimonial-prev-btn" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-primary-muted transition-colors">
              <ChevronLeft className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-primary-dark w-6' : 'bg-stone-300'}`}
                />
              ))}
            </div>
            <button onClick={next} data-testid="testimonial-next-btn" className="w-10 h-10 rounded-full bg-white border border-stone-200 flex items-center justify-center hover:bg-primary-muted transition-colors">
              <ChevronRight className="w-5 h-5 text-stone-600" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
