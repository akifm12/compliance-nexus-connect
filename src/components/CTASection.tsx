
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import RegistrationForm from "@/components/RegistrationForm";
import { toast } from "@/components/ui/sonner";

const CTASection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccessfulRegistration = () => {
    setIsDialogOpen(false);
    toast.success("Registration successful! We'll be in touch shortly.");
  };

  return (
    <section className="bg-primary text-primary-foreground py-16">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to strengthen your compliance?</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Register today for a free consultation or to learn more about our services.
        </p>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-slate-100">
              Register Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
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
      </div>
    </section>
  );
};

export default CTASection;
