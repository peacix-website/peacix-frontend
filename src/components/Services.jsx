import { motion } from 'framer-motion';
import { User, Heart, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: User,
    title: 'Individual Therapy',
    price: '1,299',
    description: 'One-on-one counseling sessions with licensed therapists for personalized support.',
    features: ['Personalized approach', 'Flexible scheduling', 'Evidence-based therapy'],
    color: 'primary',
  },
  {
    icon: Heart,
    title: 'Relationship Counseling',
    price: '1,599',
    description: 'Couples and family therapy to strengthen connections and improve communication.',
    features: ['Couples therapy', 'Family systems', 'Communication skills'],
    color: 'secondary',
  },
  {
    icon: Briefcase,
    title: 'Career Guidance',
    price: '1,499',
    description: 'Professional counseling for career transitions and workplace development.',
    features: ['Career planning', 'Workplace support', 'Leadership coaching'],
    color: 'accent',
  },
  {
    icon: GraduationCap,
    title: 'Student Support',
    price: '1,199',
    description: 'Specialized counseling for academic stress and life transitions.',
    features: ['Academic stress', 'Peer pressure', 'Exam anxiety'],
    color: 'primary',
  },
];

const colorMap = {
  primary: { bg: 'bg-primary-muted', icon: 'text-primary-dark', badge: 'bg-primary-light text-primary-dark', hover: 'group-hover:bg-primary-muted' },
  secondary: { bg: 'bg-secondary-muted', icon: 'text-secondary-dark', badge: 'bg-secondary-light text-secondary-dark', hover: 'group-hover:bg-secondary-muted' },
  accent: { bg: 'bg-accent-muted', icon: 'text-accent-dark', badge: 'bg-accent-light text-accent-dark', hover: 'group-hover:bg-accent-muted' },
};

export default function Services() {
  return (
    <section id="services" data-testid="services-section" className="py-20 md:py-32 bg-gradient-to-b from-[#FAFAF9] to-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-secondary-dark mb-3 block">Comprehensive Care</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Find the right expert for every age & concern
          </h2>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto font-body">
            In-person & online options available for individuals and families.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const colors = colorMap[service.color];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                data-testid={`service-card-${service.title.toLowerCase().replace(/\s/g, '-')}`}
                className="group bg-white rounded-2xl p-6 border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-stone-800 mb-1">{service.title}</h3>
                <p className="text-primary-dark font-semibold text-lg mb-3 font-body">{'\u20B9'}{service.price}<span className="text-sm text-stone-400 font-normal">/session</span></p>
                <p className="text-sm text-stone-500 mb-4 leading-relaxed font-body">{service.description}</p>
                <ul className="space-y-2 mb-5">
                  {service.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-stone-600 font-body">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-dark flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark hover:text-primary transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" strokeWidth={2} />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Immediate Support Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 bg-gradient-to-r from-primary-muted to-secondary-muted rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-2xl font-heading font-medium text-stone-800 mb-2">Need Immediate Support?</h3>
            <p className="text-stone-600 font-body">Our comprehensive mental health programs are designed to meet your specific needs with care and confidentiality.</p>
          </div>
          <a
            href="#contact"
            data-testid="immediate-support-btn"
            className="flex-shrink-0 bg-primary-dark hover:bg-stone-800 text-white font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
