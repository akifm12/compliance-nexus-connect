
import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Index from "@/pages/Index";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Auth from "@/pages/Auth";
import Contact from "@/pages/Contact";
import Dashboard from "@/pages/Dashboard";
import AdminBlog from "@/pages/AdminBlog";
import BlogEditor from "@/pages/BlogEditor";
import NotFound from "@/pages/NotFound";
import AdminRegistrations from "@/pages/AdminRegistrations";

// Providers
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Initialize QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    // Simulate auth loading
    setTimeout(() => {
      setAuthReady(true);
    }, 500);
  }, []);

  if (!authReady) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HashRouter>
          <Toaster />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/admin/blog/editor" element={<BlogEditor />} />
            <Route path="/admin/blog/editor/:slug" element={<BlogEditor />} />
            <Route path="/admin/registrations" element={<AdminRegistrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
