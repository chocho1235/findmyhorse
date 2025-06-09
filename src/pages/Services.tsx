
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Shield, Users, Building, Gavel, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Services = () => {
  const serviceCategories = [
    {
      icon: FileText,
      title: "Horse Transactions",
      subtitle: "Purchase, Sale & Lease Agreements",
      description: "Comprehensive legal documentation for all types of horse transactions, ensuring your interests are fully protected.",
      services: [
        "Pre-purchase exam clauses",
        "Warranty and representation terms",
        "Payment and delivery arrangements",
        "Return policies and conditions",
        "Risk allocation provisions",
        "Insurance requirements"
      ],
      pricing: "Starting at $500"
    },
    {
      icon: Shield,
      title: "Liability & Risk Management",
      subtitle: "Protection & Insurance Claims",
      description: "Expert guidance on minimizing liability exposure and navigating insurance claims in equestrian operations.",
      services: [
        "Liability waiver drafting",
        "Insurance policy review",
        "Claims assistance",
        "Facility safety audits",
        "Staff training protocols",
        "Emergency response planning"
      ],
      pricing: "Starting at $350"
    },
    {
      icon: Users,
      title: "Breeding & Syndications",
      subtitle: "Breeding Contracts & Partnerships",
      description: "Specialized legal services for breeding operations, stallion syndications, and equestrian partnerships.",
      services: [
        "Stallion service contracts",
        "Mare lease agreements",
        "Syndication structures",
        "Partnership agreements",
        "Bloodstock insurance",
        "Registration transfers"
      ],
      pricing: "Starting at $750"
    },
    {
      icon: Building,
      title: "Equestrian Business Law",
      subtitle: "Business Formation & Operations",
      description: "Legal support for establishing and operating equestrian businesses, from small farms to large facilities.",
      services: [
        "Business entity formation",
        "Operating agreements",
        "Employment contracts",
        "Vendor agreements",
        "Regulatory compliance",
        "Succession planning"
      ],
      pricing: "Starting at $1,200"
    },
    {
      icon: Gavel,
      title: "Litigation & Disputes",
      subtitle: "Legal Representation & Advocacy",
      description: "Experienced litigation support for equestrian disputes, including breach of contract and injury claims.",
      services: [
        "Contract disputes",
        "Personal injury defense",
        "Insurance litigation",
        "Property disputes",
        "Employment issues",
        "Regulatory violations"
      ],
      pricing: "Hourly rates apply"
    },
    {
      icon: Heart,
      title: "Estate & Succession Planning",
      subtitle: "Equestrian Asset Protection",
      description: "Specialized estate planning for equestrian assets, ensuring seamless transition of your horse-related holdings.",
      services: [
        "Equestrian trusts",
        "Will and testament drafting",
        "Asset valuation",
        "Tax planning strategies",
        "Succession planning",
        "Charitable giving options"
      ],
      pricing: "Starting at $2,000"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "Free 30-minute consultation to understand your needs and explain our approach."
    },
    {
      step: "02",
      title: "Strategy Development",
      description: "We develop a customized legal strategy tailored to your specific situation."
    },
    {
      step: "03",
      title: "Document Preparation",
      description: "Our team prepares all necessary legal documents with attention to detail."
    },
    {
      step: "04",
      title: "Review & Finalization",
      description: "Comprehensive review with you to ensure everything meets your requirements."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-equine-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Comprehensive Legal Services for the Equestrian Industry
          </h1>
          <p className="text-xl text-equine-sage-light leading-relaxed">
            From routine transactions to complex litigation, we provide specialized legal expertise for every aspect of your equestrian operations.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {serviceCategories.map((category, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="bg-equine-gold p-3 rounded-lg">
                      <category.icon className="h-8 w-8 text-equine-navy" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-heading text-equine-navy">
                        {category.title}
                      </CardTitle>
                      <p className="text-equine-sage font-medium">{category.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-equine-sage mb-6 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {category.services.map((service, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-equine-gold mr-3 flex-shrink-0" />
                        <span className="text-equine-sage">{service}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-semibold text-equine-navy">{category.pricing}</span>
                    <Button className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-equine-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
              Our Process
            </h2>
            <p className="text-xl text-equine-sage max-w-3xl mx-auto">
              We follow a proven process to ensure your legal needs are met efficiently and effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center animate-fade-in" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="bg-equine-gold text-equine-navy w-16 h-16 rounded-full flex items-center justify-center font-heading font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-heading font-semibold text-equine-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-equine-sage text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-cream mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-equine-sage-light mb-8">
            Contact us today for a free consultation and learn how we can help protect your equestrian interests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold px-8 py-4 text-lg">
              Schedule Consultation
            </Button>
            <Button size="lg" variant="outline" className="border-equine-cream text-equine-cream hover:bg-equine-cream hover:text-equine-navy px-8 py-4 text-lg">
              Request Quote
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
