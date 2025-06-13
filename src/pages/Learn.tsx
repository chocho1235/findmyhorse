import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Clock, BookOpen, AlertCircle, CheckCircle, Users, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { allLearningTopics } from '@/lib/content';
import MetaTags from '@/components/seo/MetaTags';

const Learn = () => {
  const topics = allLearningTopics;

  const quickAnswers = [
    {
      question: "How long do I have to return a horse?",
      answer: "Return periods vary by state and contract terms, typically ranging from 3-30 days for specific issues."
    },
    {
      question: "Can I get my money back if the horse is lame?",
      answer: "Depends on pre-existing conditions, warranties in your contract, and whether lameness was disclosed."
    },
    {
      question: "What if the seller won't honor the return policy?",
      answer: "Document everything, review your contract, and consider mediation before legal action."
    }
  ];

  return (
    <>
      <MetaTags
        title="Equine Law Learning Guides - FindMyHorse"
        description="Comprehensive guides on UK equine law, covering contracts, liability, welfare, and more. Free, practical resources for horse owners and professionals."
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <section className="hero-gradient text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold mb-6">
              Learn the Basics of
              <span className="block text-equine-accent">Horse Transaction Law</span>
            </h1>
            <p className="text-xl text-equine-sage mb-8 leading-relaxed">
              Clear, practical guidance on returns, contracts, disputes, and buyer protection. No law degree required.
            </p>
          </div>
        </section>

        {/* Featured Topics */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Start Here</h2>
              <p className="text-lg text-equine-forest">Essential topics every horse buyer and seller should understand.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {topics.filter(topic => topic.featured).map((topic, index) => (
                <Link to={topic.path} key={index} className="no-underline">
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 group h-full flex flex-col">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="bg-equine-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                            <topic.icon className="h-6 w-6 text-white" />
                          </div>
                          <Badge className={topic.color}>
                            {topic.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center text-equine-forest text-sm">
                          <Clock className="mr-1 h-4 w-4" />
                          {topic.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                        {topic.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-equine-forest mb-6">
                        {topic.description}
                      </p>
                      <Button className="w-full bg-equine-accent text-white hover:bg-equine-forest mt-auto">
                        Start Reading
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Answers */}
        <section className="py-16 bg-equine-warm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">Quick Answers</h2>
              <p className="text-lg text-equine-forest">
                Get immediate clarity on the most common questions.
              </p>
            </div>

            <div className="space-y-6">
              {quickAnswers.map((item, index) => (
                <Card key={index} className="shadow-md border-0 bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-equine-navy text-lg mb-3">
                      {item.question}
                    </h3>
                    <p className="text-equine-forest mb-4">
                      {item.answer}
                    </p>
                    <Button variant="outline" className="border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white">
                      Read Full Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* All Topics */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-equine-navy mb-4">All Learning Topics</h2>
              <p className="text-lg text-equine-forest">Browse our complete library of horse transaction guides.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <Link to={topic.path} key={index} className="no-underline">
                  <Card className="shadow-md hover:shadow-lg transition-all duration-300 border-0 group h-full flex flex-col">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={topic.color}>
                          {topic.difficulty}
                        </Badge>
                        <div className="flex items-center text-equine-forest text-sm">
                          <Clock className="mr-1 h-4 w-4" />
                          {topic.readTime}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="bg-equine-accent p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                          <topic.icon className="h-5 w-5 text-white" />
                        </div>
                        <CardTitle className="text-lg font-heading text-equine-navy group-hover:text-equine-accent transition-colors">
                          {topic.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <p className="text-equine-forest text-sm mb-4">
                        {topic.description}
                      </p>
                      <Button size="sm" variant="outline" className="w-full border-equine-accent text-equine-accent hover:bg-equine-accent hover:text-white mt-auto">
                        Read Guide
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Learn;