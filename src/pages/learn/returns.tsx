import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, HelpCircle, Store, User, Clock, Scale, FileText, Shield, Package, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import MermaidDiagram from '@/components/MermaidDiagram';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useEffect } from 'react';

const contentId = "returns-and-refunds";

const Returns = () => {
  const { user } = useAuth();

  useEffect(() => {
    const markAsRead = async () => {
      if (user) {
        await supabase
          .from('user_progress')
          .upsert({ user_id: user.id, content_id: contentId }, { onConflict: 'user_id, content_id' });
      }
    };
    markAsRead();
  }, [user]);

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
      B -->|"Business Seller"| C{"Did you buy unseen (online/phone)?"}
      B -->|"Private Seller"| D{"Contract Terms?"}

      C -->|"Yes (Distance Sale)"| DS[("Distance Selling<br/>Regulations")]
      C -->|"No (On-Premises)"| E{"Within 30 Days?"}
      
      DS --> DS_R1["14-day cooling-off period"]
      DS --> DS_R2["Right to cancel for any reason"]
      DS --> DS_R3["Full refund within 14 days"]

      E -->|"Yes"| F["Consumer Rights Act"]
      E -->|"No"| G{"Other Issues?"}
      
      F --> H["Right to Reject"]
      F --> I["Right to Repair/Replace"]
      F --> J["Right to Price Reduction"]
      
      G -->|"Yes"| K["Limited Rights"]
      
      D -->|"Trial Period"| L["Return Under Contract"]
      D -->|"No Trial Period"| M{"Misrepresentation?"}
      
      M -->|"Yes"| N["Misrepresentation Claims"]
      M -->|"No"| O["Limited Options"]
      
      N --> P["Fraudulent"]
      N --> Q["Negligent"]
      N --> R["Innocent"]

      classDef default fill:transparent,stroke:#333,stroke-width:2px;
      classDef decision fill:transparent,stroke:#3182ce,stroke-width:2px;
      classDef action fill:transparent,stroke:#38a169,stroke-width:2px;
      classDef warning fill:transparent,stroke:#e53e3e,stroke-width:2px;
      classDef distance fill:transparent,stroke:#38B2AC,stroke-width:2px;
      
      class A,H,I,J,L,P,Q,R action;
      class B,C,D,E,G,M decision;
      class K,O warning;
      class F,N default;
      class DS,DS_R1,DS_R2,DS_R3 distance;
  `.trim();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <Link to="/" className="inline-flex items-center text-equine-accent hover:text-equine-forest mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-equine-navy mb-6">
              Can I Return a Horse After Purchase in the UK?
            </h1>
            <p className="text-xl text-equine-forest">
              Your rights to return a horse depend on several factors. Use this guide to understand your options under UK law.
            </p>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6 text-center">
              Understanding Your Return Rights
            </h2>
            <MermaidDiagram chart={flowChart} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <CardContent className="space-y-8">
                  <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                        <div className="flex items-center mb-3">
                            <Package className="h-6 w-6 text-blue-600 mr-3" />
                            <h3 className="text-2xl font-bold font-heading text-blue-800">Distance Selling Regulations</h3>
                        </div>
                        <div className="text-blue-700 space-y-3">
                            <p>
                                If you purchased the horse from a business without meeting it in person first (e.g., entirely online or over the phone), you are protected by The Consumer Contracts Regulations 2013, commonly known as distance selling regulations.
                            </p>
                            <p>
                                These regulations grant you a <strong>14-day "cooling-off" period</strong> from the day the horse is delivered. During this time, you can return the horse for any reason, even if it is not faulty, and receive a full refund. You may be responsible for the cost of return transport unless the seller's terms state otherwise.
                            </p>
                        </div>
                    </div>

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
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-lg p-6">
                    <div className="flex items-center mb-3">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4" />
                      <div>
                        <h3 className="text-2xl font-bold font-heading text-yellow-800">Caveat Emptor: "Buyer Beware"</h3>
                        <p className="text-yellow-700">This is the single most important principle in private horse sales.</p>
                      </div>
                    </div>
                    <div className="text-yellow-700 space-y-3">
                      <p>
                        In a private sale, the law places the responsibility squarely on you, the buyer, to assess the horse's suitability. Unlike when buying from a business, there is <strong>no legal requirement</strong> for the horse to be of "satisfactory quality" or "fit for purpose".
                      </p>
                      <p>
                        You are expected to perform your due diligence—get a pre-purchase vetting, ask detailed questions, and view the horse thoroughly. If you buy a horse that later turns out to be unsuitable for reasons you could have identified, you generally have no legal right to return it.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-heading font-semibold text-equine-navy mb-4">What Are Your Rights?</h4>
                    <p className="text-equine-forest mb-4">
                      Your rights in a private sale are very limited compared to buying from a business. Your main legal protection is against <strong>misrepresentation</strong>. This means the seller cannot make false statements of fact that persuade you to buy the horse.
                    </p>
                    <ul className="space-y-3 list-disc pl-6 text-equine-forest">
                      <li>
                        <strong>Verbal vs. Written:</strong> A claim can be based on anything the seller told you, whether it was in the written advert, a text message, an email, or a verbal conversation. Proving verbal statements can be very difficult, which is why written records are vital.
                      </li>
                      <li>
                        <strong>Fact vs. Opinion:</strong> A key distinction must be made. "He is a lovely, sweet-natured horse" is an opinion. "He has never bucked, reared, or bolted" is a statement of fact that can be proven true or false. Only false statements of fact can form the basis of a misrepresentation claim.
                      </li>
                      <li>
                        <strong>Silence isn't Misrepresentation:</strong> A private seller is not legally obligated to disclose problems voluntarily. It is up to you to ask the right questions. However, if you ask a direct question (e.g., "Does the horse have sweet itch?"), they must answer truthfully. A lie in response to a direct question is a clear misrepresentation.
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    <div className="bg-red-50 p-4 rounded-lg h-full">
                      <div className="flex items-center mb-2">
                        <User className="h-5 w-5 text-red-700 mr-2"/>
                        <h5 className="font-bold text-red-800 font-heading">Private Seller (Limited Rights)</h5>
                      </div>
                      <ul className="text-sm space-y-1 text-red-700 list-disc pl-5">
                        <li><strong>Caveat Emptor</strong> applies.</li>
                        <li>No Consumer Rights Act protection.</li>
                        <li>Horse sold "as is" with all its faults.</li>
                        <li>No obligation to disclose issues.</li>
                        <li>Recourse is based on proving misrepresentation.</li>
                        <li>Legal action is often complex and costly.</li>
                      </ul>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg h-full">
                      <div className="flex items-center mb-2">
                        <Store className="h-5 w-5 text-green-700 mr-2"/>
                        <h5 className="font-bold text-green-800 font-heading">Business Seller (Strong Rights)</h5>
                      </div>
                      <ul className="text-sm space-y-1 text-green-700 list-disc pl-5">
                        <li>Protected by <strong>Consumer Rights Act 2015</strong>.</li>
                        <li>Horse must be "satisfactory quality" & "fit for purpose".</li>
                        <li>30-day "right to reject" for a full refund.</li>
                        <li>Rights to repair, replacement or refund after 30 days.</li>
                        <li>Distance selling "cooling-off" period may apply.</li>
                        <li>Clearer and more powerful legal position.</li>
                      </ul>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

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