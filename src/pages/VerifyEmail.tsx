import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const VerifyEmail = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navigation />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl font-heading mt-4">Check your email</CardTitle>
            <CardDescription>We've sent a verification link to your email address.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
                Please click the link in the email to complete your sign-up. Once you've verified your email, you can log in to your account.
            </p>
             <p className="text-sm text-muted-foreground mt-4">
                (You may need to check your spam folder)
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmail; 