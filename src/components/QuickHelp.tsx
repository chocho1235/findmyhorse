import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickHelpItem {
  question: string;
  answer: string;
  link: string;
}

interface QuickHelpProps {
  items: QuickHelpItem[];
}

const QuickHelp = ({ items }: QuickHelpProps) => {
    return (
    <section className="py-20 bg-equine-warm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
                     <h2 className="text-3xl lg:text-4xl font-heading font-bold text-equine-navy mb-4">
            Need Quick Answers?
                     </h2>
          <p className="text-lg text-equine-forest">
            Get immediate clarity on the most common horse transaction questions.
                     </p>
                 </div>
 
        <div className="space-y-6">
          {items.map((item, index) => (
            <Link to={item.link} key={index} className="block">
              <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-equine-accent bg-white group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-equine-accent p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <AlertTriangle className="h-6 w-6 text-white" />
                                 </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-equine-navy text-xl mb-3">
                        {item.question}
                      </h3>
                      <p className="text-equine-forest text-lg mb-4">
                        {item.answer}
                      </p>
                      <div
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium bg-equine-accent text-white hover:bg-equine-forest font-semibold group-hover:translate-x-1 transition-transform duration-300 h-10 px-4 py-2"
                      >
                        Read full answer
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
                     ))}
                 </div>
             </div>
    </section>
     );
};
 
export default QuickHelp; 