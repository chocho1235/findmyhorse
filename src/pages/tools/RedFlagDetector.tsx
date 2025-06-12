import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertTriangle, Loader2, CheckCircle, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { redFlags, RedFlag } from '@/lib/redFlags';
import { Progress } from '@/components/ui/progress';

interface FoundFlag extends RedFlag {
  match: string;
  context: string;
}

interface AnalysisResult {
  score: number;
  level: 'Low' | 'Moderate' | 'High' | 'Very High';
  flags: FoundFlag[];
}

const RedFlagDetector = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = () => {
    setIsLoading(true);
    setResult(null);

    const sentences = inputText.match(/[^.!?]+[.!?]*/g) || [];

    setTimeout(() => {
      let score = 0;
      const flags: FoundFlag[] = [];
      const usedFlags = new Set<string>();

      sentences.forEach(sentence => {
        redFlags.forEach(flag => {
          const match = sentence.match(flag.pattern);
          if (match && !usedFlags.has(flag.id)) {
            flags.push({ ...flag, match: match[0], context: sentence.trim() });
            score += flag.severity;
            usedFlags.add(flag.id);
          }
        });
      });
      
      flags.sort((a, b) => b.severity - a.severity);

      let level: AnalysisResult['level'] = 'Low';
      if (score >= 8) level = 'Very High';
      else if (score >= 5) level = 'High';
      else if (score >= 2) level = 'Moderate';

      setResult({ score, level, flags });
      setIsLoading(false);
    }, 500);
  };
  
  const getRiskColor = (level: AnalysisResult['level']) => {
    if (level === 'Very High') return 'text-red-700';
    if (level === 'High') return 'text-orange-600';
    if (level === 'Moderate') return 'text-yellow-600';
    return 'text-green-600';
  };
  
  const getHighlightedText = () => {
    if (!result) return { __html: inputText.replace(/\n/g, '<br />') };
    let text = inputText;
    text = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    result.flags.forEach(flag => {
        const re = new RegExp(`(${flag.match})`, 'gi');
        text = text.replace(re, `<mark class="bg-yellow-200 rounded px-1">$1</mark>`);
    });

    return { __html: text.replace(/\n/g, '<br />') };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold font-heading text-gray-800 mb-4">
              Equine Ad Intelligence Report
            </h1>
            <p className="text-xl text-gray-600">
              Paste an advertisement below for a sophisticated analysis of potential risks.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Textarea
                placeholder="An honest horse, sold as seen. Needs an experienced rider as can be quirky..."
                className="w-full h-64 text-base"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button onClick={analyzeText} className="mt-4 w-full" disabled={isLoading || !inputText}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Generate Report'}
              </Button>
            </CardContent>
          </Card>
          
          {result && !isLoading && (
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-heading text-gray-800">Analysis Report</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* --- Risk Score --- */}
                    <div className="text-center p-6 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">Overall Risk Level</h3>
                        <p className={`text-5xl font-bold ${getRiskColor(result.level)}`}>{result.level}</p>
                        <Progress value={(result.score / 10) * 100} className="mt-4 h-3" />
                        <p className="text-sm text-gray-500 mt-2">Score: {result.score} (Higher is riskier)</p>
                    </div>

                    {/* --- Annotated Text --- */}
                    {result.flags.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">Annotated Text</h3>
                            <div className="prose max-w-none p-4 border rounded-md bg-white">
                                <p dangerouslySetInnerHTML={getHighlightedText()} />
                            </div>
                        </div>
                    )}
                    
                    {/* --- Detailed Findings --- */}
                    <div>
                        <h3 className="text-xl font-bold font-heading text-gray-800 mb-3">Detailed Findings</h3>
                        <ul className="space-y-4">
                            {result.flags.length > 0 ? result.flags.map((flag) => (
                                <li key={flag.id} className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded-r-lg">
                                    <h4 className="font-bold text-lg text-yellow-900 mb-2 flex items-center">
                                       <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600"/> {flag.label}
                                    </h4>
                                    <p className="text-yellow-800 mb-2"><strong className="font-semibold">Why it's a flag:</strong> {flag.explanation}</p>
                                    <p className="text-gray-700 bg-gray-100 p-2 rounded"><strong className="font-semibold">Our advice:</strong> {flag.advice}</p>
                                </li>
                            )) : (
                                <li className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                                    <h4 className="font-bold text-lg text-green-900 mb-1 flex items-center">
                                       <CheckCircle className="h-5 w-5 mr-2 text-green-600"/> No Major Red Flags Detected
                                    </h4>
                                    <p className="text-green-800">Our analysis did not find any common high-risk phrases. However, this is not a substitute for thorough due diligence, including a pre-purchase veterinary examination.</p>
                                </li>
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RedFlagDetector; 