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
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';

const steps = [
  {
    question: "Who did you buy the horse from?",
    options: ["A business or dealer", "A private individual"],
    key: "sellerType",
  },
  {
    question: "Was the horse bought unseen? (e.g., over the phone or online without a prior viewing)",
    options: ["Yes, it was a distance sale", "No, I viewed the horse in person before purchase"],
    key: "distanceSale",
    condition: (answers: Record<string, string>) => answers.sellerType === "A business or dealer",
  },
  {
    question: "How long ago did you purchase the horse?",
    options: [
      "Less than 14 days ago",
      "14 to 30 days ago",
      "30 days to 6 months ago",
      "More than 6 months ago"
    ],
    key: "purchaseDate",
  },
  {
    question: "If it was a distance sale, were you informed of your right to reject within 14 days (e.g., in T&Cs, an email, or any document you could keep)?",
    options: ["Yes, it was included in T&Cs or a document/email", "No, I was not informed in any durable way"],
    key: "distanceInfo",
    condition: (answers: Record<string, string>) => answers.sellerType === "A business or dealer" && answers.distanceSale === "Yes, it was a distance sale",
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

const toolId = "dispute-resolution-wizard";

const DisputeResolutionWizard = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [wizardSteps, setWizardSteps] = useState(steps.filter(step => !step.condition));

  useEffect(() => {
    const activeSteps = steps.filter(step => {
        if (step.condition) {
            return step.condition(answers);
        }
        return true;
    });
    setWizardSteps(activeSteps);
  }, [answers]);

  useEffect(() => {
    setProgress(((currentStep + 1) / wizardSteps.length) * 100);
  }, [currentStep, wizardSteps]);

  useEffect(() => {
    const trackToolUsage = async () => {
      if (user) {
        await supabase
          .from('user_tool_usage')
          .insert({ user_id: user.id, tool_id: toolId });
      }
    };
    trackToolUsage();
  }, [user]);

  const handleNext = () => {
    if (currentStep < wizardSteps.length - 1) {
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
    const { sellerType, purchaseDate, issueType, contract, sellerContact, distanceSale, distanceInfo } = answers;

    let legalPosition = {
        strength: 'Moderate',
        summary: '',
    };
    const nextSteps = new Set<string>();
    const keyConsiderations = new Set<string>();

    if (sellerType === 'A business or dealer') {
      keyConsiderations.add('As you purchased from a business, your rights are protected under consumer law, which is significantly stronger than buying privately.');

      if (distanceSale === 'Yes, it was a distance sale') {
        if (purchaseDate === 'Less than 14 days ago') {
          legalPosition = {
            strength: 'Very Strong',
            summary: 'Under the Consumer Contracts Regulations 2013, you have a 14-day "cooling-off" period to return the horse for any reason for a full refund.'
          };
          nextSteps.add('Immediately notify the seller in writing that you are cancelling the contract under your cooling-off period rights. You do not need to give a reason.');
          keyConsiderations.add('The cooling-off period is your most powerful right. However, you may have to pay the cost of returning the horse unless the seller agreed otherwise.');
          keyConsiderations.add('This right applies even if the horse is perfectly as described.');
        } else if (purchaseDate === '14 to 30 days ago' || purchaseDate === '30 days to 6 months ago') {
          if (distanceInfo === 'No, I was not informed in any durable way') {
            legalPosition = {
              strength: 'Strong',
              summary: 'If the seller did not inform you in a durable medium (such as T&Cs, email, or any document you could keep) of your right to reject within 14 days, the cooling-off period may be extended up to 12 months. You may still be able to reject the horse.'
            };
            nextSteps.add('Write to the seller stating that you were not informed of your right to reject in a durable medium and are exercising your extended cooling-off period under the Consumer Contracts Regulations 2013.');
            keyConsiderations.add('The law requires the seller to inform you of your right to reject in a durable medium (such as T&Cs, an email, or a document you can keep). If they did not, your right to reject is extended.');
          } else {
            legalPosition = {
              strength: 'Strong',
              summary: 'Under the Consumer Rights Act 2015, you are entitled to a repair or replacement. A refund is only available if this is not possible or fails.'
            };
            nextSteps.add('Contact the seller in writing to request they either arrange a repair (e.g., pay for specific vet treatment) or offer a suitable replacement horse.');
            keyConsiderations.add('The Consumer Rights Act does not give an automatic right to a refund after 30 days. The seller must be given one opportunity to repair or replace the horse first.');
            keyConsiderations.add('If repair/replacement is impossible, fails, or is not done in a reasonable time, you then gain a "final right to reject" and can demand a refund (which may be reduced to account for any use you have had).');
          }
        } else { // More than 6 months
          legalPosition = {
            strength: 'Moderate',
            summary: 'After 6 months, the burden of proof shifts to you to prove the problem existed at the time of purchase.'
          };
          nextSteps.add('Gather strong evidence that the fault was present at the time of sale. This will almost certainly require a detailed report from a qualified veterinarian.');
          keyConsiderations.add('This can be difficult and expensive to prove. The strength of your vet\'s evidence is critical to your case.');
        }
      } else {
        // Not a distance sale
        if (purchaseDate === 'Less than 14 days ago' || purchaseDate === '14 to 30 days ago') {
          legalPosition = {
            strength: 'Very Strong',
            summary: 'Under the Consumer Rights Act 2015, you have a "short-term right to reject" the horse if it is not of satisfactory quality, fit for purpose, or as described. You are entitled to a full refund.'
          };
          nextSteps.add('Formally reject the horse in writing (email or recorded letter). State you are exercising your short-term right to reject under the Consumer Rights Act 2015.');
          keyConsiderations.add('The seller is responsible for the cost of returning the horse. You do not have to prove the fault existed at purchase, only that it is present now.');
          keyConsiderations.add('Important: The Consumer Rights Act applies because there is an issue with the horse. It does not give you the right to return the horse if you simply change your mind, your circumstances change, or you find one you like better.');
        } else if (purchaseDate === '30 days to 6 months ago') {
          legalPosition = {
            strength: 'Strong',
            summary: 'Under the Consumer Rights Act 2015, the horse is presumed to have been faulty at the time of sale. You are entitled to a repair or replacement. A refund is only available if this is not possible or fails.'
          };
          nextSteps.add('Contact the seller in writing to request they either arrange a repair (e.g., pay for specific vet treatment) or offer a suitable replacement horse.');
          keyConsiderations.add('The Consumer Rights Act does not give an automatic right to a refund after 30 days. The seller must be given one opportunity to repair or replace the horse first.');
          keyConsiderations.add('If repair/replacement is impossible, fails, or is not done in a reasonable time, you then gain a "final right to reject" and can demand a refund (which may be reduced to account for any use you have had).');
        } else { // More than 6 months
          legalPosition = {
            strength: 'Moderate',
            summary: 'After 6 months, the burden of proof shifts to you to prove the problem existed at the time of purchase.'
          };
          nextSteps.add('Gather strong evidence that the fault was present at the time of sale. This will almost certainly require a detailed report from a qualified veterinarian.');
          keyConsiderations.add('This can be difficult and expensive to prove. The strength of your vet\'s evidence is critical to your case.');
        }
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
            <CardTitle className="text-2xl text-center">Your Personalised Dispute Resolution Plan</CardTitle>
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

    const currentQuestion = wizardSteps[currentStep];

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
          <div className="space-y-4">
            <Progress value={progress} className="w-full transition-all" />
            <p className="text-sm text-muted-foreground mt-2 text-center">Step {currentStep + 1} of {wizardSteps.length}</p>
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
              {currentStep < wizardSteps.length - 1 ? 'Next' : 'Get My Results'}
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