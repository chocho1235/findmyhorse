
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, DollarSign, AlertTriangle, CheckCircle, Users, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Cases = () => {
  const caseStudies = [
    {
      title: "The Lame Horse Return",
      summary: "Buyer discovers lameness 2 weeks after purchase - here's what happened next",
      outcome: "Successful Return",
      amount: "$15,000",
      duration: "3 weeks",
      location: "Texas",
      category: "Health Issues",
      featured: true,
      outcomeType: "positive"
    },
    {
      title: "Trial Period Gone Wrong",
      summary: "Horse injured during trial period - who's responsible for vet bills?",
      outcome: "Shared Responsibility",
      amount: "$3,200",
      duration: "6 weeks",
      location: "California",
      category: "Trial Periods",
      featured: true,
      outcomeType: "neutral"
    },
    {
      title: "Misrepresented Training Level",
      summary: "\"Broke to ride\" horse turns out to be dangerous - buyer's legal options",
      outcome: "Partial Refund",
      amount: "$8,500",
      duration: "2 months",
      location: "Kentucky",
      category: "Misrepresentation",
      featured: false,
      outcomeType: "neutral"
    },
    {
      title: "Age Fraud Discovery",
      summary: "DNA test reveals horse is 8 years older than advertised",
      outcome: "Full Refund + Costs",
      amount: "$12,000",
      duration: "4 weeks",
      location: "Florida",
      category: "Fraud",
      featured: false,
      outcomeType: "positive"
    },
    {
      title: "Transport Injury Dispute",
      summary: "Horse injured during shipping - complex liability between multiple parties",
      outcome: "Insurance Settlement",
      amount: "$22,000",
      duration: "8 months",
      location: "Colorado",
      category: "Transport Issues",
      featured: false,
      outcomeType: "positive"
    },
    {
      title: "Breeding Rights Confusion",
      summary: "Mare sold with unclear breeding restrictions leads to legal conflict",
      outcome: "Court Decision",
      amount: "$35,000",
      duration: "14 months",
      location: "Virginia",
      category: "Breeding Rights",
      featured: false,
      outcomeType: "negative"
    }
  ];

  const insights = [
    {
      title: "90% of cases involve contract issues",
      description: "Most disputes could have been prevented with clearer contracts",
      icon: CheckCircle
    },
    {
      title: "Average resolution time: 6 weeks",
      description: "Most cases resolve faster with proper documentation",
      icon: Clock
    },
    {
      title: "Documentation is crucial",
      description: "Cases with good records have 3x higher success rates",
      icon: AlertTriangle
    }
  ];

  const getOutcomeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Health Issues': 'bg-blue-100 text-blue-800',
      'Trial Periods': 'bg-purple-100 text-purple-800',
      'Misrepresentation': 'bg-orange-100 text-orange-800',
      'Fraud': 'bg-red-100 text-red-800',
      'Transport Issues': 'bg-indigo-100 text-indigo-800',
      'Breeding Rights': 'bg-pink-100 text-pink-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
            Real Case Studies from
            <span className="block text-equine-accent">Horse Transactions</span>
          </h1>
          <p className="text-xl text-equine-sage mb-8 leading-relaxed">
            Learn from real disputes, successful resolutions, and legal outcomes. See how our guidance applies in practice.
          </p>
        </div>
      </section>

      {/* Key Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">What We've Learned</h2>
            <p className="text-lg text-equine-forest">Insights from analyzing hundreds of horse transaction disputes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {insights.map((insight, index) => (
              <Card key={index} className="shadow-md border-0 text-center">
                <CardHeader>
                  <div className="mx-auto bg-equine-accent p-3 rounded-full mb-4 w-fit">
                    <insight.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-heading text-equine-navy">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-equine-forest">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-16 bg-equine-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Featured Case Studies</h2>
            <p className="text-lg text-equine-forest">Detailed analysis of the most educational horse transaction disputes.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {caseStudies.filter(study => study.featured).map((study, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group cursor-pointer bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge className={getCategoryColor(study.category)}>
                      {study.category}
                    </Badge>
                    <Badge className={getOutcomeColor(study.outcomeType)}>
                      {study.outcome}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-equine-forest mb-6">
                    {study.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-equine-accent" />
                      <span className="text-equine-forest">{study.amount}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-equine-accent" />
                      <span className="text-equine-forest">{study.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-equine-accent" />
                      <span className="text-equine-forest">{study.location}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest">
                    Read Full Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Cases */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">All Case Studies</h2>
            <p className="text-lg text-equine-forest">Browse our complete collection of real horse transaction disputes and their outcomes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(study.category)}>
                      {study.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-equine-forest text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{study.location}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-equine-forest text-sm mb-4">
                    {study.summary}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getOutcomeColor(study.outcomeType)}>
                      {study.outcome}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-equine-forest">
                      <DollarSign className="h-3 w-3" />
                      <span>{study.amount}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                    Read Case
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="hero-gradient py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Protect Yourself from Similar Issues
          </h2>
          <p className="text-xl text-equine-sage mb-8">
            Use our tools and guides to avoid the problems you've seen in these case studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg">
              Use Contract Builder
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-equine-navy font-semibold px-8 py-4 text-lg">
              Download Protection Checklist
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cases;
