import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Tools from "./pages/Tools";
import Resources from "./pages/Resources";
import Cases from "./pages/Cases";
import NotFound from "./pages/NotFound";
import Returns from "./pages/learn/returns";
import Contracts from "./pages/learn/contracts";
import Disputes from "./pages/learn/disputes";
import DisputeResolutionWizard from "./pages/wizards/DisputeResolutionWizard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/cases" element={<Cases />} />
          
          {/* Learn sub-pages */}
          <Route path="/learn/returns" element={<Returns />} />
          <Route path="/learn/contracts" element={<Contracts />} />
          <Route path="/learn/disputes" element={<Disputes />} />
          <Route path="/wizards/dispute-resolution" element={<DisputeResolutionWizard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
