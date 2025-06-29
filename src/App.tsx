import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Index';
import About from './pages/About';
import Learn from './pages/Learn';
import Tools from './pages/Tools';
import News from './pages/News';
import ArticlePage from './pages/ArticlePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import VerifyEmail from './pages/VerifyEmail';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import TokenExpired from './pages/TokenExpired';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Returns from './pages/learn/returns';
import Contracts from './pages/learn/contracts';
import Disputes from './pages/learn/disputes';
import RedFlagDetector from './pages/tools/RedFlagDetector';
import DisputeResolutionWizard from './pages/wizards/DisputeResolutionWizard';
import Contact from './pages/Contact';
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import { useEffect } from 'react';
import { supabase } from './lib/supabaseClient';
import BuyerProtectionChecklist from './pages/tools/BuyerProtectionChecklist';
import ScammerDatabase from './pages/tools/ScammerDatabase';
import VeterinaryReportAnalyser from './pages/tools/VeterinaryReportAnalyser';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Force refresh the session from storage/cookies on app load
    supabase.auth.getSession();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/tools" element={<Tools />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<ArticlePage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/token-expired" element={<TokenExpired />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                {/* Learn Pages */}
                <Route path="/learn/returns" element={<Returns />} />
                <Route path="/learn/sale-and-loan-contracts" element={<Contracts />} />
                <Route path="/learn/dispute-resolution" element={<Disputes />} />

                {/* Tool Pages */}
                <Route path="/tools/red-flag-detector" element={<ProtectedRoute><RedFlagDetector /></ProtectedRoute>} />
                <Route path="/tools/buyer-protection-checklist" element={<ProtectedRoute><BuyerProtectionChecklist /></ProtectedRoute>} />
                <Route path="/tools/scammer-database" element={<ProtectedRoute><ScammerDatabase /></ProtectedRoute>} />
                <Route path="/tools/veterinary-report-analyser" element={<VeterinaryReportAnalyser />} />

                {/* Wizards */}
                <Route path="/wizards/dispute-resolution" element={<ProtectedRoute><DisputeResolutionWizard /></ProtectedRoute>} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
