
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield, CheckCircle, BookOpen, Users, Download, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Index = () => {
  const featuredResources = [
    {
      title: "Buyer Protection Checklist",
      description: "Essential steps to protect yourself when buying a horse",
      icon: Shield,
      link: "/tools",
      type: "Interactive Tool"
    },
    {
      title: "Return & Refund Guide",
      description: "Understanding your rights when a horse purchase goes wrong",
      icon: CheckCircle,
      link: "/learn",
      type: "Learning Guide"
    },
    {
      title: "Contract Template Library",
      description: "Free, customizable templates for horse sales agreements",
      icon: Download,
      link: "/resources",
      type: "Free Download"
    }
  ];

  const quickHelp = [
    {
      question: "Can I return a horse after purchase?",
      answer: "It depends on your contract terms, state laws, and the specific circumstances...",
      link: "/learn/returns"
    },
    {
      question: "What should be in a horse sale contract?",
      answer: "Key elements include health guarantees, trial periods, and return policies...",
      link: "/learn/contracts"
    },
    {
      question: "How do I handle a dispute with a seller?",
      answer: "Start with documentation, then follow these escalation steps...",
      link: "/learn/disputes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6">
            Clear Legal Guidance for
            <span className="block text-equine-accent">Horse Transactions</span>
          </h1>
          <p className="text-xl text-equine-sage mb-8 leading-relaxed max-w-3xl mx-auto">
            Free, approachable resources to help you navigate returns, contracts, and disputes when buying or selling horses. No legal jargon, just practical clarity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-equine-navy font-semibold px-8 py-4 text-lg">
              Browse Tools
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Most Popular Resources
            </h2>
            <p className="text-xl text-equine-forest max-w-2xl mx-auto">
              Start with these essential guides and tools used by thousands of horse buyers and sellers.
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
                      Access Resource
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help */}
      <section className="py-20 bg-equine-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Need Quick Answers?
            </h2>
            <p className="text-lg text-equine-forest">
              Get immediate clarity on the most common horse transaction questions.
            </p>
          </div>

          <div className="space-y-6">
            {quickHelp.map((item, index) => (
              <Card key={index} className="shadow-md border-0 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-equine-accent p-2 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-equine-navy text-lg mb-2">
                        {item.question}
                      </h3>
                      <p className="text-equine-forest mb-4">
                        {item.answer}
                      </p>
                      <Link to={item.link} className="text-equine-accent hover:text-equine-forest font-semibold inline-flex items-center">
                        Read full answer
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
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
            Trusted by the Equine Community
          </h2>
          <p className="text-xl text-equine-forest mb-12 max-w-3xl mx-auto">
            EquineClause was created by horse enthusiasts who understand the unique challenges of equine transactions. Our resources are free, practical, and designed to empower both buyers and sellers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-equine-navy mb-2">Community Driven</h3>
              <p className="text-equine-forest">Built by horse people, for horse people</p>
            </div>
            <div className="text-center">
              <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-equine-navy mb-2">Always Free</h3>
              <p className="text-equine-forest">No hidden costs, no consultations to sell</p>
            </div>
            <div className="text-center">
              <div className="bg-equine-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading font-semibold text-equine-navy mb-2">Practical Focus</h3>
              <p className="text-equine-forest">Real-world guidance, not legal theory</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Navigate Horse Sales with Confidence?
          </h2>
          <p className="text-xl text-equine-sage mb-8">
            Start with our comprehensive buyer's guide or explore interactive tools to protect your next horse transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg">
              <BookOpen className="mr-2 h-5 w-5" />
              Begin Learning Journey
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-equine-navy font-semibold px-8 py-4 text-lg">
              Download Free Templates
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
