import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, User, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Services', href: '#services', landing: true },
  { label: 'Therapists', href: '/therapists', landing: false },
  { label: 'Quiz', href: '/quiz', landing: false },
  { label: 'Blog', href: '/blog', landing: false },
  { label: 'Pricing', href: '#pricing', landing: true },
  { label: 'Contact', href: '#contact', landing: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderLink = (link) => {
    if (link.landing && link.href.startsWith('#')) {
      if (isLanding) {
        return (
          <a key={link.href} href={link.href}
            data-testid={`nav-link-${link.label.toLowerCase()}`}
            className="text-sm font-medium text-stone-600 hover:text-primary-dark transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full">
            {link.label}
          </a>
        );
      }
      return (
        <Link key={link.href} to={`/${link.href}`}
          data-testid={`nav-link-${link.label.toLowerCase()}`}
          className="text-sm font-medium text-stone-600 hover:text-primary-dark transition-colors duration-300">
          {link.label}
        </Link>
      );
    }
    return (
      <Link key={link.href} to={link.href}
        data-testid={`nav-link-${link.label.toLowerCase()}`}
        className={`text-sm font-medium transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary-dark after:transition-all after:duration-300 hover:after:w-full ${
          location.pathname === link.href ? 'text-primary-dark after:w-full' : 'text-stone-600 hover:text-primary-dark after:w-0'
        }`}>
        {link.label === 'Quiz' && <Sparkles className="w-3 h-3 inline mr-1 mb-0.5" strokeWidth={1.5} />}
        {link.label}
      </Link>
    );
  };

  return (
    <motion.nav
      data-testid="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Heart className="w-4 h-4 text-white" strokeWidth={2} />
            </div>
            <span className="font-heading text-xl font-semibold text-stone-800 tracking-tight">Peacix</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(renderLink)}
            {user ? (
              <div className="flex items-center gap-3 ml-2">
                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} data-testid="nav-dashboard-btn"
                  className="flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-primary-dark transition-colors">
                  <User className="w-4 h-4" strokeWidth={1.5} />
                  {user.name?.split(' ')[0]}
                </Link>
                <button onClick={logout} data-testid="nav-logout-btn"
                  className="text-xs text-stone-400 hover:text-red-400 font-body transition-colors">Logout</button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2">
                <Link to="/login" data-testid="nav-login-btn"
                  className="text-sm font-medium text-stone-600 hover:text-primary-dark transition-colors">Sign In</Link>
                <Link to="/register" data-testid="nav-register-btn"
                  className="bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button data-testid="mobile-menu-toggle" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-stone-700">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-xl bg-white/95 border-b border-stone-200"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map(link => (
                link.landing && link.href.startsWith('#') ? (
                  <a key={link.href} href={isLanding ? link.href : `/${link.href}`} onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-stone-700 hover:text-primary-dark transition-colors">{link.label}</a>
                ) : (
                  <Link key={link.href} to={link.href} onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-stone-700 hover:text-primary-dark transition-colors">
                    {link.label === 'Quiz' && <Sparkles className="w-3.5 h-3.5 inline mr-1 mb-0.5" strokeWidth={1.5} />}
                    {link.label}
                  </Link>
                )
              ))}
              {user ? (
                <>
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-stone-700">Dashboard</Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }}
                    className="block text-base font-medium text-red-400">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-stone-700">Sign In</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)}
                    className="block text-center bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
