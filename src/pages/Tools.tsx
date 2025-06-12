import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Wrench, CheckCircle, FileText, Calculator, Shield, AlertTriangle, ShieldQuestion } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const Tools = () => {
  const interactiveTools = [
    {
      title: "Dispute Resolution Wizard",
      description: "Get personalized steps for resolving your horse purchase dispute",
      difficulty: "Intermediate",
      time: "8-12 minutes",
      icon: ShieldQuestion,
      featured: true,
      status: "Available",
      link: "/wizards/dispute-resolution"
    },
    {
      title: "Buyer Protection Checklist",
      description: "Interactive checklist to ensure you're protected in your purchase",
      difficulty: "Easy",
      time: "5 minutes",
      icon: Shield,
      featured: true,
      status: "Coming Soon",
      link: "#"
    },
    {
      title: "Return Rights Calculator",
      description: "Find out your return rights based on your situation and location",
      difficulty: "Easy",
      time: "3 minutes",
      icon: Calculator,
      featured: false,
      status: "Coming Soon",
      link: "#"
    },
    {
      title: "Red Flag Detector",
      description: "Identify potential warning signs in horse sale advertisements",
      difficulty: "Easy",
      time: "2 minutes",
      icon: AlertTriangle,
      featured: false,
      status: "Coming Soon",
      link: "#"
    },
    {
      title: "Contract Builder",
      description: "Step-by-step tool to create a customized horse sale agreement",
      difficulty: "Easy",
      time: "10-15 minutes",
      icon: FileText,
      featured: false,
      status: "Coming Soon",
      link: "#"
    }
  ];

  const quickTools = [
    {
      title: "Pre-Purchase Exam Checklist",
      description: "Essential items to discuss with your veterinarian",
      icon: CheckCircle
    },
    {
      title: "Trial Period Agreement Template",
      description: "Simple template for horse trial arrangements",
      icon: FileText
    },
    {
      title: "Documentation Tracker",
      description: "Keep track of all your horse purchase paperwork",
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Interactive Tools for
            <span className="block text-equine-accent">Safer Horse Transactions</span>
          </h1>
          <p className="text-xl text-equine-sage mb-8 leading-relaxed">
            Use our free tools to build contracts, check your rights, and protect yourself in horse purchases and sales.
          </p>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Most Popular Tools</h2>
            <p className="text-lg text-equine-forest">Start with these essential tools used by thousands of horse buyers and sellers.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {interactiveTools.filter(tool => tool.featured).map((tool, index) => (
              <Link to={tool.link} key={index} className="block">
                <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="bg-equine-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <tool.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex space-x-2">
                          <Badge className="bg-green-100 text-green-800">
                            {tool.difficulty}
                          </Badge>
                          <Badge variant="outline" className="border-equine-accent text-equine-accent">
                            {tool.status}
                          </Badge>
                        </div>
                      </div>
                      <span className="text-equine-forest text-sm">
                        {tool.time}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                      {tool.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-equine-forest mb-6">
                      {tool.description}
                    </p>
                    <Button 
                      className="w-full bg-equine-accent text-white hover:bg-equine-forest"
                      disabled={tool.status === "Coming Soon"}
                    >
                      {tool.status === "Coming Soon" ? "Coming Soon" : "Start Tool"}
                      {tool.status !== "Coming Soon" && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools */}
      <section className="py-16 bg-equine-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Quick Reference Tools</h2>
            <p className="text-lg text-equine-forest">Fast access to essential checklists and templates.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickTools.map((tool, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 group cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-equine-accent p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 w-fit">
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                    {tool.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-equine-forest mb-6">
                    {tool.description}
                  </p>
                  <Button size="sm" variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                    Access Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Tools */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">All Interactive Tools</h2>
            <p className="text-lg text-equine-forest">Complete collection of tools to help you navigate horse transactions safely.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interactiveTools.map((tool, index) => (
              <Link to={tool.link} key={index} className="block">
                <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 group cursor-pointer h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        className={
                          tool.status === "Available" 
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {tool.status}
                      </Badge>
                      <span className="text-equine-forest text-sm">
                        {tool.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="bg-equine-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <tool.icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                        {tool.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-equine-forest text-sm mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-100 text-blue-800">
                        {tool.difficulty}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white"
                        disabled={tool.status === "Coming Soon"}
                      >
                        {tool.status === "Coming Soon" ? "Soon" : "Use Tool"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Have a Specific Question?
          </h2>
          <p className="text-xl text-equine-sage mb-8">
            Browse our learning guides for detailed explanations, or check out real case studies to see how these tools work in practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg">
              Browse Learning Guides
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-equine-navy font-semibold px-8 py-4 text-lg">
              View Case Studies
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tools;
