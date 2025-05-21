
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
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
    <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full border mb-6 text-sm">
              <Shield className="h-4 w-4 mr-2 text-primary" />
              <span>Leading Compliance Solutions Provider</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Simplifying <span className="text-primary">Regulatory Compliance</span> for Your Business
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Comprehensive solutions for AML screening, background checks, due diligence, 
              employee training, policy making, risk assessment, and GoAML.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {session ? (
                <>
                  <Link to="/dashboard">
                    <Button size="lg">Go to Dashboard</Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="lg">Get Started</Button>
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
                  <Link to="/auth">
                    <Button size="lg" variant="outline">
                      Login / Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              alt="Compliance Expert Team" 
              className="rounded-lg shadow-lg relative z-10 object-cover w-full h-[400px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
