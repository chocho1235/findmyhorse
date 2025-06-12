import { useParams, Link } from 'react-router-dom';
import { newsArticles } from '@/lib/newsData';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Landmark, MapPin, MessageSquare } from 'lucide-react';
import NotFound from './NotFound';

const ArticlePage = () => {
  const { id } = useParams();
  const article = newsArticles.find(article => article.id === id);

  if (!article) {
    return <NotFound />;
  }
  
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

  const getOutcomeColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const renderContent = () => {
    return article.content.map((block, index) => {
      switch (block.type) {
        case 'paragraph':
          return <p key={index} className="mb-6 text-lg leading-relaxed">{block.text}</p>;
        case 'subheading':
          return <h3 key={index} className="text-2xl font-bold font-heading text-equine-navy mt-10 mb-4">{block.text}</h3>;
        case 'quote':
          return (
            <blockquote key={index} className="relative bg-gray-100 border-l-4 border-equine-accent p-6 my-8 rounded-r-lg">
              <MessageSquare className="absolute -top-3 -left-4 h-8 w-8 text-equine-accent opacity-20" />
              <p className="text-xl italic text-equine-forest mb-4">"{block.text}"</p>
              {block.source && <footer className="text-md text-equine-navy font-semibold">— {block.source}</footer>}
            </blockquote>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Link to="/news" className="inline-flex items-center text-equine-accent hover:text-equine-forest mb-8 transition-colors font-semibold">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All News
          </Link>

          <article>
            <header className="mb-10">
              <Badge className={`mb-4 w-fit ${getCategoryColor(article.category)}`}>
                {article.category}
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-equine-navy leading-tight">
                {article.title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-lg text-equine-forest">
                <div className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-equine-accent" />
                  <span>{article.amount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-equine-accent" />
                  <span>{article.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-equine-accent" />
                  <span>{article.location}</span>
                </div>
              </div>
               <div className={`mt-6 w-fit font-bold px-4 py-2 rounded-md text-base ${getOutcomeColor(article.outcomeType)}`}>
                  Outcome: {article.outcome}
              </div>
            </header>

            <div className="text-equine-deep-blue">
              {renderContent()}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ArticlePage; 