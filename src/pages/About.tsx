import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AlertTriangle } from 'lucide-react';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold font-heading text-gray-800 mb-4">
                About Equine Legal Compass
                </h1>
                <p className="text-xl text-gray-600">
                Your trusted guide for navigating the complexities of UK equine law.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to empower the UK's equestrian community by making equine law accessible, understandable, and manageable. We believe that everyone involved with horses, from owners and riders to business operators, deserves to have clear, reliable legal information at their fingertips. We aim to demystify complex legal topics, provide practical tools, and foster a community that is confident and knowledgeable in its legal rights and responsibilities.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Equine Legal Compass was born from a passion for both law and the equine world. The project was initiated and developed by a dedicated group of Law LLB students from the University of Kent who saw a need for clear, reliable legal resources tailored to horse owners, riders, and professionals in the United Kingdom.
              </p>
              <p className="text-gray-700 leading-relaxed">
                As law students with a shared enthusiasm for all things equine, we combined our academic knowledge with practical insights to build this platform. We are driven by the desire to bridge the gap between complex legal jargon and the everyday situations faced by the equestrian community.
              </p>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold font-heading text-gray-800 mb-6">Our Team</h2>
              <div className="flex justify-center items-center flex-wrap gap-8">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Henry" />
                    <AvatarFallback>H</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-800">Henry</h3>
                  <p className="text-sm text-gray-500">University of Kent</p>
                </div>
                 <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-2">
                    <AvatarImage src="https://github.com/shadcn.png" alt="Student Developer" />
                    <AvatarFallback>SD</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-800">Student Developer</h3>
                  <p className="text-sm text-gray-500">University of Kent</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-6">
                 <div className="flex items-center mb-3">
                    <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                    <h2 className="text-2xl font-bold font-heading text-red-800">Legal Disclaimer</h2>
                </div>
                <div className="text-red-700 space-y-3">
                    <p>
                        The content provided on Equine Legal Compass is for informational purposes only and does not constitute legal advice. While we strive to provide accurate and up-to-date information, the law is complex and changes frequently.
                    </p>
                    <p>
                        This website is not a substitute for professional legal counsel. We strongly recommend that you consult with a qualified solicitor for advice on your specific situation. Your use of this website does not create a solicitor-client relationship between you and Equine Legal Compass or its contributors.
                    </p>
                     <p>
                        We disclaim any and all liability for any loss or damage arising from your reliance on any information provided on this site.
                    </p>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
