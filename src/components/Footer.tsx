
import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-equine-navy text-equine-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-equine-gold p-2 rounded-lg">
                <Scale className="h-6 w-6 text-equine-navy" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold">Equine Legal</h2>
                <p className="text-sm text-equine-gold">Advisors</p>
              </div>
            </div>
            <p className="text-equine-sage-light text-sm leading-relaxed">
              Specialized legal expertise for the equestrian community. Protecting your interests in horse transactions, disputes, and industry matters.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-equine-sage-light hover:text-equine-gold cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-equine-sage-light hover:text-equine-gold cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-equine-sage-light hover:text-equine-gold cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-equine-gold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-equine-sage-light hover:text-equine-cream transition-colors">Purchase & Sale Agreements</Link></li>
              <li><Link to="/services" className="text-equine-sage-light hover:text-equine-cream transition-colors">Lease Agreements</Link></li>
              <li><Link to="/services" className="text-equine-sage-light hover:text-equine-cream transition-colors">Insurance Claims</Link></li>
              <li><Link to="/services" className="text-equine-sage-light hover:text-equine-cream transition-colors">Liability & Risk Management</Link></li>
              <li><Link to="/services" className="text-equine-sage-light hover:text-equine-cream transition-colors">Breeding Contracts</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-heading font-semibold text-equine-gold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="text-equine-sage-light hover:text-equine-cream transition-colors">Legal Templates</Link></li>
              <li><Link to="/resources" className="text-equine-sage-light hover:text-equine-cream transition-colors">Industry Guidelines</Link></li>
              <li><Link to="/resources" className="text-equine-sage-light hover:text-equine-cream transition-colors">FAQ</Link></li>
              <li><Link to="/resources" className="text-equine-sage-light hover:text-equine-cream transition-colors">Case Studies</Link></li>
              <li><Link to="/resources" className="text-equine-sage-light hover:text-equine-cream transition-colors">Legal Updates</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-equine-gold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-equine-gold" />
                <span className="text-equine-sage-light">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-equine-gold" />
                <span className="text-equine-sage-light">info@equinelegal.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-equine-gold mt-0.5" />
                <span className="text-equine-sage-light">
                  123 Horse Park Drive<br />
                  Lexington, KY 40511
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-equine-navy-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-equine-sage-light text-sm">
              © 2024 Equine Legal Advisors. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link to="/privacy" className="text-equine-sage-light hover:text-equine-cream transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-equine-sage-light hover:text-equine-cream transition-colors">Terms of Service</Link>
              <Link to="/disclaimer" className="text-equine-sage-light hover:text-equine-cream transition-colors">Legal Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
