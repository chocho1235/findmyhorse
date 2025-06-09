
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MapPin, Clock, Calendar, Send } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: '',
    urgency: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      details: "(555) 123-4567",
      subtitle: "Mon-Fri 8:00 AM - 6:00 PM EST",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email", 
      details: "info@equinelegal.com",
      subtitle: "Response within 24 hours",
      action: "Send Email"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Horse Park Drive, Lexington, KY 40511",
      subtitle: "By appointment only",
      action: "Get Directions"
    },
    {
      icon: Calendar,
      title: "Schedule",
      details: "Free 30-minute consultation",
      subtitle: "Available same week",
      action: "Book Online"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Emergency only" },
    { day: "Holidays", hours: "Emergency only" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-equine-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Contact Our Legal Team
          </h1>
          <p className="text-xl text-equine-sage-light leading-relaxed">
            Ready to discuss your equestrian legal needs? We're here to help with expert guidance and personalized solutions for your situation.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-center animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <CardContent className="p-6">
                  <div className="bg-equine-gold p-3 rounded-lg w-fit mx-auto mb-4">
                    <method.icon className="h-6 w-6 text-equine-navy" />
                  </div>
                  <h3 className="font-heading font-semibold text-equine-navy mb-2">
                    {method.title}
                  </h3>
                  <p className="text-equine-navy font-medium mb-1">
                    {method.details}
                  </p>
                  <p className="text-equine-sage text-sm mb-4">
                    {method.subtitle}
                  </p>
                  <Button variant="outline" size="sm" className="border-equine-gold text-equine-gold hover:bg-equine-gold hover:text-equine-navy">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-equine-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-equine-navy">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-equine-sage">
                    Fill out the form below and we'll get back to you within 24 hours.
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
                          placeholder="(555) 123-4567"
                          className="border-equine-sage/30"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-equine-navy mb-2">
                          Service Type
                        </label>
                        <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                          <SelectTrigger className="border-equine-sage/30">
                            <SelectValue placeholder="Select service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase-sale">Purchase/Sale Agreement</SelectItem>
                            <SelectItem value="liability">Liability & Insurance</SelectItem>
                            <SelectItem value="breeding">Breeding Contracts</SelectItem>
                            <SelectItem value="business">Business Law</SelectItem>
                            <SelectItem value="litigation">Litigation</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Urgency Level
                      </label>
                      <Select onValueChange={(value) => handleInputChange('urgency', value)}>
                        <SelectTrigger className="border-equine-sage/30">
                          <SelectValue placeholder="How urgent is your matter?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="routine">Routine - No rush</SelectItem>
                          <SelectItem value="week">Within a week</SelectItem>
                          <SelectItem value="days">Within 2-3 days</SelectItem>
                          <SelectItem value="urgent">Urgent - Same day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-equine-navy mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your legal matter and any specific questions you have..."
                        rows={5}
                        className="border-equine-sage/30"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold py-3">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Office Information */}
            <div className="space-y-8">
              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-equine-navy flex items-center">
                    <Clock className="mr-3 h-6 w-6 text-equine-gold" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                        <span className="text-equine-navy font-medium">{schedule.day}</span>
                        <span className="text-equine-sage">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-equine-cream rounded-lg">
                    <p className="text-sm text-equine-sage">
                      <strong>Emergency Services:</strong> Available 24/7 for urgent equestrian legal matters. Additional fees may apply for after-hours consultations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-heading text-equine-navy">
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-equine-gold w-6 h-6 rounded-full flex items-center justify-center text-equine-navy font-bold text-sm">1</div>
                      <div>
                        <h4 className="font-semibold text-equine-navy">Initial Response</h4>
                        <p className="text-sm text-equine-sage">We'll acknowledge your inquiry within 4 business hours.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-equine-gold w-6 h-6 rounded-full flex items-center justify-center text-equine-navy font-bold text-sm">2</div>
                      <div>
                        <h4 className="font-semibold text-equine-navy">Consultation Scheduling</h4>
                        <p className="text-sm text-equine-sage">We'll schedule your free 30-minute consultation at your convenience.</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-equine-gold w-6 h-6 rounded-full flex items-center justify-center text-equine-navy font-bold text-sm">3</div>
                      <div>
                        <h4 className="font-semibold text-equine-navy">Detailed Discussion</h4>
                        <p className="text-sm text-equine-sage">We'll discuss your needs and outline potential solutions and next steps.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-equine-navy text-equine-cream">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-equine-gold mb-3">
                    Emergency Legal Assistance
                  </h3>
                  <p className="text-equine-sage-light mb-4">
                    Facing an urgent equestrian legal matter? Our emergency hotline is available 24/7 for time-sensitive issues.
                  </p>
                  <Button className="bg-equine-gold text-equine-navy hover:bg-equine-gold-light font-semibold">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Emergency Line
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
