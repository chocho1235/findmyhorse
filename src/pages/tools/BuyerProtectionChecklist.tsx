import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Shield, CheckCircle, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/components/ui/use-toast";

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  importance: 'critical' | 'important' | 'recommended';
  checked: boolean;
}

const checklistItems: ChecklistItem[] = [
  // Pre-Purchase
  {
    id: 'pre-1',
    category: 'Pre-Purchase',
    text: 'Have you arranged a pre-purchase veterinary examination?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'pre-2',
    category: 'Pre-Purchase',
    text: 'Have you seen the horse in person?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'pre-3',
    category: 'Pre-Purchase',
    text: 'Have you ridden the horse?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'pre-4',
    category: 'Pre-Purchase',
    text: 'Have you checked the horse\'s competition record?',
    importance: 'important',
    checked: false
  },
  {
    id: 'pre-5',
    category: 'Pre-Purchase',
    text: 'Have you researched the seller\'s reputation?',
    importance: 'important',
    checked: false
  },

  // Documentation
  {
    id: 'doc-1',
    category: 'Documentation',
    text: 'Do you have a written contract?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'doc-2',
    category: 'Documentation',
    text: 'Have you received the horse\'s passport?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'doc-3',
    category: 'Documentation',
    text: 'Have you received vaccination records?',
    importance: 'important',
    checked: false
  },
  {
    id: 'doc-4',
    category: 'Documentation',
    text: 'Have you received competition records?',
    importance: 'recommended',
    checked: false
  },
  {
    id: 'doc-5',
    category: 'Documentation',
    text: 'Have you received training records?',
    importance: 'recommended',
    checked: false
  },

  // Financial
  {
    id: 'fin-1',
    category: 'Financial',
    text: 'Have you agreed on a payment method?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'fin-2',
    category: 'Financial',
    text: 'Have you received a receipt?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'fin-3',
    category: 'Financial',
    text: 'Have you arranged insurance?',
    importance: 'important',
    checked: false
  },
  {
    id: 'fin-4',
    category: 'Financial',
    text: 'Have you budgeted for ongoing costs?',
    importance: 'important',
    checked: false
  },

  // Transport
  {
    id: 'trans-1',
    category: 'Transport',
    text: 'Have you arranged transport?',
    importance: 'critical',
    checked: false
  },
  {
    id: 'trans-2',
    category: 'Transport',
    text: 'Have you checked transport insurance?',
    importance: 'important',
    checked: false
  },
  {
    id: 'trans-3',
    category: 'Transport',
    text: 'Have you arranged a suitable arrival time?',
    importance: 'recommended',
    checked: false
  }
];

const BuyerProtectionChecklist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [items, setItems] = useState<ChecklistItem[]>(checklistItems);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProgress = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('user_checklist_progress')
        .select('progress')
        .eq('user_id', user.id)
        .eq('checklist_type', 'buyer_protection')
        .single();
      if (data && data.progress) {
        setItems(data.progress);
      }
    };
    loadProgress();
  }, [user]);

  const handleCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const getProgress = () => {
    const total = items.length;
    const checked = items.filter(item => item.checked).length;
    return (checked / total) * 100;
  };

  const getCategoryProgress = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const total = categoryItems.length;
    const checked = categoryItems.filter(item => item.checked).length;
    return (checked / total) * 100;
  };

  const getUncheckedCritical = () => {
    return items.filter(item => item.importance === 'critical' && !item.checked);
  };

  const saveProgress = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('user_checklist_progress')
        .upsert({
          user_id: user.id,
          checklist_type: 'buyer_protection',
          progress: items,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,checklist_type'
        });

      if (error) throw error;
      
      toast({
        title: "Progress saved",
        description: "Your checklist progress has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Error saving progress",
        description: "There was a problem saving your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Buyer Protection Checklist
            </h1>
            <p className="text-xl text-gray-600">
              Ensure you're fully protected in your horse purchase
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Overall Progress</CardTitle>
                <Button 
                  onClick={saveProgress} 
                  disabled={saving || !user}
                  className="bg-equine-accent hover:bg-equine-forest"
                >
                  {saving ? 'Saving...' : 'Save Progress'}
                </Button>
              </div>
              <Progress value={getProgress()} className="h-2" />
            </CardHeader>
            <CardContent>
              {getUncheckedCritical().length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h3 className="text-red-800 font-semibold mb-2 flex items-center">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Critical Items Pending
                  </h3>
                  <ul className="list-disc list-inside text-red-700">
                    {getUncheckedCritical().map(item => (
                      <li key={item.id}>{item.text}</li>
                    ))}
                  </ul>
                </div>
              )}

              {categories.map(category => (
                <div key={category} className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{category}</h2>
                    <Progress value={getCategoryProgress(category)} className="w-32 h-2" />
                  </div>
                  <div className="space-y-3">
                    {items
                      .filter(item => item.category === category)
                      .map(item => (
                        <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                          <Checkbox
                            id={item.id}
                            checked={item.checked}
                            onCheckedChange={() => handleCheck(item.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={item.id}
                              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${item.checked ? 'line-through text-gray-400' : ''}`}
                            >
                              {item.text}
                            </label>
                            <div className="flex items-center mt-1">
                              {item.importance === 'critical' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                  Critical
                                </span>
                              )}
                              {item.importance === 'important' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                  Important
                                </span>
                              )}
                              {item.importance === 'recommended' && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                  Recommended
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BuyerProtectionChecklist; 