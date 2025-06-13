import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AlertTriangle, Target, BookOpen, Users, Heart, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/seo/MetaTags';

const About = () => {
  return (
    <>
      <MetaTags
        title="About FindMyHorse - Our Mission and Story"
        description="Learn about FindMyHorse's mission to support and educate the equestrian community with practical advice and resources."
      />
      <div className="flex flex-col min-h-screen bg-background">
        <Navigation />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="hero-gradient text-white py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-extrabold font-heading mb-6">
                  About FindMyHorse
                </h1>
                <p className="text-xl text-equine-sage leading-relaxed">
                  Your trusted guide for navigating the complexities of UK equine law.
                </p>
              </div>
            </div>
          </section>

          <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
              {/* Mission Section */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-equine-accent p-3 rounded-lg">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-equine-navy">Our Mission</h2>
                  </div>
                  <p className="text-equine-forest leading-relaxed text-lg">
                    Our mission is to foster a fair, transparent, and educated equestrian community in the UK. We are dedicated to making equine law accessible and understandable for all, empowering both buyers and sellers to act with confidence. By providing clear, reliable legal information and practical tools, we aim to demystify complex topics and help prevent disputes before they arise.
                  </p>
                </CardContent>
              </Card>

              {/* Philosophy Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <Users className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">For Buyers & Sellers Alike</h3>
                    <p className="text-equine-forest">
                      We believe in a level playing field. The law is here to protect everyone, and our resources are designed to provide balanced, impartial guidance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <BookOpen className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">Education for Empowerment</h3>
                    <p className="text-equine-forest">
                      Knowledge is the best protection. We are committed to educating the public about the legalities of the equine world.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <Shield className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">A Voice for Truth</h3>
                    <p className="text-equine-forest">
                      In a world of complex transactions, clarity and honesty are paramount. Our platform stands for truth and integrity.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Story Section */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-equine-accent p-3 rounded-lg">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-equine-navy">Our Story</h2>
                  </div>
                  <div className="space-y-4 text-equine-forest leading-relaxed text-lg">
                    <p>
                      FindMyHorse was developed by a team of equine professionals and enthusiasts, combining their passion for horses with their expertise in various aspects of horse care and management.
                    </p>
                    <p>
                      As experienced horse owners and professionals with a shared love for all things equine, we identified a need for accessible, practical guidance in the equestrian community. This platform is the result of our efforts to provide valuable information and support for horse owners, riders, and enthusiasts across the UK.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Disclaimer */}
              <Card className="border-0 shadow-lg bg-red-50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-red-100 p-3 rounded-lg">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h2 className="text-3xl font-bold font-heading text-red-800">Legal Disclaimer</h2>
                  </div>
                  <div className="space-y-4 text-red-700 leading-relaxed">
                    <p>
                      The content provided on FindMyHorse is for informational purposes only. While we strive to provide accurate and up-to-date information, we recommend consulting with qualified professionals for specific advice about your horse.
                    </p>
                    <p>
                      This website is not a substitute for professional veterinary, farrier, or training advice. We strongly recommend that you consult with qualified professionals for advice on your specific situation.
                    </p>
                    <p>
                      We disclaim any and all liability for any loss or damage arising from your reliance on any information provided on this site.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
