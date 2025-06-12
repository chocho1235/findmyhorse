import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, HelpCircle, Store, User, Clock, Scale, FileText, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MermaidDiagram from '@/components/MermaidDiagram';

const Returns = () => {
  const businessBuyerRights = [
    {
      title: "30-Day Right to Reject",
      description: "Within first 30 days of purchase",
      icon: Clock,
      rights: [
        "Full refund if horse not as described",
        "No requirement to accept repair/replacement",
        "Seller must pay return transport costs",
        "Must return horse in same condition"
      ]
    },
    {
      title: "Repair or Replacement",
      description: "After 30 days but within 6 months",
      icon: CheckCircle,
      rights: [
        "Right to request repair/replacement",
        "Seller gets one attempt to fix issues",
        "Must be done within reasonable time",
        "Must not cause significant inconvenience"
      ]
    },
    {
      title: "Price Reduction",
      description: "If repair/replacement not possible",
      icon: Scale,
      rights: [
        "Right to keep horse and get partial refund",
        "Amount based on severity of issues",
        "Must be reasonable and proportionate",
        "Can be negotiated or determined by court"
      ]
    }
  ];

  const privateBuyerRights = [
    {
      title: "Contract Terms",
      description: "Rights specified in sale contract",
      icon: FileText,
      rights: [
        "Trial period if specified",
        "Return conditions if included",
        "Health warranties if given",
        "Payment return terms"
      ]
    },
    {
      title: "Misrepresentation Claims",
      description: "Under Misrepresentation Act 1967",
      icon: AlertTriangle,
      rights: [
        "Fraudulent: deliberate false statements",
        "Negligent: careless false statements",
        "Innocent: honest but incorrect statements",
        "Different remedies for each type"
      ]
    },
    {
      title: "Limited General Rights",
      description: "Basic contract law protections",
      icon: Shield,
      rights: [
        "'Caveat emptor' principle applies",
        "Must prove breach of contract",
        "Limited implied terms",
        "Harder to prove claims"
      ]
    }
  ];

  const flowChart = `
    graph TD
      A["Horse Purchase Issue"] --> B{"Business or Private Seller?"}
      B -->|"Business Seller"| C{"Within 30 Days?"}
      B -->|"Private Seller"| D{"Contract Terms?"}
      
      C -->|"Yes"| E["Consumer Rights Act"]
      C -->|"No"| F{"Other Issues?"}
      
      E --> G["Right to Reject"]
      E --> H["Right to Repair/Replace"]
      E --> I["Right to Price Reduction"]
      
      F -->|"Yes"| J["Limited Rights"]
      
      D -->|"Trial Period"| K["Return Under Contract"]
      D -->|"No Trial Period"| L{"Misrepresentation?"}
      
      L -->|"Yes"| M["Misrepresentation Claims"]
      L -->|"No"| N["Limited Options"]
      
      M --> O["Fraudulent"]
      M --> P["Negligent"]
      M --> Q["Innocent"]

      classDef default fill:#f9f9f9,stroke:#333,stroke-width:2px;
      classDef decision fill:#e2f0ff,stroke:#3182ce,stroke-width:2px;
      classDef action fill:#e6ffec,stroke:#38a169,stroke-width:2px;
      classDef warning fill:#fff5f5,stroke:#e53e3e,stroke-width:2px;
      
      class A,G,H,I,K,O,P,Q action;
      class B,C,D,F,L decision;
      class J,N warning;
      class E,M default;
  `.trim();

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
              Can I Return a Horse After Purchase in the UK?
            </h1>
            <p className="text-xl text-equine-forest mb-8">
              Your rights to return a horse depend on several factors. Use this guide to understand your options under UK law.
            </p>
          </div>

          {/* Flow Diagram Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">
              Understanding Your Return Rights
            </h2>
            <MermaidDiagram chart={flowChart} />
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="business" className="mb-12">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="business" className="text-lg">
                <Store className="mr-2 h-5 w-5" />
                Business Seller
              </TabsTrigger>
              <TabsTrigger value="private" className="text-lg">
                <User className="mr-2 h-5 w-5" />
                Private Seller
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="business" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-equine-navy">
                    Buying from a Business Seller
                  </CardTitle>
                  <p className="text-equine-forest">
                    When buying from a business seller, you're protected by the Consumer Rights Act 2015. This gives you stronger rights and clearer options for returns.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {businessBuyerRights.map((right, index) => (
                      <Card key={index} className="border-2 border-transparent hover:border-equine-accent transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-equine-accent p-2 rounded-lg">
                              <right.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="font-heading font-semibold text-equine-navy text-lg">
                              {right.title}
                            </h3>
                          </div>
                          <p className="text-equine-forest text-sm mb-4">
                            {right.description}
                          </p>
                          <ul className="space-y-2">
                            {right.rights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-equine-forest">
                                <CheckCircle className="h-4 w-4 text-equine-accent mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="private" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-heading text-equine-navy">
                    Buying from a Private Seller
                  </CardTitle>
                  <p className="text-equine-forest">
                    Private sales have fewer automatic protections. Your rights mainly come from your contract and the Misrepresentation Act 1967.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {privateBuyerRights.map((right, index) => (
                      <Card key={index} className="border-2 border-transparent hover:border-equine-accent transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-equine-forest p-2 rounded-lg">
                              <right.icon className="h-5 w-5 text-white" />
                            </div>
                            <h3 className="font-heading font-semibold text-equine-navy text-lg">
                              {right.title}
                            </h3>
                          </div>
                          <p className="text-equine-forest text-sm mb-4">
                            {right.description}
                          </p>
                          <ul className="space-y-2">
                            {right.rights.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-equine-forest">
                                <CheckCircle className="h-4 w-4 text-equine-forest mt-1" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Steps */}
          <div className="space-y-6 mb-12">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">
              Steps to Take When Considering a Return
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-equine-warm">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-equine-navy text-xl mb-4">
                    Immediate Actions
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Document all issues with photos and videos</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Get a veterinary examination if health-related</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Review your sale contract carefully</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Check the seller's status (business/private)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-equine-warm">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-equine-navy text-xl mb-4">
                    Next Steps
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Write to the seller formally stating your concerns</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Keep copies of all communications</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Consider mediation through BHS if available</span>
                    </li>
                    <li className="flex items-start gap-2 text-equine-forest">
                      <CheckCircle className="h-5 w-5 text-equine-accent mt-1" />
                      <span>Seek legal advice if needed</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 bg-equine-warm rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">
              Need Professional Legal Support?
            </h2>
            <p className="text-lg text-equine-forest mb-6">
              For complex cases, consider consulting with a solicitor specialising in equine law who can advise on your rights under UK legislation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest">
                Find an Equine Solicitor
                <Scale className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                Download Return Rights Guide
                <FileText className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns; 