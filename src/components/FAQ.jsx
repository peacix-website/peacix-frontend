import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'How do I book a counseling session?',
    a: 'You can book a session directly through our website by filling out the booking form. Choose your preferred service type, date, and time, and we\'ll confirm your appointment within 24 hours. You can also call us at +91 8510055849.',
  },
  {
    q: 'What types of counseling services do you offer?',
    a: 'We offer Individual Therapy, Relationship & Family Counseling, Career Guidance, and Student Support. All services are available both online (video) and in-person.',
  },
  {
    q: 'Are your counselors licensed and qualified?',
    a: 'Yes, all our counselors are RCI (Rehabilitation Council of India) registered and licensed professionals with extensive experience in their specializations.',
  },
  {
    q: 'How much does counseling cost?',
    a: 'Our pricing starts from \u20B9499 per session for the Basic plan, \u20B9799 for Standard, and \u20B91,299 for Premium. We believe in transparent pricing with no hidden fees.',
  },
  {
    q: 'Is my information confidential?',
    a: 'Absolutely. We maintain strict confidentiality standards and are HIPAA compliant. All sessions are encrypted end-to-end, and your personal information is never shared without your explicit consent.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" data-testid="faq-section" className="py-20 md:py-32 bg-gradient-to-b from-[#FAFAF9] to-white">
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium tracking-widest uppercase text-secondary-dark mb-3 block">Common Questions</span>
          <h2 className="text-4xl md:text-5xl font-heading font-medium tracking-tight text-stone-800 mb-4">
            Get answers to common questions
          </h2>
          <p className="text-lg text-stone-500 font-body">
            Everything you need to know about our services and support.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              data-testid={`faq-item-${i}`}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-heading font-medium text-stone-800 pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-stone-400 flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-5 pb-5 text-stone-600 leading-relaxed font-body text-sm border-t border-stone-100 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <p className="text-stone-500 font-body mb-4">Still have questions? We're here to help.</p>
          <a
            href="#contact"
            data-testid="faq-contact-btn"
            className="inline-flex items-center gap-2 bg-secondary-muted text-secondary-dark font-semibold px-6 py-2.5 rounded-full hover:bg-secondary-light transition-all duration-300"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
