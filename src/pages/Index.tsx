import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, BookOpen, Users, FileText, Handshake, Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MetaTags from '@/components/seo/MetaTags';

const QuickHelp = lazy(() => import('@/components/QuickHelp'));

const Index = () => {
  const featuredResources = [
    {
      title: "Buying & Selling Guide",
      description: "Essential tips and checklists for horse transactions.",
      icon: FileText,
      link: "/learn/buying-selling",
      type: "Guide"
    },
    {
      title: "Horse Care Basics",
      description: "Learn about proper horse care, health, and welfare.",
      icon: Shield,
      link: "/learn/horse-care",
      type: "Guide"
    },
    {
      title: "Yard Management",
      description: "Tips for yard owners and horse owners.",
      icon: Handshake,
      link: "/learn/yard-management",
      type: "Guide"
    }
  ];

  const quickHelpItems = [
    {
      question: "How long do I have to return a horse?",
      answer: "Return periods vary by seller type and contract terms. Business sellers offer 30 days under Consumer Rights Act 2015, while distance selling has a 14-day cooling-off period.",
      link: "/learn/returns"
    },
    {
      question: "What should I look for when buying a horse?",
      answer: "Consider the horse's temperament, training level, health history, and whether it matches your riding ability and goals. Always have a pre-purchase veterinary examination.",
      link: "/learn/buying-guide"
    },
    {
      question: "How do I find the right livery yard?",
      answer: "Look for yards that match your needs in terms of facilities, services, and atmosphere. Visit several yards, ask questions, and talk to current liveries.",
      link: "/learn/livery-guide"
    },
    {
      question: "What are the basic horse care requirements?",
      answer: "Horses need regular feeding, clean water, shelter, exercise, and veterinary care. Daily turnout, grooming, and attention to their hooves are essential.",
      link: "/learn/horse-care"
    }
  ];

  return (
    <>
      <MetaTags
        title="FindMyHorse - Your Complete Horse Guide"
        description="Your trusted resource for everything horse-related. From buying and selling to care, training, and community support."
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="hero-gradient min-h-[50vh] flex items-center justify-center px-4 py-12">
          <div className="container mx-auto text-center hero-content">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white hero-title">
              FindMyHorse
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white/90 hero-subtitle">
              Your Horse Journey
            </h2>
            <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-8 hero-description">
              Your complete guide to horse ownership, care, and legal protection. 
              From finding your perfect horse to understanding your rights and responsibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center hero-buttons">
              <Link to="/learn">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore Guides
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline" className="bg-primary/10 text-white border-white hover:bg-primary/20">
                  <Calculator className="mr-2 h-5 w-5" />
                  Use Interactive Tools
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
                Start Your Journey Here
              </h2>
              <p className="text-xl text-equine-forest max-w-2xl mx-auto">
                Begin with our core guides covering the most common legal questions in the equestrian world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredResources.map((resource, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white group cursor-pointer">
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto bg-equine-accent p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <resource.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="bg-equine-warm text-equine-forest px-3 py-1 rounded-full text-sm font-semibold mb-2 inline-block">
                      {resource.type}
                    </span>
                    <CardTitle className="text-xl font-heading text-equine-navy">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-equine-forest mb-6">
                      {resource.description}
                    </p>
                    <Link to={resource.link}>
                      <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest font-semibold">
                        Read Guide
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-20 bg-equine-warm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Quick Legal Questions</h2>
            <p className="text-lg text-equine-forest mb-12">Fast answers to common equestrian legal queries.</p>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {quickHelpItems.map((item, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-equine-navy text-lg">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-equine-forest mb-4">{item.answer}</p>
                    <Link to={item.link} className="text-equine-accent font-semibold hover:underline">
                      Learn More <ArrowRight className="inline h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trust & Community */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-6">
              A Trusted Resource for Horse Lovers
            </h2>
            <p className="text-xl text-equine-forest mb-12 max-w-3xl mx-auto">
              FindMyHorse was created by equine professionals and enthusiasts to provide clear, reliable information and support for the entire UK equestrian community.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-equine-navy mb-2">Community Focused</h3>
                <p className="text-equine-forest">Built for riders, owners, and professionals</p>
              </div>
              <div className="text-center">
                <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-equine-navy mb-2">Always Free & Impartial</h3>
                <p className="text-equine-forest">No hidden costs, no upselling.</p>
              </div>
              <div className="text-center">
                <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-equine-navy mb-2">Practical & Clear</h3>
                <p className="text-equine-forest">Real-world guidance, not dense legal theory</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hero-gradient py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
              Ready to Navigate Your Equestrian Journey with Confidence?
            </h2>
            <p className="text-xl text-equine-sage mb-8">
              Explore our comprehensive guides or use our interactive tools to get the clarity you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learn">
                <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest font-semibold px-8 py-4 text-lg w-full">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore All Guides
                </Button>
              </Link>
              <Link to="/tools">
                <Button size="lg" variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white font-semibold px-8 py-4 text-lg w-full">
                  Discover Interactive Tools
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Index;
