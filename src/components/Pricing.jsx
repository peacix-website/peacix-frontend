import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    subtitle: 'Perfect for getting started',
    price: '499',
    features: ['Single 45-minute session', 'Chat support access', 'Email follow-up', 'Basic assessment tools'],
    popular: false,
    color: 'primary',
  },
  {
    name: 'Standard',
    subtitle: 'Most popular choice',
    price: '799',
    features: ['Single 60-minute session', 'Priority scheduling', 'Chat & video support', 'Personalized care plan', 'Progress tracking', 'Resource materials'],
    popular: true,
    color: 'secondary',
  },
  {
    name: 'Premium',
    subtitle: 'Comprehensive care package',
    price: '1,299',
    features: ['Extended 90-minute session', 'Priority 24/7 support', 'Unlimited chat access', 'Customized therapy plan', 'Weekly check-ins', 'Emergency support', 'Family session included'],
    popular: false,
    color: 'accent',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" data-testid="pricing-section" className="py-20 md:py-32 bg-gradient-to-b from-white to-[#FAFAF9]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-primary-dark mb-3 block">Flexible Options</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Simple, transparent pricing for everyone
          </h2>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto font-body">
            Choose the option that fits your needs. No hidden fees.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
              className={`relative bg-white rounded-2xl p-8 border transition-all duration-500 hover:-translate-y-1 ${
                plan.popular
                  ? 'border-secondary shadow-xl shadow-secondary/10 ring-1 ring-secondary/20'
                  : 'border-stone-200 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 bg-secondary-dark text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                    <Star className="w-3 h-3" strokeWidth={2} fill="currentColor" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-heading font-semibold text-stone-800">{plan.name}</h3>
                <p className="text-sm text-stone-500 font-body mt-1">{plan.subtitle}</p>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-stone-500 font-body">{'\u20B9'}</span>
                <span className="text-4xl font-heading font-semibold text-stone-800">{plan.price}</span>
                <span className="text-sm text-stone-500 font-body">per session</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-stone-600 font-body">
                    <Check className="w-4 h-4 mt-0.5 text-accent-dark flex-shrink-0" strokeWidth={2} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                data-testid={`pricing-choose-${plan.name.toLowerCase()}`}
                className={`block text-center font-semibold px-6 py-3 rounded-full transition-all duration-300 ${
                  plan.popular
                    ? 'bg-secondary-dark hover:bg-secondary text-white shadow-sm hover:shadow-md'
                    : 'border-2 border-primary text-primary-dark hover:bg-primary-muted'
                }`}
              >
                Choose Plan
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-stone-500 mt-8 font-body"
        >
          All plans include secure sessions and 100% confidentiality.
        </motion.p>
      </div>
    </section>
  );
}
