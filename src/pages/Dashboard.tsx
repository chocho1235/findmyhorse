import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Wrench, Loader2, BookOpen, Shield, FileText, ChevronRight } from 'lucide-react';
import { allLearningTopics } from '@/lib/content';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/components/ui/use-toast"

interface UserProgress {
  completed_modules: string[];
  last_accessed: string;
  quiz_scores: Record<string, number>;
}

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
  const navigate = useNavigate();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

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

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cancelled = false;
    if (!user) {
      setLoadingProgress(false);
      return;
    }

    const fetchUserProgress = async (attempt = 1) => {
      setLoadingProgress(true);
      setProgressError(null);
      try {
        timeout = setTimeout(() => {
          if (!cancelled) {
            setProgressError('Failed to load progress. Please try again.');
            setLoadingProgress(false);
          }
        }, 10000); // 10 seconds

        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)
          .single();

        clearTimeout(timeout);
        if (error) throw error;
        if (!cancelled) {
          setUserProgress(data);
          setLoadingProgress(false);
          setProgressError(null);
        }
      } catch (error) {
        clearTimeout(timeout);
        if (attempt < 3 && !cancelled) {
          setTimeout(() => fetchUserProgress(attempt + 1), 1000); // retry after 1s
        } else if (!cancelled) {
          setUserProgress(null);
          setLoadingProgress(false);
          setProgressError('Failed to load progress after several attempts. Please try again.');
        }
      }
    };

    fetchUserProgress();
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [user, retryCount]);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", user.email)
        .single();
      setIsAdmin(!!data && !error);
    };
    checkAdmin();
  }, [user]);

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

  const getModuleProgress = (moduleId: string) => {
    if (!userProgress) return 0;
    return userProgress.completed_modules.includes(moduleId) ? 100 : 0;
  };

  const getQuizScore = (moduleId: string) => {
    if (!userProgress) return 0;
    return userProgress.quiz_scores[moduleId] || 0;
  };

  const getLastAccessedDate = () => {
    if (!userProgress?.last_accessed) return 'Never';
    return new Date(userProgress.last_accessed).toLocaleDateString();
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
            {isAdmin && (
              <div className="text-sm text-equine-accent font-semibold">
                You are an admin.
              </div>
            )}
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
                {loadingProgress ? (
                    <p>Loading your progress...</p>
                ) : progressError ? (
                    <div className="text-red-600">
                        {progressError}
                        <button onClick={() => setRetryCount(c => c + 1)} className="ml-2 underline text-blue-600">Retry</button>
                    </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <Card className="col-span-full">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => navigate('/tools')}
                    className="flex items-center justify-between p-6 h-auto bg-white hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <Shield className="h-8 w-8 text-equine-accent" />
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Legal Tools</h3>
                        <p className="text-sm text-gray-500">Access our legal tools</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Button>

                  <Button
                    onClick={() => navigate('/resources')}
                    className="flex items-center justify-between p-6 h-auto bg-white hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-equine-accent" />
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Resources</h3>
                        <p className="text-sm text-gray-500">Browse legal resources</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Button>

                  <Button
                    onClick={() => navigate('/contact')}
                    className="flex items-center justify-between p-6 h-auto bg-white hover:bg-gray-50 border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <BookOpen className="h-8 w-8 text-equine-accent" />
                      <div className="text-left">
                        <h3 className="font-semibold text-gray-900">Contact Us</h3>
                        <p className="text-sm text-gray-500">Get legal advice</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Button>
                </div>
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