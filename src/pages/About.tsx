import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AlertTriangle, Target, BookOpen, Users, Heart, Shield, Calculator, Gavel, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MetaTags from '@/components/seo/MetaTags';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const About = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Comprehensive Learning Guides",
      description: "Clear, practical guides covering horse buying, selling, returns, and legal rights."
    },
    {
      icon: Calculator,
      title: "Interactive Tools",
      description: "Red flag detectors, dispute resolution wizards, and protection checklists."
    },
    {
      icon: Gavel,
      title: "Legal Case Analysis",
      description: "Real-world examples and outcomes to help you understand how the law applies."
    },
    {
      icon: Shield,
      title: "Buyer Protection Focus",
      description: "Specialized resources to help buyers navigate purchases safely and confidently."
    }
  ];

  return (
    <>
      <MetaTags
        title="About FindMyHorse - UK Equestrian Legal Guidance"
        description="Learn about FindMyHorse's mission to provide clear, practical legal guidance for UK horse buyers, sellers, and owners through interactive tools and educational resources."
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
                  Your trusted source for practical equestrian legal guidance in the UK.
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
                    We exist to make equestrian legal guidance accessible, understandable, and actionable for everyone in the UK horse community. Whether you're buying your first horse or managing a yard, we provide the practical tools and clear guidance you need to navigate legal challenges with confidence.
                  </p>
                </CardContent>
              </Card>

              {/* What We Offer */}
              <div>
                <h2 className="text-3xl font-bold font-heading text-equine-navy mb-8 text-center">What We Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {features.map((feature, index) => (
                    <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                          <feature.icon className="h-6 w-6 text-equine-accent" />
                        </div>
                        <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">{feature.title}</h3>
                        <p className="text-equine-forest">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Philosophy Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <Users className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">For Everyone</h3>
                    <p className="text-equine-forest">
                      From first-time buyers to experienced dealers, our resources are designed to help everyone understand their rights and responsibilities.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <CheckCircle className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">Practical & Actionable</h3>
                    <p className="text-equine-forest">
                      We focus on real-world solutions you can actually use, not dense legal theory that's hard to understand.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <Shield className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="text-xl font-bold font-heading text-equine-navy mb-3">Always Free</h3>
                    <p className="text-equine-forest">
                      Our mission is education and empowerment, not profit. All our guides and tools are completely free to use.
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
                      FindMyHorse was born from a simple observation: too many horse buyers and sellers were getting caught up in disputes that could have been prevented with better information and preparation.
                    </p>
                    <p>
                      We saw people struggling to understand their rights, unsure about return policies, and caught off guard by problems that experienced professionals would have spotted immediately. The legal information that existed was often buried in complex documents or expensive to access.
                    </p>
                    <p>
                      So we built FindMyHorse to bridge that gap - providing clear, practical guidance that anyone can understand and use. Our interactive tools help you identify red flags, understand your rights, and take the right steps when problems arise.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Section */}
              <Card className="border-0 shadow-lg bg-equine-warm">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-bold font-heading text-equine-navy mb-4">Ready to Get Started?</h2>
                  <p className="text-equine-forest text-lg mb-6">
                    Explore our guides and tools to protect yourself in your next horse transaction.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/learn">
                      <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Browse Learning Guides
                      </Button>
                    </Link>
                    <Link to="/tools">
                      <Button size="lg" variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                        <Calculator className="mr-2 h-5 w-5" />
                        Try Interactive Tools
                      </Button>
                    </Link>
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
                    <h2 className="text-3xl font-bold font-heading text-red-800">Important Legal Notice</h2>
                  </div>
                  <div className="space-y-4 text-red-700 leading-relaxed">
                    <p>
                      The information provided on FindMyHorse is for educational purposes only and does not constitute legal advice. While we strive to provide accurate and up-to-date information, laws and regulations can change.
                    </p>
                    <p>
                      For specific legal matters or complex situations, we strongly recommend consulting with a qualified solicitor who specializes in equine law. Our tools and guides are designed to help you understand general principles and prepare for professional consultations.
                    </p>
                    <p>
                      We disclaim any liability for decisions made based on information provided on this site. Always seek professional advice for your specific circumstances.
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
