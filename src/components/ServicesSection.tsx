
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Search, FileCheck, Users, FileText, AlertTriangle, Globe } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ServicesSection = () => {
  // State to track which service dialog is open
  const [openService, setOpenService] = useState<number | null>(null);

  const services = [
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "AML Screening",
      description: "Advanced anti-money laundering screening to identify high-risk individuals and transactions.",
      content: "Our AML Screening service uses advanced algorithms and global databases to detect and prevent money laundering activities. We provide comprehensive screening against global sanctions lists, PEP databases, and adverse media. Our system continuously monitors transactions, generates risk-based alerts, and provides detailed audit trails for regulatory compliance. With real-time screening capabilities, we help you stay compliant with evolving AML regulations while minimizing false positives through intelligent risk scoring mechanisms."
    },
    {
      icon: <Search className="h-10 w-10 text-primary" />,
      title: "Background Checks",
      description: "Comprehensive background checks for employees, partners, and third parties.",
      content: "Our Background Checks service delivers thorough verification of individuals and organizations before you enter into business relationships. We conduct criminal record checks, employment history verification, education credential validation, and financial background analysis. Our comprehensive reports include identity verification, professional license confirmation, and global sanctions screening. All background checks comply with relevant privacy laws and regulations while delivering accurate information efficiently to support your due diligence requirements."
    },
    {
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      title: "Due Diligence",
      description: "Thorough due diligence procedures to assess risks and ensure compliance.",
      content: "Our Due Diligence service provides methodical investigation and assessment of potential business relationships. We conduct enhanced due diligence for high-risk entities, perform beneficial ownership identification, and assess regulatory compliance history. Our experts evaluate financial stability, analyze corporate structures, and identify potential red flags through proprietary risk assessment methodologies. We deliver detailed reports with clear risk ratings and provide ongoing monitoring to ensure continuous compliance throughout the business relationship lifecycle."
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Employee Training",
      description: "Interactive training programs to educate employees on compliance requirements.",
      content: "Our Employee Training services deliver customized compliance education programs that engage your workforce and establish a strong compliance culture. We offer interactive e-learning modules, in-person workshops, and certification programs covering AML, fraud prevention, and regulatory requirements. Our training solutions include scenario-based learning, knowledge assessments, and progress tracking. We provide multi-language support and customize content for different roles within your organization to ensure relevance and maximum knowledge retention."
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Policy Making",
      description: "Development of tailored policies and procedures to meet regulatory requirements.",
      content: "Our Policy Making service helps organizations establish robust governance frameworks through expertly crafted policies and procedures. We develop customized compliance manuals, implement workflow procedures, and create documentation templates that align with industry regulations. Our policy experts conduct gap analysis against regulatory requirements, review existing policies, and update documentation to reflect changing legislation. We also provide implementation assistance to ensure seamless adoption across your organization."
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-primary" />,
      title: "Risk Assessment",
      description: "Comprehensive risk assessment services to identify and mitigate compliance risks.",
      content: "Our Risk Assessment service identifies and evaluates potential compliance vulnerabilities within your organization. We conduct enterprise-wide risk assessments, product and service evaluations, and customer risk profiling. Using industry-standard methodologies, we quantify risk exposure, prioritize mitigation efforts, and develop comprehensive risk management plans. Our experts provide recommendations for control enhancements and deliver detailed risk matrices that help you allocate resources effectively to address the most critical compliance challenges."
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "GoAML Solutions",
      description: "Specialized solutions for GoAML reporting and compliance.",
      content: "Our GoAML Solutions provide specialized tools and expertise to streamline your regulatory reporting obligations. We offer automated data extraction, validation mechanisms, and report generation capabilities that ensure submission accuracy and timeliness. Our system includes template management, cross-validation checks, and submission tracking features to simplify the reporting process. We provide regular updates to accommodate changing reporting requirements and offer technical support to ensure seamless integration with your existing compliance systems."
    },
  ];

  return (
    <div className="container" id="services-section">
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
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setOpenService(index)}
              >
                Learn More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Service Detail Dialogs */}
      {services.map((service, index) => (
        <Dialog 
          key={index} 
          open={openService === index}
          onOpenChange={(open) => {
            if (!open) setOpenService(null);
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                {service.icon}
                <DialogTitle>{service.title}</DialogTitle>
              </div>
              <DialogDescription>
                {service.description}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 prose prose-slate">
              <p className="text-foreground leading-relaxed">{service.content}</p>
              
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-2">How We Can Help</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  <li>Personalized consultation to understand your specific needs</li>
                  <li>Tailored solutions designed for your industry requirements</li>
                  <li>Ongoing support and regular updates as regulations change</li>
                  <li>Seamless integration with your existing systems</li>
                </ul>
              </div>
              
              <div className="mt-6">
                <Button 
                  className="w-full"
                  onClick={() => setOpenService(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ServicesSection;
