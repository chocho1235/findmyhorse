import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const { error } = await login(email, password);
      if (error) throw error;
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred. Please try again.");
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-heading">Welcome Back</CardTitle>
            <CardDescription>Enter your credentials to access your account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2 relative">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-equine-accent hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {error && (
                <div className="text-sm text-red-500 mt-2">
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full bg-equine-accent hover:bg-equine-forest" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-equine-accent hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Login; 