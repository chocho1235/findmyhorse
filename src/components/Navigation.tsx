
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Menu, X, BookOpen, Users } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Learn', path: '/learn' },
    { label: 'Tools', path: '/tools' },
    { label: 'Resources', path: '/resources' },
    { label: 'Case Studies', path: '/cases' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-equine-sage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-equine-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="text-equine-navy">
              <h1 className="text-xl font-heading font-bold">EquineClause</h1>
              <p className="text-xs text-equine-forest">Legal Clarity for Horse Sales</p>
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
                    ? 'text-equine-accent'
                    : 'text-equine-navy hover:text-equine-accent'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-equine-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button className="bg-equine-accent text-white hover:bg-equine-forest font-semibold">
              <BookOpen className="mr-2 h-4 w-4" />
              Start Learning
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-equine-navy hover:text-equine-accent transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-equine-warm rounded-lg mx-4 mb-4 p-4 animate-scale-in">
            <div className="space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-equine-accent'
                      : 'text-equine-navy hover:text-equine-accent'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-equine-sage">
                <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest font-semibold">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Learning
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
