
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import RegistrationForm from "@/components/RegistrationForm";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";

const Footer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccessfulRegistration = () => {
    setIsDialogOpen(false);
    toast.success("Registration successful! We'll be in touch shortly.");
  };

  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/0418ea59-0035-4a6a-9f42-f0589f05bdc0.png" 
                alt="Blue Arrow Management Consultants" 
                className="h-8" 
              />
              <span className="font-bold">Blue Arrow</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for comprehensive management consulting solutions.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Strategic Planning</li>
              <li>Process Optimization</li>
              <li>Change Management</li>
              <li>Leadership Development</li>
              <li>Performance Management</li>
              <li>Corporate Governance</li>
              <li>Business Analysis</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>About Us</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact Us</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Subscribe to Newsletter</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Subscribe</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
                  <DialogDescription>
                    Stay updated on management consulting trends and industry news.
                  </DialogDescription>
                </DialogHeader>
                <RegistrationForm isNewsletterOnly onSuccess={handleSuccessfulRegistration} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <div>&copy; 2025 Blue Arrow Management Consultants. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
