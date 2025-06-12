import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Download, CheckCircle, AlertTriangle, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Contracts = () => {
  const contractElements = [
    {
      title: "Horse Identification",
      description: "Legal requirements for horse identification",
      icon: FileText,
      importance: "essential",
      details: [
        "Horse passport details",
        "Microchip number (mandatory in UK)",
        "Age, colour, markings",
        "Breed and registration details"
      ]
    },
    {
      title: "Seller Status Declaration",
      description: "Business or private seller status",
      icon: Shield,
      importance: "essential",
      details: [
        "Seller's trading status",
        "Consumer Rights Act applicability",
        "VAT registration if applicable",
        "Business premises details"
      ]
    },
    {
      title: "Sale Terms",
      description: "Financial and transfer details",
      icon: CheckCircle,
      importance: "essential",
      details: [
        "Purchase price and VAT status",
        "Payment method and timing",
        "Ownership transfer process",
        "Registration transfer details"
      ]
    },
    {
      title: "Warranties & Conditions",
      description: "Legal guarantees and conditions",
      icon: AlertTriangle,
      importance: "essential",
      details: [
        "Fitness for purpose declaration",
        "Health and temperament warranties",
        "Pre-existing conditions disclosure",
        "Trial period terms if applicable"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-equine-accent hover:text-equine-forest mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-equine-navy mb-6">
              What Should Be in a UK Horse Sale Contract?
            </h1>
            <p className="text-xl text-equine-forest mb-8">
              A comprehensive horse sale contract under UK law should address both legal requirements and practical considerations. Here are the essential elements every contract should include.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contractElements.map((element, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-equine-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        element.importance === "essential" ? 'bg-equine-accent' : 'bg-equine-forest-light'
                      }`}>
                        <element.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading font-semibold text-equine-navy text-lg">
                            {element.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            element.importance === "essential" 
                              ? 'bg-equine-accent/10 text-equine-accent' 
                              : 'bg-equine-forest-light/10 text-equine-forest'
                          }`}>
                            {element.importance}
                          </span>
                        </div>
                        <p className="text-equine-forest mb-4">
                          {element.description}
                        </p>
                        <ul className="text-sm text-equine-forest space-y-1">
                          {element.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-equine-accent" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">Additional Legal Requirements</h2>
            
            <h3 className="text-xl font-heading font-semibold text-equine-navy mb-4">1. Consumer Protection</h3>
            <p className="text-equine-forest mb-6">
              For business sellers, include:
            </p>
            <ul className="list-disc pl-6 mb-8 text-equine-forest">
              <li>Consumer Rights Act 2015 compliance statement</li>
              <li>Distance selling regulations if applicable</li>
              <li>Cooling-off period details</li>
              <li>Complaints procedure</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-equine-navy mb-4">2. Liability and Insurance</h3>
            <p className="text-equine-forest mb-6">
              Clear statements about:
            </p>
            <ul className="list-disc pl-6 mb-8 text-equine-forest">
              <li>Risk transfer timing</li>
              <li>Insurance requirements during viewing/trial</li>
              <li>Public liability coverage</li>
              <li>Transport arrangements and liability</li>
            </ul>

            <h3 className="text-xl font-heading font-semibold text-equine-navy mb-4">3. Dispute Resolution</h3>
            <p className="text-equine-forest mb-6">
              Include provisions for:
            </p>
            <ul className="list-disc pl-6 mb-8 text-equine-forest">
              <li>Governing law (England & Wales/Scotland/NI)</li>
              <li>Mediation requirements</li>
              <li>Jurisdiction for legal proceedings</li>
              <li>Alternative dispute resolution options</li>
            </ul>
          </div>

          <div className="mt-12 bg-equine-warm rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">
              Download Our UK-Compliant Contract Template
            </h2>
            <p className="text-lg text-equine-forest mb-6">
              Get started with our comprehensive horse sale contract template, reviewed by UK equine law specialists and compliant with current legislation.
            </p>
            <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest">
              Download Free Template
              <Download className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contracts; 