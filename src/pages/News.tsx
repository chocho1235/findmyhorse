import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, Landmark, AlertTriangle, Users, MapPin } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { newsArticles } from '@/lib/newsData';
import { Link } from 'react-router-dom';
import MetaTags from '@/components/seo/MetaTags';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const insights = [
  {
    title: "75% of disputes involve private sales",
    description: "Most conflicts arise from private transactions with less legal protection.",
    icon: Users
  },
  {
    title: "Average resolution time: 6 weeks",
    description: "Most cases resolve faster with proper documentation and early legal advice.",
    icon: Clock
  },
  {
    title: "Documentation is crucial",
    description: "Cases with good records have a 3x higher success rate in achieving a favourable outcome.",
    icon: AlertTriangle
  }
];

const NewsPage = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(newsArticles.map(a => a.category)))];

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = category === 'All' || article.category === category;
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.summary.toLowerCase().includes(search.toLowerCase()) ||
      (article.author && article.author.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
      'Breeding Rights': 'bg-pink-100 text-pink-800',
      'Contract Law': 'bg-teal-100 text-teal-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      <MetaTags
        title="Equestrian Legal News & Case Analysis - FindMyHorse"
        description="Stay informed with the latest equine legal news, case analysis, and updates from the UK equestrian world."
      />
      <div className="min-h-screen bg-background">
        <Navigation />

        {/* Hero Section */}
        <section className="hero-gradient text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Equestrian Legal News
              <span className="block text-equine-accent">Analysis & Outcomes</span>
            </h1>
            <p className="text-xl text-equine-sage mb-8 leading-relaxed">
              Learn from real disputes, successful resolutions, and legal outcomes. See how legal principles apply in practice.
            </p>
          </div>
        </section>

        {/* Key Insights */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Key Legal Insights</h2>
              <p className="text-lg text-equine-forest">Insights from analyzing hundreds of equestrian disputes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {insights.map((insight, index) => (
                <Card key={index} className="shadow-md border-0 text-center hover:shadow-lg transition-all duration-300">
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

            {/* Additional Insights */}
            <div className="mt-12">
              <h3 className="text-2xl font-heading font-bold text-equine-navy mb-6 text-center">Common Dispute Patterns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-equine-navy">Health-Related Disputes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-equine-forest">
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>75% of health disputes involve undisclosed conditions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>Average resolution time: 3-4 months</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>Success rate increases with proper documentation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="shadow-md border-0">
                  <CardHeader>
                    <CardTitle className="text-lg font-heading text-equine-navy">Behavioral Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-equine-forest">
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>60% of behavioral disputes involve undisclosed vices</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>Most common: crib-biting and weaving</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-equine-accent mr-2">•</span>
                        <span>Full refunds common in dealer sales</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured News */}
        <section className="py-16 bg-equine-warm">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Featured News & Analysis</h2>
              <p className="text-lg text-equine-forest">Detailed analysis of the most educational equestrian disputes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredArticles.filter(article => article.featured).map((article, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group cursor-pointer bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <Badge className={getOutcomeColor(article.outcomeType)}>
                        {article.outcome}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{article.author ? article.author[0] : '?'}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-equine-forest font-medium">{article.author}</span>
                    </div>
                    <p className="text-equine-forest mb-6">
                      {article.summary}
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <Landmark className="h-4 w-4 text-equine-accent" />
                        <span className="text-equine-forest">{article.amount}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-equine-accent" />
                        <span className="text-equine-forest">{article.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-equine-accent" />
                        <span className="text-equine-forest">{article.location}</span>
                      </div>
                    </div>
                    <Link to={`/news/${article.id}`}>
                      <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest">
                        Read Full Analysis
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All News Articles */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">All News Articles</h2>
              <p className="text-lg text-equine-forest mb-8">Browse our complete collection of real dispute analyses and their outcomes.</p>
              
              {/* Search & Filter */}
              <div className="flex flex-col gap-4 mb-8">
                <Input
                  type="text"
                  placeholder="Search articles by title, content, or outcome..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full"
                />
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={cat === category ? 'default' : 'outline'}
                      className={cat === category ? 'bg-equine-accent text-white' : 'border-equine-accent text-equine-accent'}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Card key={index} className="shadow-md hover:shadow-lg transition-all duration-300 border-0 group cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-equine-forest text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{article.location}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback>{article.author ? article.author[0] : '?'}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-equine-forest font-medium">{article.author}</span>
                    </div>
                    <p className="text-equine-forest text-sm mb-4">
                      {article.summary}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={getOutcomeColor(article.outcomeType)}>
                        {article.outcome}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-equine-forest">
                        <Landmark className="h-3 w-3" />
                        <span>{article.amount}</span>
                      </div>
                    </div>
                    <Link to={`/news/${article.id}`}>
                      <Button size="sm" variant="outline" className="w-full border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                        Read Analysis
                      </Button>
                    </Link>
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
              Use our tools and guides to avoid the problems you've seen in the news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-equine-accent text-white hover:bg-equine-forest-light font-semibold px-8 py-4 text-lg">
                Use Contract Builder
              </Button>
              <Button size="lg" className="bg-white text-equine-navy hover:bg-equine-sage font-semibold px-8 py-4 text-lg">
                Download Protection Checklist
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default NewsPage;
