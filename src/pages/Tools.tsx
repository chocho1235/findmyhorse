import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Wrench, CheckCircle, FileText, Calculator, Shield, AlertTriangle, ShieldQuestion, User, Stethoscope } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import MetaTags from '@/components/seo/MetaTags';

const ToolCard = ({ tool }) => {
  const { user } = useAuth();
  
  const cardContent = (
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
        </div>
        <CardTitle className="text-xl font-heading text-equine-navy group-hover:text-equine-accent transition-colors mb-2">
          {tool.title}
        </CardTitle>
        <div className="flex items-center text-equine-accent text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {tool.time}
        </div>
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
  );

  if (tool.requiresAuth && !user) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="block cursor-pointer">{cardContent}</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl">Account Required</DialogTitle>
            <DialogDescription>
              Please log in or create an account to use the {tool.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>This tool is only available to registered users. Creating an account is free and gives you access to all of our tools and resources.</p>
          </div>
          <div className="flex justify-end space-x-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Link to={tool.link} className="block">
      {cardContent}
    </Link>
  );
};

const Tools = () => {
  const interactiveTools = [
    {
      title: "Dispute Resolution Wizard",
      description: "Get personalised steps for resolving your horse purchase dispute",
      difficulty: "Intermediate",
      time: "8-12 minutes",
      icon: ShieldQuestion,
      featured: true,
      status: "Available",
      link: "/wizards/dispute-resolution",
      requiresAuth: true,
    },
    {
      title: "Veterinary Report Analyser",
      description: "Interpret pre-purchase examination findings and understand their implications",
      difficulty: "Intermediate",
      time: "5-10 minutes",
      icon: Stethoscope,
      featured: true,
      status: "Available",
      link: "/tools/veterinary-report-analyser",
      requiresAuth: false,
    },
    {
      id: 'buyer-protection',
      title: 'Buyer Protection Checklist',
      description: 'Interactive checklist to ensure you\'re protected in your purchase',
      icon: Shield,
      time: '5 minutes',
      difficulty: "Easy",
      status: 'Available',
      link: '/tools/buyer-protection-checklist',
      requiresAuth: true,
    },
    {
      title: "Red Flag Detector",
      description: "Identify potential warning signs in horse sale advertisements",
      difficulty: "Easy",
      time: "2 minutes",
      icon: AlertTriangle,
      featured: true,
      status: "Available",
      link: "/tools/red-flag-detector"
    },
    {
      id: 'scammer-database',
      title: 'Scammer Database',
      description: 'Search a list of known scammer names and stables',
      icon: User,
      time: '1 minute',
      difficulty: "Easy",
      status: 'Available',
      link: '/tools/scammer-database',
      requiresAuth: true,
    },
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
    <>
      <MetaTags
        title="Free Equine Legal Tools - FindMyHorse"
        description="Interactive tools and resources to help you navigate UK equine law, including contract checkers, liability calculators, and more."
      />
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
                <ToolCard tool={tool} key={index} />
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
                <ToolCard tool={tool} key={index} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="hero-gradient py-16 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
              Have a Specific Question?
            </h2>
            <p className="text-xl text-equine-sage mb-8">
              Browse our learning guides for detailed explanations, or check out our news section to see how these tools work in practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learn" className="block">
                <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg w-full">
                Browse Learning Guides
              </Button>
              </Link>
              <Link to="/news" className="block">
                <Button size="lg" className="bg-white text-equine-navy hover:bg-gray-200 font-semibold px-8 py-4 text-lg w-full">
                  View News
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

export default Tools;
