import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ArrowLeft, RefreshCw, Edit } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const steps = [
  {
    question: "Who did you buy the horse from?",
    options: ["A business or dealer", "A private individual"],
    key: "sellerType",
  },
  {
    question: "How long ago did you purchase the horse?",
    options: ["Less than 30 days ago", "30 days to 6 months ago", "More than 6 months ago"],
    key: "purchaseDate",
  },
  {
    question: "What is the primary issue with the horse?",
    options: ["Health or soundness problem (undisclosed)", "Behavioral issues (dangerous or unsuitable)", "The horse was misdescribed (age, ability, etc.)"],
    key: "issueType",
  },
  {
    question: "Do you have a written sale contract?",
    options: ["Yes, a comprehensive one", "Yes, but it's very basic", "No, it was a verbal agreement"],
    key: "contract",
  },
  {
    question: "Have you contacted the seller about the issue?",
    options: ["Yes, and they are cooperating", "Yes, but they are uncooperative or have denied responsibility", "No, I have not contacted them yet"],
    key: "sellerContact",
  },
];

const DisputeResolutionWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
      setProgress(100);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers({ ...answers, [key]: value });
  };
  
  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };
  
  const handleEdit = () => {
    setIsCompleted(false);
  };

  const getResults = () => {
    const { sellerType, purchaseDate, issueType, contract, sellerContact } = answers;

    let legalPosition = {
        strength: 'Moderate',
        summary: '',
    };
    const nextSteps = new Set<string>();
    const keyConsiderations = new Set<string>();

    if (sellerType === 'A business or dealer') {
      keyConsiderations.add('As you purchased from a business, your rights are protected under the Consumer Rights Act 2015, which is significantly stronger than buying privately.');
      if (purchaseDate === 'Less than 30 days ago') {
        legalPosition = {
          strength: 'Very Strong',
          summary: 'You have a "short-term right to reject" the horse and are entitled to a full refund.'
        };
        nextSteps.add('Formally reject the horse in writing (email or recorded letter). State you are exercising your short-term right to reject under the Consumer Rights Act 2015.');
        keyConsiderations.add('The seller is responsible for the cost of returning the horse. You do not have to prove the fault existed at purchase, only that it is present.');
      } else if (purchaseDate === '30 days to 6 months ago') {
        legalPosition = {
          strength: 'Strong',
          summary: 'You have the right to a repair or replacement. If that fails or is not possible, you have a final right to reject.'
        };
        nextSteps.add('Contact the seller in writing to request they either repair the horse (e.g., pay for vet treatment) or offer a suitable replacement.');
        keyConsiderations.add('The seller has one chance to repair or replace. If they fail, you can then demand a refund (which may be reduced to account for any use you have had).');
      } else { // More than 6 months
        legalPosition = {
          strength: 'Moderate',
          summary: 'After 6 months, the burden of proof shifts to you to prove the problem existed at the time of purchase.'
        };
        nextSteps.add('Gather strong evidence that the fault was present at the time of sale. This will almost certainly require a detailed report from a qualified veterinarian.');
        keyConsiderations.add('This can be difficult and expensive to prove. The strength of your vet\'s evidence is critical to your case.');
      }
    } else { // Private seller
      keyConsiderations.add('In a private sale, the principle of "caveat emptor" (buyer beware) applies. Your main legal recourse is the Misrepresentation Act 1967.');
      if (contract === 'Yes, a comprehensive one') {
        legalPosition = {
          strength: 'Moderate',
          summary: 'Your rights are primarily defined by your written contract. Misrepresentation may also apply.'
        };
        nextSteps.add('Thoroughly review your sale contract for any clauses related to warranties, trial periods, or returns. Your actions should align with the contract.');
        keyConsiderations.add('A well-written contract can provide rights beyond the legal minimum. However, it can also limit them with clauses like "sold as seen".');
      } else { // Basic or verbal
        legalPosition = {
          strength: 'Weak',
          summary: 'With a basic or verbal agreement, your case relies heavily on proving misrepresentation.'
        };
        nextSteps.add('Your primary goal is to gather all evidence of what the seller told you. This includes adverts, text messages, emails, and notes from conversations.');
        keyConsiderations.add('To prove misrepresentation, you must show the seller made a false statement of fact which induced you to buy the horse.');
      }

      if (issueType.includes('Health') || issueType.includes('misdescribed')) {
        keyConsiderations.add('Misrepresentation is strongest in cases of undisclosed health issues or factual misdescriptions (e.g., age, height, record).');
      } else { // Behavioural
        keyConsiderations.add('Behavioural issues are harder to prove as they can be influenced by changes in environment, management, or rider after the sale.');
      }
    }

    if (sellerContact === 'No, I have not contacted them yet') {
      const allSteps = Array.from(nextSteps);
      allSteps.unshift('Your immediate first step is to contact the seller in writing (email is best). Clearly state the problem and what outcome you are seeking to create a record.');
      nextSteps.clear();
      allSteps.forEach(step => nextSteps.add(step));
    } else if (sellerContact === 'Yes, but they are uncooperative or have denied responsibility') {
      nextSteps.add('Since the seller is uncooperative, your next step should be to send a "Letter Before Action". This formal letter outlines your claim and warns that you will start legal proceedings if unresolved.');
      keyConsiderations.add('A Letter Before Action is a required legal step before court proceedings can begin. You can find templates online or have a solicitor draft one.');
    } else { // Cooperating
      nextSteps.add('Continue your dialogue and document all communication. Aim for a mutually agreeable solution, such as a contribution to vet fees or a partial refund.');
    }

    return { legalPosition, nextSteps: Array.from(nextSteps), keyConsiderations: Array.from(keyConsiderations) };
  };

  const renderContent = () => {
    if (isCompleted) {
      const { legalPosition, nextSteps, keyConsiderations } = getResults();
      let alertClass = "bg-yellow-100 border-yellow-400 text-yellow-800";
      if(legalPosition.strength === 'Very Strong') alertClass = "bg-green-100 border-green-400 text-green-800";
      if(legalPosition.strength === 'Strong') alertClass = "bg-green-100 border-green-400 text-green-800";
      if(legalPosition.strength === 'Weak') alertClass = "bg-red-100 border-red-400 text-red-800";
      
      return (
        <motion.div
          key="results"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardTitle className="text-2xl text-center">Your Personalized Dispute Resolution Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert className={alertClass}>
              <AlertTitle className="font-bold">Your Legal Position: {legalPosition.strength}</AlertTitle>
              <AlertDescription>
                {legalPosition.summary}
              </AlertDescription>
            </Alert>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3 text-equine-navy">Recommended Action Plan</h3>
              <ol className="list-decimal pl-5 space-y-3 text-equine-forest">
                {nextSteps.map((step, index) => <li key={index}>{step}</li>)}
              </ol>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3 text-equine-navy">Key Considerations</h3>
              <ul className="list-disc pl-5 space-y-3 text-equine-forest text-sm">
                {keyConsiderations.map((rec, index) => <li key={index}>{rec}</li>)}
              </ul>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleEdit} variant="outline">
                <Edit className="mr-2 h-4 w-4" /> Go Back & Edit
              </Button>
              <Button onClick={handleRestart}>
                <RefreshCw className="mr-2 h-4 w-4" /> Start Over
              </Button>
            </div>
          </CardContent>
        </motion.div>
      );
    }

    const currentQuestion = steps[currentStep];

    return (
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
      >
        <CardHeader>
          <CardTitle>Dispute Resolution Wizard</CardTitle>
          <div className="mt-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2 text-center">Step {currentStep + 1} of {steps.length}</p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-xl font-semibold mb-6 text-center text-equine-navy">{currentQuestion?.question}</h3>
          {currentQuestion && (
            <RadioGroup
              value={answers[currentQuestion.key] || ""}
              onValueChange={(value) => handleAnswerChange(currentQuestion.key, value)}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => (
                <Label
                  key={option}
                  htmlFor={option}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    answers[currentQuestion.key] === option
                      ? 'bg-equine-accent/10 border-equine-accent shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <RadioGroupItem value={option} id={option} className="h-5 w-5" />
                  <span className="text-base font-medium text-equine-forest">{option}</span>
                </Label>
              ))}
            </RadioGroup>
          )}

          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            
            <Button onClick={handleNext} disabled={!answers[currentQuestion?.key]}>
              {currentStep < steps.length - 1 ? 'Next' : 'Get My Results'}
            </Button>
          </div>
        </CardContent>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto py-12 px-4">
        <Card className="max-w-2xl w-full mx-auto shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DisputeResolutionWizard; 