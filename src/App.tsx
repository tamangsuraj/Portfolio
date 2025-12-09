import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Correctly import the Index and NotFound components
import Index from "./pages/Index";  // Ensure this file exists at 'src/pages/Index.tsx'
import NotFound from "./pages/NotFound";  // Ensure this file exists at 'src/pages/NotFound.tsx'

// Initialize Query Client for React Query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* Set up React Router for page navigation */}
        <BrowserRouter basename="/Portfolio">  {/* Replace 'Portfolio' with your repo name */}
          <Routes>
            {/* Define the homepage route */}
            <Route path="/" element={<Index />} />

            {/* Catch-all route for handling unmatched URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
