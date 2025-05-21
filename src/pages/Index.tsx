import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Shield, Users, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import RegistrationForm from "@/components/RegistrationForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
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
            <Link to="/contact" className="text-sm font-medium hover:text-primary">Contact</Link>
            
            {session ? (
              <>
                <Link to="/dashboard" className="text-sm font-medium hover:text-primary">Dashboard</Link>
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

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Services Section with ID for navigation */}
        <section id="services" className="py-16 bg-slate-50">
          <ServicesSection />
        </section>

        {/* About Section */}
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

        {/* Testimonials Section */}
        <section className="py-16 bg-slate-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We've helped hundreds of businesses achieve and maintain regulatory compliance. Here's what they have to say.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">"Nexus Compliance transformed our AML processes, making them more efficient while ensuring we're fully compliant."</p>
                  <div className="font-medium">- Financial Services Company</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">"Their employee training program significantly improved our team's understanding of compliance requirements."</p>
                  <div className="font-medium">- Healthcare Provider</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <p className="italic mb-4">"The risk assessment service helped us identify and address vulnerabilities we weren't even aware of."</p>
                  <div className="font-medium">- Technology Startup</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-bold">Nexus Compliance</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for comprehensive compliance and regulatory solutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">Services</h3>
              <ul className="space-y-2 text-sm">
                <li>AML Screening</li>
                <li>Background Checks</li>
                <li>Due Diligence</li>
                <li>Employee Training</li>
                <li>Policy Making</li>
                <li>Risk Assessment</li>
                <li>GoAML Solutions</li>
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
                      Stay updated on compliance regulations and industry news.
                    </DialogDescription>
                  </DialogHeader>
                  <RegistrationForm isNewsletterOnly onSuccess={handleSuccessfulRegistration} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
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

export default Index;
