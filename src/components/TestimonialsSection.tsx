
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  return (
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
  );
};

export default TestimonialsSection;
