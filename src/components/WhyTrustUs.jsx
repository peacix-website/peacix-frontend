import { motion } from 'framer-motion';
import { Award, Sparkles, Calendar, HeartHandshake, TrendingUp, Lock } from 'lucide-react';

const benefits = [
  { icon: Award, title: 'Licensed Professionals', desc: 'All our counselors are RCI registered and licensed to practice', color: 'primary' },
  { icon: Sparkles, title: 'Personalized Approach', desc: 'Tailored counseling sessions based on your unique needs and goals', color: 'secondary' },
  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Book sessions at your convenience with 24/7 availability', color: 'accent' },
  { icon: HeartHandshake, title: 'Compassionate Care', desc: 'Empathetic support in a safe, non-judgmental environment', color: 'primary' },
  { icon: TrendingUp, title: 'Proven Results', desc: 'Evidence-based therapies with track record of positive outcomes', color: 'secondary' },
  { icon: Lock, title: 'Confidential & Secure', desc: 'Your privacy is our priority with end-to-end encryption', color: 'accent' },
];

const colorMap = {
  primary: { bg: 'bg-primary-muted', icon: 'text-primary-dark' },
  secondary: { bg: 'bg-secondary-muted', icon: 'text-secondary-dark' },
  accent: { bg: 'bg-accent-muted', icon: 'text-accent-dark' },
};

export default function WhyTrustUs() {
  return (
    <section data-testid="why-trust-us-section" className="py-20 md:py-32 relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary-muted/40 via-white to-accent-muted/30" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left - Header + Commitment */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium tracking-widest uppercase text-accent-dark mb-3 block">Our Approach</span>
            <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-6">
              Why thousands trust us for their mental health
            </h2>
            <p className="text-lg text-stone-500 leading-relaxed font-body mb-8">
              Experience the difference with our professional, compassionate, and results-driven approach to mental health support.
            </p>

            {/* Commitment Box */}
            <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-xl font-heading font-medium text-stone-800 mb-4">Our Commitment to You</h3>
              <p className="text-sm text-stone-500 mb-5 font-body leading-relaxed">
                At Peacix, we're committed to making mental health support accessible, affordable, and effective for everyone.
              </p>
              <ul className="space-y-3">
                {['Personalized treatment plans', 'Ongoing support and resources', 'Transparent pricing with no hidden fees', 'Continuous professional development'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm text-stone-700 font-body">
                    <span className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-dark" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Stat */}
              <div className="mt-6 pt-6 border-t border-stone-100 flex items-center gap-4">
                <div className="text-4xl font-heading font-semibold text-primary-dark">95%</div>
                <div>
                  <p className="text-sm font-semibold text-stone-800">Client Satisfaction Rate</p>
                  <p className="text-xs text-stone-500 font-body">Based on feedback from our community of clients</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Benefits Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {benefits.map((b, i) => {
              const colors = colorMap[b.color];
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  data-testid={`benefit-card-${b.title.toLowerCase().replace(/\s/g, '-')}`}
                  className="bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
                >
                  <div className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <b.icon className={`w-5 h-5 ${colors.icon}`} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-base font-heading font-semibold text-stone-800 mb-2">{b.title}</h4>
                  <p className="text-sm text-stone-500 leading-relaxed font-body">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
