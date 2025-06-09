
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Shield, FileText, Users, CheckCircle, ArrowRight, Award, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Index = () => {
  const services = [
    {
      icon: FileText,
      title: "Purchase & Sale Agreements",
      description: "Comprehensive legal documentation for horse transactions, protecting both buyers and sellers.",
      features: ["Pre-purchase exams", "Warranty clauses", "Risk allocation"]
    },
    {
      icon: Shield,
      title: "Liability & Insurance",
      description: "Expert guidance on liability protection and insurance claims for equestrian operations.",
      features: ["Liability waivers", "Insurance disputes", "Risk management"]
    },
    {
      icon: Users,
      title: "Breeding & Partnerships",
      description: "Specialized contracts for breeding operations, syndications, and business partnerships.",
      features: ["Breeding contracts", "Syndication agreements", "Partnership structures"]
    }
  ];

  const stats = [
    { number: "500+", label: "Cases Handled" },
    { number: "15+", label: "Years Experience" },
    { number: "98%", label: "Success Rate" },
    { number: "24/7", label: "Emergency Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-equine-cream py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
                Expert Legal Counsel for the 
                <span className="text-equine-gold"> Equestrian Community</span>
              </h1>
              <p className="text-xl lg:text-2xl text-equine-sage-light mb-8 leading-relaxed">
                Protecting your interests in horse purchases, sales, leases, and equestrian business operations with specialized legal expertise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold px-8 py-4 text-lg">
                  Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-equine-cream text-equine-cream hover:bg-equine-cream hover:text-equine-navy px-8 py-4 text-lg">
                  View Services
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="bg-gradient-to-br from-equine-gold to-equine-gold-light p-8 rounded-2xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=600&h=400&fit=crop&crop=center"
                  alt="Horse in field representing equestrian legal services"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-2">
                  {stat.number}
                </div>
                <div className="text-equine-sage font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-equine-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Specialized Legal Services
            </h2>
            <p className="text-xl text-equine-sage max-w-3xl mx-auto">
              We understand the unique challenges of the equestrian industry and provide tailored legal solutions for every aspect of your horse-related business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <CardContent className="p-8">
                  <div className="bg-equine-gold p-3 rounded-lg w-fit mb-6">
                    <service.icon className="h-8 w-8 text-equine-navy" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-equine-navy mb-4">
                    {service.title}
                  </h3>
                  <p className="text-equine-sage mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-equine-sage">
                        <CheckCircle className="h-4 w-4 text-equine-gold mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-6">
                Why Equestrian Professionals Choose Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-equine-gold p-2 rounded-lg">
                    <Award className="h-6 w-6 text-equine-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-equine-navy mb-2">Industry Expertise</h3>
                    <p className="text-equine-sage">Deep understanding of equestrian law, horse industry practices, and regulatory requirements.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-equine-gold p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-equine-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-equine-navy mb-2">Responsive Service</h3>
                    <p className="text-equine-sage">Quick turnaround times and emergency support when time-sensitive matters arise.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-equine-gold p-2 rounded-lg">
                    <Globe className="h-6 w-6 text-equine-navy" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-equine-navy mb-2">Nationwide Reach</h3>
                    <p className="text-equine-sage">Licensed to practice in multiple states with experience in interstate horse transactions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600&h=500&fit=crop&crop=center"
                alt="Professional office building representing legal expertise"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-equine-navy/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-cream mb-6">
            Ready to Protect Your Equestrian Interests?
          </h2>
          <p className="text-xl text-equine-sage-light mb-8 leading-relaxed">
            Don't navigate complex equestrian legal matters alone. Get expert guidance from attorneys who understand your industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold px-8 py-4 text-lg">
              Schedule Free Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-equine-cream text-equine-cream hover:bg-equine-cream hover:text-equine-navy px-8 py-4 text-lg">
              <Link to="/resources">Browse Resources</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
