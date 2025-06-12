import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Wrench, Loader2 } from 'lucide-react';
import { allLearningTopics } from '@/lib/content';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast"

const Dashboard = () => {
  const { user, logout, profile, updateProfile, loading: authLoading } = useAuth();
  const [progress, setProgress] = useState<string[]>([]);
  const [toolUsage, setToolUsage] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(profile?.username || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [canUpdate, setCanUpdate] = useState(true);
  const [nextUpdateDate, setNextUpdateDate] = useState<Date | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true);
        
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('content_id')
          .eq('user_id', user.id);

        if (progressError) console.error("Error fetching progress:", progressError);
        else setProgress(progressData.map(item => item.content_id));

        const { data: toolData, error: toolError } = await supabase
          .from('user_tool_usage')
          .select('tool_id')
          .eq('user_id', user.id);

        if (toolError) console.error("Error fetching tool usage:", toolError);
        else setToolUsage(toolData);
        
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      if (profile.updated_at) {
        const lastUpdate = new Date(profile.updated_at);
        const sevenDaysLater = new Date(lastUpdate.getTime() + 7 * 24 * 60 * 60 * 1000);
        const now = new Date();
        
        if (now < sevenDaysLater) {
          setCanUpdate(false);
          setNextUpdateDate(sevenDaysLater);
        } else {
          setCanUpdate(true);
          setNextUpdateDate(null);
        }
      }
    }
  }, [user, profile]);

  const completedTopics = allLearningTopics.filter(topic => progress.includes(topic.id));
  const progressPercentage = (completedTopics.length / allLearningTopics.length) * 100;

  const uniqueToolsUsed = [...new Set(toolUsage.map(item => item.tool_id))].length;
  const totalToolUses = toolUsage.length;

  const handleUsernameUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !user) return;

    setIsUpdating(true);
    try {
      await updateProfile(username.trim());
      toast({
        title: "Success",
        description: "Username updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating username",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (!user) {
    // This should ideally not be reached if ProtectedRoute is used correctly
    return (
        <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl font-semibold mb-4">You are not logged in.</p>
                    <Link to="/login">
                        <Button>Go to Login</Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navigation />
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold font-heading text-gray-800">
              Welcome back, <span className="text-equine-accent">{profile?.username || 'user'}</span>!
            </h1>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
                <CardDescription>
                    You have completed {completedTopics.length} of {allLearningTopics.length} topics.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="mb-4" />
                {loading ? (
                    <p>Loading your progress...</p>
                ) : (
                    <ul className="space-y-2">
                        {completedTopics.map(topic => (
                            <li key={topic.id} className="flex items-center text-green-600">
                                <CheckCircle className="h-5 w-5 mr-2" />
                                <span>{topic.title}</span>
                            </li>
                        ))}
                    </ul>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUsernameUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isUpdating || !canUpdate}
                    />
                  </div>
                   <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user?.email || ''} disabled />
                  </div>
                  <Button type="submit" disabled={isUpdating || !canUpdate || !username.trim() || username === profile?.username}>
                    {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Username
                  </Button>
                  {!canUpdate && nextUpdateDate && (
                    <p className="text-sm text-muted-foreground pt-2">
                      You can update your username again after {nextUpdateDate.toLocaleDateString()}.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Wrench className="h-5 w-5 mr-2" />
                  Tool Usage
                </CardTitle>
                <CardDescription>
                    Track your engagement with our interactive tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                    <p>Loading stats...</p>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <p className="text-4xl font-bold text-equine-accent">{uniqueToolsUsed}</p>
                            <p className="text-sm text-equine-sage">Unique Tools Used</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-equine-accent">{totalToolUses}</p>
                            <p className="text-sm text-equine-sage">Total Tool Uses</p>
                        </div>
                    </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard; 