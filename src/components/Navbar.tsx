
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import RegistrationForm from "@/components/RegistrationForm";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/sonner";

interface NavbarProps {
  scrollToSection: (sectionId: string) => void;
}

const Navbar = ({ scrollToSection }: NavbarProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { session, signOut } = useAuth();

  const handleSuccessfulRegistration = () => {
    setIsDialogOpen(false);
    toast.success("Registration successful! We'll be in touch shortly.");
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("You have been signed out.");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/0418ea59-0035-4a6a-9f42-f0589f05bdc0.png" 
            alt="Blue Arrow Management Consultants" 
            className="h-10" 
          />
          <span className="text-xl font-bold">Blue Arrow</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
          <button 
            onClick={() => scrollToSection('services-section')}
            className="text-sm font-medium hover:text-primary"
          >
            Services
          </button>
          <Link to="/#about" className="text-sm font-medium hover:text-primary">About</Link>
          <Link to="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
          
          {session ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
              {session.user?.email === "admin@compliancehub.com" && (
                <Link to="/admin/registrations" className="text-sm font-medium hover:text-primary">Registrations</Link>
              )}
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium hover:text-primary">Login</Link>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Register</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Register for Services</DialogTitle>
                    <DialogDescription>
                      Register for a SaaS demo, updates, newsletter, or submit your query.
                    </DialogDescription>
                  </DialogHeader>
                  <RegistrationForm onSuccess={handleSuccessfulRegistration} />
                </DialogContent>
              </Dialog>
            </>
          )}
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
  );
};

export default Navbar;
