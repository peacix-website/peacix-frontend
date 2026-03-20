import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, MessageCircleHeart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" data-testid="hero-section" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-muted via-[#FAFAF9] to-secondary-muted" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary-light/40 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary-light/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent-light/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary-light px-4 py-2 rounded-full text-sm font-medium text-primary-dark mb-6"
            >
              <span className="w-2 h-2 bg-accent-dark rounded-full animate-pulse" />
              Mental Healthcare Ecosystem
            </motion.span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium tracking-tight leading-tight text-stone-800 mb-6">
              A mental healthcare ecosystem for{' '}
              <span className="italic text-primary-dark">the way we live,</span>{' '}
              feel, and connect
            </h1>

            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-lg font-body">
              We follow the bio-psycho-social model because your body, mind, and environment all shape how you feel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#booking"
                data-testid="hero-book-session-btn"
                className="group inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-3.5 rounded-full shadow-sm hover:shadow-lg transition-all duration-300"
              >
                Find Your Expert
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </a>
              <a
                href="#how-it-works"
                data-testid="hero-learn-more-btn"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary-dark font-semibold px-8 py-3.5 rounded-full hover:bg-primary-muted transition-all duration-300"
              >
                Learn More
              </a>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Clock, label: 'Easy Booking' },
                { icon: Shield, label: '100% Confidential' },
                { icon: MessageCircleHeart, label: '24/7 Support' },
              ].map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-2 text-sm text-stone-600"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent-muted flex items-center justify-center">
                    <badge.icon className="w-4 h-4 text-accent-dark" strokeWidth={1.5} />
                  </div>
                  <span className="font-medium">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative">
              {/* Main image with organic shape */}
              <div className="rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1734527224929-ed91c6cfb19a?crop=entropy&cs=srgb&fm=jpg&q=85&w=600"
                  alt="Peaceful wellness"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl shadow-stone-200/50 border border-stone-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-muted flex items-center justify-center">
                    <span className="text-xl font-heading font-semibold text-accent-dark">95%</span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-stone-500">Client</p>
                    <p className="text-sm font-semibold text-stone-800">Satisfaction</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl shadow-stone-200/50 border border-stone-100"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-secondary-dark" strokeWidth={1.5} />
                  <span className="text-sm font-semibold text-stone-700">HIPAA Compliant</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
