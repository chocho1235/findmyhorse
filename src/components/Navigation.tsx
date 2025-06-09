
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scale, Menu, X, Phone, Mail } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Resources', path: '/resources' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-equine-navy shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-equine-gold p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Scale className="h-8 w-8 text-equine-navy" />
            </div>
            <div className="text-equine-cream">
              <h1 className="text-xl font-heading font-bold">Equine Legal</h1>
              <p className="text-xs text-equine-gold">Advisors</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 relative ${
                  isActive(item.path)
                    ? 'text-equine-gold'
                    : 'text-equine-cream hover:text-equine-gold'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-equine-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-equine-cream text-sm">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <Button className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold">
              Free Consultation
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-equine-cream hover:text-equine-gold transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-equine-navy-light rounded-lg mx-4 mb-4 p-4 animate-scale-in">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-equine-gold'
                      : 'text-equine-cream hover:text-equine-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-equine-sage-light">
                <div className="flex items-center space-x-2 text-equine-cream text-sm mb-3">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <Button className="w-full bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold">
                  Free Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
