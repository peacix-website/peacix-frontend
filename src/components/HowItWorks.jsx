import { motion } from 'framer-motion';
import { Search, CalendarCheck, Video } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Find Your Expert',
    description: 'Use our advanced matching system to find the right therapist based on your specific needs and preferences.',
    color: 'primary',
  },
  {
    icon: CalendarCheck,
    number: '02',
    title: 'Schedule Conveniently',
    description: 'Book appointments that fit your schedule with flexible timing options including same-day availability.',
    color: 'secondary',
  },
  {
    icon: Video,
    number: '03',
    title: 'Connect Securely',
    description: 'Join your session from anywhere through our secure and confidential platform.',
    color: 'accent',
  },
];

const colorMap = {
  primary: { bg: 'bg-primary-muted', icon: 'text-primary-dark', border: 'border-primary-light', numBg: 'bg-primary-light', numText: 'text-primary-dark' },
  secondary: { bg: 'bg-secondary-muted', icon: 'text-secondary-dark', border: 'border-secondary-light', numBg: 'bg-secondary-light', numText: 'text-secondary-dark' },
  accent: { bg: 'bg-accent-muted', icon: 'text-accent-dark', border: 'border-accent-light', numBg: 'bg-accent-light', numText: 'text-accent-dark' },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" data-testid="how-it-works-section" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary-dark mb-3 block">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Get started in three simple steps
          </h2>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto font-body">
            Our streamlined process ensures you can access the support you need quickly and easily.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-primary-light via-secondary-light to-accent-light" />

          {steps.map((step, i) => {
            const colors = colorMap[step.color];
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                data-testid={`step-card-${i + 1}`}
                className="relative bg-white rounded-2xl p-8 border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.5} />
                  </div>
                  <span className={`w-8 h-8 rounded-full ${colors.numBg} ${colors.numText} flex items-center justify-center text-sm font-bold font-body`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-medium text-stone-800 mb-3">{step.title}</h3>
                <p className="text-stone-500 leading-relaxed font-body">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent-muted text-accent-dark px-5 py-2.5 rounded-full text-sm font-medium">
            <span className="w-2 h-2 bg-accent-dark rounded-full animate-pulse" />
            No waiting lists — same day appointments available
          </div>
        </motion.div>
      </div>
    </section>
  );
}
