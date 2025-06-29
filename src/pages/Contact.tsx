import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, MessageSquare, Clock, Calendar, Users, AlertTriangle, FileText, HelpCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MetaTags from '@/components/seo/MetaTags';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    queryType: '',
    message: '',
    urgency: '',
    horseDetails: '',
    preferredContact: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactCategories = [
    {
      icon: BookOpen,
      title: "Learning Resources",
      details: "Access Free Guides",
      subtitle: "Self-service legal information",
      action: "Browse Guides",
      link: "/learn"
    },
    {
      icon: MessageSquare,
      title: "Community Support", 
      details: "Join Discussion",
      subtitle: "Connect with fellow horse owners",
      action: "Join Forum",
      link: "/community"
    },
    {
      icon: AlertTriangle,
      title: "Urgent Help",
      details: "Emergency Support",
      subtitle: "For time-sensitive issues",
      action: "Get Help Now",
      link: "/urgent-help"
    },
    {
      icon: Calendar,
      title: "Expert Consultation",
      details: "Book a Session",
      subtitle: "One-on-one guidance",
      action: "Schedule Call",
      link: "/consultation"
    }
  ];

  const commonQueries = [
    {
      icon: FileText,
      title: "Contract Review",
      description: "Need help understanding or drafting a horse sale agreement?"
    },
    {
      icon: AlertTriangle,
      title: "Dispute Resolution",
      description: "Having issues with a purchase, sale, or livery arrangement?"
    },
    {
      icon: Users,
      title: "Yard Management",
      description: "Questions about liability, contracts, or regulations?"
    },
    {
      icon: HelpCircle,
      title: "General Guidance",
      description: "Not sure where to start? We'll point you in the right direction."
    }
  ];

  return (
    <>
      <MetaTags
        title="Contact Us - FindMyHorse Legal Guide"
        description="Get expert guidance on equestrian legal matters. Whether you need contract help, dispute resolution, or general advice, we're here to assist."
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="hero-gradient text-equine-cream py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl text-equine-sage-light leading-relaxed max-w-3xl mx-auto">
              From reviewing sale contracts to resolving disputes, our team is here to provide clear, practical guidance for your equestrian legal needs.
            </p>
          </div>
        </section>

        {/* Common Queries */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-equine-navy mb-12 text-center">
              Common Legal Queries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commonQueries.map((query, index) => (
                <Card key={index} className="shadow-md hover:shadow-xl transition-all duration-300 border-0">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent/10 p-3 rounded-lg w-fit mb-4">
                      <query.icon className="h-6 w-6 text-equine-accent" />
                    </div>
                    <h3 className="font-heading font-semibold text-equine-navy mb-2">
                      {query.title}
                    </h3>
                    <p className="text-equine-forest text-sm">
                      {query.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Options */}
        <section className="py-16 bg-equine-warm/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-equine-navy mb-12 text-center">
              Choose Your Support Path
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactCategories.map((category, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-center group">
                  <CardContent className="p-6">
                    <div className="bg-equine-accent p-3 rounded-lg w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-heading font-semibold text-equine-navy mb-2">
                      {category.title}
                    </h3>
                    <p className="text-equine-navy font-medium mb-1">
                      {category.details}
                    </p>
                    <p className="text-equine-forest text-sm mb-4">
                      {category.subtitle}
                    </p>
                    <Button variant="outline" size="sm" className="bg-white text-equine-accent border-equine-accent hover:bg-equine-accent hover:text-white">
                      {category.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-2xl font-heading text-equine-navy text-center">
                  Need Personalized Guidance?
                </CardTitle>
                <p className="text-equine-forest text-center">
                  Fill out the form below and we'll match you with the right resources or expert guidance.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Full Name *
                      </label>
                      <Input
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Your name"
                        className="border-equine-sage/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your@email.com"
                        className="border-equine-sage/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Optional"
                        className="border-equine-sage/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Query Type *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('queryType', value)} required>
                        <SelectTrigger className="border-equine-sage/30">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="purchase">Horse Purchase/Sale</SelectItem>
                          <SelectItem value="dispute">Dispute Resolution</SelectItem>
                          <SelectItem value="contract">Contract Review</SelectItem>
                          <SelectItem value="yard">Yard Management</SelectItem>
                          <SelectItem value="welfare">Horse Welfare</SelectItem>
                          <SelectItem value="insurance">Insurance & Liability</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-equine-navy mb-2">
                      Horse Details (if applicable)
                    </label>
                    <Input
                      value={formData.horseDetails}
                      onChange={(e) => handleInputChange('horseDetails', e.target.value)}
                      placeholder="Age, breed, value range, etc."
                      className="border-equine-sage/30"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-equine-navy mb-2">
                      Describe Your Situation *
                    </label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Please provide details about your legal query or situation"
                      className="border-equine-sage/30 min-h-[120px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Urgency Level *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('urgency', value)} required>
                        <SelectTrigger className="border-equine-sage/30">
                          <SelectValue placeholder="Select urgency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent - Need help ASAP</SelectItem>
                          <SelectItem value="soon">Soon - Within a week</SelectItem>
                          <SelectItem value="normal">Normal - Within 2 weeks</SelectItem>
                          <SelectItem value="planning">Planning Ahead</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Preferred Contact Method *
                      </label>
                      <Select onValueChange={(value) => handleInputChange('preferredContact', value)} required>
                        <SelectTrigger className="border-equine-sage/30">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="video">Video Call</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="text-center">
                    <Button type="submit" className="bg-equine-accent hover:bg-equine-accent/90 text-white px-8 py-2">
                      Submit Query
                    </Button>
                    <p className="text-sm text-equine-forest mt-4">
                      We aim to respond to all queries within 24 hours during business days.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
