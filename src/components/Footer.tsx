import { Link } from 'react-router-dom';
import { FileText, BookOpen, Users, Heart } from 'lucide-react';
import React, { useState } from 'react';
import Modal from './ui/Modal';

const Footer = () => {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const DisclaimerContent = () => (
    <div className="space-y-4 text-sm text-gray-700">
      <p>The content provided on this website is for informational purposes only and does not constitute legal advice. We are not a law firm and do not provide legal services.</p>
      <p>While we strive to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.</p>
      <p>Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
      <p>For specific legal advice, you should consult with a qualified solicitor. The use of this website does not create a solicitor-client relationship.</p>
    </div>
  );

  const PrivacyContent = () => (
    <div className="space-y-4 text-sm text-gray-700">
      <p>We are committed to protecting your privacy. This policy outlines how we handle your personal information.</p>
      <h3 className="font-semibold">Information We Collect</h3>
      <p>We may collect personal information such as your name and email address when you subscribe to our newsletter or use our contact forms. We also collect non-personal information through cookies to improve our website's functionality.</p>
      <h3 className="font-semibold">How We Use Your Information</h3>
      <p>Your information is used to personalize your experience, improve our website, and send periodic emails. We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.</p>
      <h3 className="font-semibold">Your Consent</h3>
      <p>By using our site, you consent to our privacy policy.</p>
    </div>
  );

  return (
    <>
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
              <li><Link to="/news" className="text-equine-sage hover:text-equine-cream transition-colors">Equestrian News</Link></li>
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

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/news" className="text-gray-400 hover:text-white transition-colors">News</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-equine-navy-light mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-equine-sage text-sm">
              © 2024 EquineClause. All resources provided for educational purposes.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
                <button onClick={() => setIsDisclaimerOpen(true)} className="text-equine-sage hover:text-equine-cream transition-colors">Legal Disclaimer</button>
                <button onClick={() => setIsPrivacyOpen(true)} className="text-equine-sage hover:text-equine-cream transition-colors">Privacy</button>
              <Link to="/about" className="text-equine-sage hover:text-equine-cream transition-colors">About</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Equine Legal Compass. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Powered by <a href="https://www.equinology.co.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Equinology</a>
          </p>
        </div>
      </div>
    </footer>
      <Modal 
        isOpen={isDisclaimerOpen} 
        onClose={() => setIsDisclaimerOpen(false)} 
        title="Legal Disclaimer"
      >
        <DisclaimerContent />
      </Modal>
      <Modal 
        isOpen={isPrivacyOpen} 
        onClose={() => setIsPrivacyOpen(false)} 
        title="Privacy Policy"
      >
        <PrivacyContent />
      </Modal>
    </>
  );
};

export default Footer;
