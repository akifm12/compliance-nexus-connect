
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, AlertTriangle, BookOpen, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Nexus Compliance</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">Home</Link>
            <Link to="/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
            <Link to="/dashboard#resources" className="text-sm font-medium hover:text-primary">Resources</Link>
            <Button variant="outline">Logout</Button>
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

      <main className="container py-10">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for registering with Nexus Compliance. Here you can access your requested resources.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>Your registered details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Name:</span>
                    <span>John Doe</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email:</span>
                    <span>john@example.com</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Company:</span>
                    <span>Example Corp.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Interest:</span>
                    <span>SaaS Demo</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Stay updated with our latest events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Compliance Webinar</h4>
                    <p className="text-sm text-muted-foreground">June 15, 2025 - 2:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-medium">AML Best Practices Workshop</h4>
                    <p className="text-sm text-muted-foreground">June 22, 2025 - 10:00 AM</p>
                  </div>
                  <Button variant="outline" className="w-full mt-2">View All Events</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your SaaS Demo</CardTitle>
                <CardDescription>Access your requested demo</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Your SaaS demo is ready! Click below to access the demo environment.</p>
                <Button className="w-full">Launch Demo</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="resources" className="py-10">
          <h2 className="text-2xl font-bold mb-6">Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Compliance Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><a href="#" className="text-primary hover:underline">AML Compliance Guide</a></li>
                  <li><a href="#" className="text-primary hover:underline">KYC Best Practices</a></li>
                  <li><a href="#" className="text-primary hover:underline">Risk Assessment Framework</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Training Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><a href="#" className="text-primary hover:underline">Employee Compliance Training</a></li>
                  <li><a href="#" className="text-primary hover:underline">AML Screening Tutorial</a></li>
                  <li><a href="#" className="text-primary hover:underline">GoAML Reporting Guide</a></li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Regulatory Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li><a href="#" className="text-primary hover:underline">Latest AML Regulations</a></li>
                  <li><a href="#" className="text-primary hover:underline">Compliance Deadline Changes</a></li>
                  <li><a href="#" className="text-primary hover:underline">New Industry Standards</a></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-primary/5 p-6 rounded-lg border mt-10">
          <h2 className="text-xl font-bold mb-4">Need Additional Support?</h2>
          <p className="mb-6">Our team is here to help you navigate your compliance needs. Feel free to reach out with any questions.</p>
          <Button>Contact Support</Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container py-6 md:flex md:items-center md:justify-between text-sm">
          <div className="text-center md:text-left mb-4 md:mb-0">
            &copy; 2025 Nexus Compliance. All rights reserved.
          </div>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
