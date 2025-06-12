import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText, MessageCircle, Scale, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Disputes = () => {
  const steps = [
    {
      title: "Document Everything",
      description: "Gather all relevant information",
      icon: ClipboardCheck,
      phase: "preparation",
      actions: [
        "Collect all written communications",
        "Take photos and videos of issues",
        "Get veterinary examination reports",
        "Review passport and sale documents"
      ]
    },
    {
      title: "Determine Legal Position",
      description: "Identify applicable UK laws",
      icon: Scale,
      phase: "assessment",
      actions: [
        "Check Consumer Rights Act status",
        "Review Misrepresentation Act rights",
        "Assess Sale of Goods Act application",
        "Consider contract breach elements"
      ]
    },
    {
      title: "Initial Resolution",
      description: "Follow UK dispute procedures",
      icon: MessageCircle,
      phase: "negotiation",
      actions: [
        "Send formal Letter Before Action",
        "Propose mediation through BHS",
        "Consider ADR options",
        "Document all communication"
      ]
    },
    {
      title: "Legal Proceedings",
      description: "Court action if necessary",
      icon: AlertTriangle,
      phase: "litigation",
      actions: [
        "Consult equine solicitor",
        "File court claim if needed",
        "Consider small claims track",
        "Prepare evidence bundle"
      ]
    }
  ];

  const commonDisputes = [
    {
      title: "Consumer Rights Issues",
      description: "Disputes involving business sellers under Consumer Rights Act 2015.",
      resolution: "30-day right to reject, repair or replacement, or price reduction. Must prove goods not as described, fit for purpose, or satisfactory quality."
    },
    {
      title: "Misrepresentation Claims",
      description: "False statements made before sale under Misrepresentation Act 1967.",
      resolution: "Gather evidence of statements made, prove reliance on statements, document resulting losses. Different remedies for fraudulent, negligent, or innocent misrepresentation."
    },
    {
      title: "Private Sale Disputes",
      description: "Issues with private sales under general contract law.",
      resolution: "Focus on contract terms, proof of breach, and specific misrepresentations. Consider mediation through British Horse Society."
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
              How to Handle a Horse Sale Dispute in the UK
            </h1>
            <p className="text-xl text-equine-forest mb-8">
              When issues arise after a horse purchase in the UK, following the correct legal procedures is crucial. Here's your step-by-step guide to handling disputes under UK law.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">UK Resolution Process</h2>
            <div className="grid grid-cols-1 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-equine-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        step.phase === "preparation" ? 'bg-blue-500' :
                        step.phase === "assessment" ? 'bg-purple-500' :
                        step.phase === "negotiation" ? 'bg-equine-accent' :
                        'bg-red-500'
                      }`}>
                        <step.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-heading font-semibold text-equine-navy text-xl">
                            {index + 1}. {step.title}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            step.phase === "preparation" ? 'bg-blue-100 text-blue-700' :
                            step.phase === "assessment" ? 'bg-purple-100 text-purple-700' :
                            step.phase === "negotiation" ? 'bg-equine-accent/10 text-equine-accent' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {step.phase}
                          </span>
                        </div>
                        <p className="text-equine-forest mb-4">
                          {step.description}
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {step.actions.map((action, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-equine-forest">
                              <FileText className="h-4 w-4 text-equine-accent" />
                              {action}
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

          <div className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-6">Common UK Disputes & Legal Remedies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {commonDisputes.map((dispute, index) => (
                <Card key={index} className="border-2 border-transparent hover:border-equine-accent transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-equine-navy text-lg mb-3">
                      {dispute.title}
                    </h3>
                    <p className="text-equine-forest text-sm mb-4">
                      {dispute.description}
                    </p>
                    <p className="text-sm text-equine-accent font-semibold">
                      Resolution Approach:
                    </p>
                    <p className="text-sm text-equine-forest">
                      {dispute.resolution}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 bg-equine-warm rounded-lg p-8">
            <h2 className="text-2xl font-heading font-bold text-equine-navy mb-4">
              Need Professional Legal Support?
            </h2>
            <p className="text-lg text-equine-forest mb-6">
              Our network of experienced UK equine law solicitors can help you navigate the legal process and protect your rights under British law.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest">
                Find a UK Equine Solicitor
                <Scale className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                Download UK Dispute Guide
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

export default Disputes; 