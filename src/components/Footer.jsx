import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Services: [
    { label: 'Individual Therapy', href: '#services' },
    { label: 'Relationship Counseling', href: '#services' },
    { label: 'Career Guidance', href: '#services' },
    { label: 'Student Support', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Our Approach', href: '#' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer data-testid="footer-section" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-stone-800" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-dark/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-dark/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <Heart className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <span className="font-heading text-xl font-semibold text-white tracking-tight">Peacix</span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed font-body mb-6 max-w-sm">
              Making mental healthcare accessible, affordable, and effective for everyone. Your journey to wellness starts here.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-stone-400 font-body">
                <Mail className="w-4 h-4 text-primary" strokeWidth={1.5} />
                support@peacix.com
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-400 font-body">
                <Phone className="w-4 h-4 text-primary" strokeWidth={1.5} />
                +91 8510055849
              </div>
              <div className="flex items-center gap-2 text-sm text-stone-400 font-body">
                <MapPin className="w-4 h-4 text-primary" strokeWidth={1.5} />
                Ghaziabad, UP, India
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Instagram, href: 'https://instagram.com/peacix', label: 'Instagram' },
                { icon: Facebook, href: 'https://facebook.com/peacix', label: 'Facebook' },
                { icon: Twitter, href: 'https://twitter.com/peacix', label: 'Twitter' },
                { icon: Linkedin, href: 'https://linkedin.com/company/peacix', label: 'LinkedIn' },
                { icon: Youtube, href: 'https://youtube.com/@peacix', label: 'YouTube' },
              ].map(social => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer"
                  data-testid={`social-${social.label.toLowerCase()}`}
                  className="w-9 h-9 rounded-lg bg-stone-700 hover:bg-primary flex items-center justify-center transition-colors duration-300" aria-label={social.label}>
                  <social.icon className="w-4 h-4 text-stone-300" strokeWidth={1.5} />
                </a>
              ))}
              <a href="https://wa.me/918510055849" target="_blank" rel="noopener noreferrer"
                data-testid="social-whatsapp"
                className="w-9 h-9 rounded-lg bg-[#25D366] hover:bg-[#20BD5A] flex items-center justify-center transition-colors duration-300" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-heading font-semibold text-white mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-primary transition-colors duration-300 font-body"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-stone-700 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-500 font-body">
            &copy; {new Date().getFullYear()} Peacix. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-stone-500 hover:text-primary transition-colors font-body">Privacy</a>
            <a href="#" className="text-sm text-stone-500 hover:text-primary transition-colors font-body">Terms</a>
            <a href="#" className="text-sm text-stone-500 hover:text-primary transition-colors font-body">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
