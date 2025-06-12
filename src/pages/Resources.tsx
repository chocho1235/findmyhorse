import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Search, FileText, BookOpen, AlertCircle, Calendar, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const legalTemplates = [
    {
      title: "Horse Purchase Agreement",
      description: "Comprehensive template for buying horses with all necessary protective clauses.",
      category: "Purchase/Sale",
      format: "PDF",
      pages: 8,
      lastUpdated: "2024-01-15"
    },
    {
      title: "Boarding Agreement Template",
      description: "Standard boarding contract template with liability provisions and care standards.",
      category: "Boarding",
      format: "DOCX",
      pages: 6,
      lastUpdated: "2024-01-10"
    },
    {
      title: "Horse Lease Agreement",
      description: "Flexible lease agreement template for short-term and long-term arrangements.",
      category: "Leasing",
      format: "PDF",
      pages: 7,
      lastUpdated: "2024-01-08"
    },
    {
      title: "Liability Waiver Form",
      description: "State-compliant liability waiver for riding lessons and equestrian activities.",
      category: "Liability",
      format: "PDF",
      pages: 3,
      lastUpdated: "2024-01-05"
    },
    {
      title: "Training Agreement",
      description: "Professional training contract template with performance expectations and fees.",
      category: "Training",
      format: "DOCX",
      pages: 5,
      lastUpdated: "2023-12-20"
    },
    {
      title: "Breeding Contract Template",
      description: "Stallion service agreement with breeding terms and conditions.",
      category: "Breeding",
      format: "PDF",
      pages: 9,
      lastUpdated: "2023-12-15"
    }
  ];

  const guidelines = [
    {
      title: "Pre-Purchase Examination Best Practices",
      summary: "Essential guidelines for conducting thorough pre-purchase veterinary examinations.",
      readTime: "8 min read",
      category: "Purchase Guidelines",
      featured: true
    },
    {
      title: "Insurance Claims Process for Equine Mortality",
      summary: "Step-by-step guide for filing and managing equine mortality insurance claims.",
      readTime: "12 min read",
      category: "Insurance",
      featured: false
    },
    {
      title: "Liability Protection for Riding Instructors",
      summary: "Comprehensive overview of liability risks and protection strategies for instructors.",
      readTime: "10 min read",
      category: "Liability",
      featured: true
    },
    {
      title: "Contract Negotiation Tips for Horse Sales",
      summary: "Expert advice on negotiating favorable terms in horse purchase agreements.",
      readTime: "6 min read",
      category: "Negotiations",
      featured: false
    }
  ];

  const faqs = [
    {
      question: "What should be included in a horse purchase agreement?",
      answer: "A comprehensive horse purchase agreement should include identification details, purchase price, payment terms, health warranties, pre-purchase exam requirements, delivery arrangements, and risk allocation provisions.",
      category: "Purchase/Sale"
    },
    {
      question: "How can I protect myself from liability as a riding instructor?",
      answer: "Use properly drafted liability waivers, maintain adequate insurance coverage, follow safety protocols, ensure facilities meet safety standards, and consider business entity formation for additional protection.",
      category: "Liability"
    },
    {
      question: "What are the key elements of a horse boarding agreement?",
      answer: "Key elements include care standards, feeding schedules, veterinary care procedures, liability allocation, payment terms, termination clauses, and facility rules and regulations.",
      category: "Boarding"
    },
    {
      question: "When do I need an attorney for a horse transaction?",
      answer: "Consider legal counsel for high-value purchases, complex agreements, dispute resolution, liability concerns, or when dealing with unfamiliar contract terms or unusual circumstances.",
      category: "General"
    }
  ];

  const recentUpdates = [
    {
      date: "2024-01-15",
      title: "New Kentucky Equine Activity Liability Act Changes",
      type: "Legal Update",
      summary: "Important changes to liability protections for equestrian professionals in Kentucky."
    },
    {
      date: "2024-01-10",
      title: "Updated FEI Medication Rules",
      type: "Regulatory",
      summary: "New medication regulations affecting competition horses and therapeutic use exemptions."
    },
    {
      date: "2024-01-05",
      title: "Tax Implications of Horse Breeding Operations",
      type: "Tax Update",
      summary: "Recent IRS guidance on classification of horse breeding as business vs. hobby activity."
    }
  ];

  const filteredTemplates = legalTemplates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGuidelines = guidelines.filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUpdates = recentUpdates.filter(update =>
    update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    update.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const NoResults = () => (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold text-equine-navy">No results found</h3>
      <p className="text-equine-sage mt-2">Try adjusting your search term.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-equine-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Legal Resources & Templates
          </h1>
          <p className="text-xl text-equine-sage-light mb-8 leading-relaxed">
            Access our comprehensive library of legal templates, industry guidelines, and educational resources designed specifically for the equestrian community.
          </p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-equine-sage h-5 w-5" />
            <Input 
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 bg-white/90 border-0 text-equine-navy"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-2 bg-equine-navy/5 rounded-lg">
              <TabsTrigger value="templates" className="flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all data-[state=active]:bg-equine-accent data-[state=active]:text-white data-[state=active]:shadow-lg">
                <FileText className="h-5 w-5" />
                <span className="font-semibold">Templates</span>
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all data-[state=active]:bg-equine-accent data-[state=active]:text-white data-[state=active]:shadow-lg">
                <BookOpen className="h-5 w-5" />
                <span className="font-semibold">Guidelines</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all data-[state=active]:bg-equine-accent data-[state=active]:text-white data-[state=active]:shadow-lg">
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">FAQ</span>
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center justify-center gap-2 py-3 px-4 rounded-md transition-all data-[state=active]:bg-equine-accent data-[state=active]:text-white data-[state=active]:shadow-lg">
                <Calendar className="h-5 w-5" />
                <span className="font-semibold">Updates</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Legal Document Templates</h2>
                <p className="text-equine-sage">Professional legal templates customized for equestrian transactions and operations.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.length > 0 ? (
                  filteredTemplates.map((template, index) => (
                    <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-equine-gold text-equine-navy px-3 py-1 rounded-full text-xs font-semibold">
                            {template.category}
                          </span>
                          <FileText className="h-5 w-5 text-equine-sage" />
                        </div>
                        <CardTitle className="text-lg font-heading text-equine-navy">
                          {template.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-equine-sage mb-4 text-sm">
                          {template.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-equine-sage mb-4">
                          <span>{template.format} • {template.pages} pages</span>
                          <span>Updated {template.lastUpdated}</span>
                        </div>
                        <Button className="w-full bg-equine-gold text-equine-navy hover:bg-equine-gold-light">
                          <Download className="mr-2 h-4 w-4" />
                          Download Template
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
            </TabsContent>

            <TabsContent value="guidelines">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Industry Guidelines</h2>
                <p className="text-equine-sage">Expert guidance on best practices and industry standards for equestrian professionals.</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredGuidelines.length > 0 ? (
                  filteredGuidelines.map((guide, index) => (
                    <Card key={index} className={`shadow-lg hover:shadow-xl transition-all duration-300 border-0 ${guide.featured ? 'ring-2 ring-equine-gold' : ''}`}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <span className="bg-equine-navy text-equine-cream px-3 py-1 rounded-full text-xs font-semibold">
                            {guide.category}
                          </span>
                          {guide.featured && (
                            <span className="bg-equine-gold text-equine-navy px-2 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        <CardTitle className="text-xl font-heading text-equine-navy">
                          {guide.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-equine-sage mb-4">
                          {guide.summary}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-equine-sage flex items-center">
                            <BookOpen className="mr-1 h-4 w-4" />
                            {guide.readTime}
                          </span>
                          <Button variant="outline" className="border-equine-gold text-equine-gold hover:bg-equine-gold hover:text-equine-navy">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Frequently Asked Questions</h2>
                <p className="text-equine-sage">Common legal questions and expert answers for equestrian professionals.</p>
              </div>

              <div className="space-y-6">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <Card key={index} className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-equine-gold p-2 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-equine-navy" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-heading font-semibold text-equine-navy text-lg">
                                {faq.question}
                              </h3>
                              <span className="bg-equine-cream text-equine-navy px-3 py-1 rounded-full text-xs font-semibold">
                                {faq.category}
                              </span>
                            </div>
                            <p className="text-equine-sage leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
            </TabsContent>

            <TabsContent value="updates">
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">Legal Updates & News</h2>
                <p className="text-equine-sage">Stay informed about the latest legal developments affecting the equestrian industry.</p>
              </div>

              <div className="space-y-6">
                {filteredUpdates.length > 0 ? (
                  filteredUpdates.map((update, index) => (
                    <Card key={index} className="shadow-lg border-0">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-equine-navy p-2 rounded-lg">
                            <Calendar className="h-5 w-5 text-equine-cream" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-heading font-semibold text-equine-navy text-lg">
                                {update.title}
                              </h3>
                              <span className="bg-equine-gold text-equine-navy px-3 py-1 rounded-full text-xs font-semibold">
                                {update.type}
                              </span>
                            </div>
                            <p className="text-equine-sage mb-3">
                              {update.summary}
                            </p>
                            <span className="text-sm text-equine-sage">
                              Published: {update.date}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <NoResults />
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-equine-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-8 md:p-12 shadow-xl border-0 bg-white">
                <div className="text-center">
                    <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-6">
                        Take the Next Step
                    </h2>
                    <p className="text-xl text-equine-forest mb-8 max-w-2xl mx-auto">
                        While our resources offer a strong foundation, equine law can be complex. For situations requiring tailored advice, consider connecting with a specialist.
                    </p>
                    <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest font-semibold px-8 py-4 text-lg">
                        Explore Professional Services
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
