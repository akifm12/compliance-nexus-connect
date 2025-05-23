
import { Check, Shield, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import RegistrationForm from "@/components/RegistrationForm";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const AboutSection = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccessfulRegistration = () => {
    setIsDialogOpen(false);
    toast.success("Registration successful! We'll be in touch shortly.");
  };

  return (
    <section id="about" className="py-16 container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          With years of industry expertise and a commitment to excellence, we provide comprehensive compliance and regulatory solutions tailored to your business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <Check className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Our team consists of compliance experts with decades of combined experience across various industries.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Shield className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Comprehensive Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <p>From AML screening to policy making, we offer end-to-end compliance solutions to keep your business protected.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-primary mb-2" />
            <CardTitle>Client-Focused</CardTitle>
          </CardHeader>
          <CardContent>
            <p>We tailor our solutions to your specific industry needs, ensuring you get exactly what your business requires.</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Get Started Today</Button>
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

export default AboutSection;
