
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => {
      setSubmitted(true);
      toast.success("Message sent successfully! We'll be in touch soon.");
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Nexus Compliance</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/#services" className="text-sm font-medium hover:text-primary">Services</Link>
            <Link to="/#about" className="text-sm font-medium hover:text-primary">About</Link>
            <Link to="/contact" className="text-sm font-medium text-primary">Contact</Link>
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
          </nav>
          <Button size="icon" variant="outline" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-primary mb-4">Thank you for your message!</h2>
              <p className="mb-6">We've received your inquiry and will get back to you shortly.</p>
              <Link to="/">
                <Button>Return to Homepage</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <p>
                Have questions about our compliance solutions? Fill out the form below and one of our experts will get in touch with you.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6 border p-6 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <input 
                      id="name"
                      type="text" 
                      className="w-full p-2 border rounded"
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      id="email"
                      type="email" 
                      className="w-full p-2 border rounded"
                      required 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input 
                    id="subject"
                    type="text" 
                    className="w-full p-2 border rounded"
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message"
                    rows={6}
                    className="w-full p-2 border rounded resize-none"
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full">Send Message</Button>
              </form>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Office</h3>
                  <address className="not-italic space-y-2 text-muted-foreground">
                    <p>123 Compliance Way</p>
                    <p>Financial District</p>
                    <p>New York, NY 10001</p>
                  </address>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Email: info@nexuscompliance.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Hours: Monday-Friday, 9AM-5PM EST</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="border-t mt-8 pt-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
            <div>&copy; 2025 Nexus Compliance. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
