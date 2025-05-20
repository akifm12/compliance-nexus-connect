
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Search, FileCheck, Users, FileText, AlertTriangle, Globe } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "AML Screening",
      description: "Advanced anti-money laundering screening to identify high-risk individuals and transactions.",
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Background Checks",
      description: "Comprehensive background checks for employees, partners, and third parties.",
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Due Diligence",
      description: "Thorough due diligence procedures to assess risks and ensure compliance.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Employee Training",
      description: "Interactive training programs to educate employees on compliance requirements.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Policy Making",
      description: "Development of tailored policies and procedures to meet regulatory requirements.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "Risk Assessment",
      description: "Comprehensive risk assessment services to identify and mitigate compliance risks.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "GoAML Solutions",
      description: "Specialized solutions for GoAML reporting and compliance.",
    },
  ];

  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Comprehensive Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We provide end-to-end compliance and regulatory solutions to help your business stay compliant and secure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="border transition-all hover:shadow-md">
            <CardHeader>
              <div className="mb-2">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="ghost" className="w-full">Learn More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
