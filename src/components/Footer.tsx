
import { Link } from 'react-router-dom';
import { FileText, BookOpen, Users, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-equine-navy text-equine-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-equine-accent p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-heading font-bold">EquineClause</h2>
                <p className="text-sm text-equine-sage">Legal Clarity for Horse Sales</p>
              </div>
            </div>
            <p className="text-equine-sage text-sm leading-relaxed">
              Free, clear legal guidance for horse buyers and sellers. Making equine transactions safer and more transparent for everyone.
            </p>
          </div>

          {/* Learn */}
          <div>
            <h3 className="font-heading font-semibold text-equine-accent mb-4">Learn</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="text-equine-sage hover:text-equine-cream transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/learn" className="text-equine-sage hover:text-equine-cream transition-colors">Contract Basics</Link></li>
              <li><Link to="/learn" className="text-equine-sage hover:text-equine-cream transition-colors">Dispute Resolution</Link></li>
              <li><Link to="/learn" className="text-equine-sage hover:text-equine-cream transition-colors">Buyer Protection</Link></li>
              <li><Link to="/learn" className="text-equine-sage hover:text-equine-cream transition-colors">Seller Rights</Link></li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h3 className="font-heading font-semibold text-equine-accent mb-4">Tools & Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tools" className="text-equine-sage hover:text-equine-cream transition-colors">Contract Builder</Link></li>
              <li><Link to="/tools" className="text-equine-sage hover:text-equine-cream transition-colors">Refund Checklist</Link></li>
              <li><Link to="/resources" className="text-equine-sage hover:text-equine-cream transition-colors">Template Downloads</Link></li>
              <li><Link to="/resources" className="text-equine-sage hover:text-equine-cream transition-colors">Buyer Guides</Link></li>
              <li><Link to="/cases" className="text-equine-sage hover:text-equine-cream transition-colors">Real Case Studies</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-heading font-semibold text-equine-accent mb-4">Community</h3>
            <div className="space-y-3 text-sm">
              <p className="text-equine-sage">
                Created by and for the equine community. All resources are free and designed to empower horse enthusiasts with legal clarity.
              </p>
              <div className="flex items-center space-x-2 text-equine-sage">
                <Heart className="h-4 w-4 text-equine-accent" />
                <span>Made for horse lovers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-equine-navy-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-equine-sage text-sm">
              © 2024 EquineClause. All resources provided for educational purposes.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <Link to="/disclaimer" className="text-equine-sage hover:text-equine-cream transition-colors">Legal Disclaimer</Link>
              <Link to="/privacy" className="text-equine-sage hover:text-equine-cream transition-colors">Privacy</Link>
              <Link to="/about" className="text-equine-sage hover:text-equine-cream transition-colors">About</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
