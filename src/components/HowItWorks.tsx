import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn, Plus, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: LogIn,
    title: "Sign In and Go to Dashboard",
    description: "Access your dashboard by signing in to view and manage your interviews, track progress, and more.",
    step: "01"
  },
  {
    icon: Plus,
    title: "Add New Interview",
    description: "Enter the details of the job position, description, and experience required to generate customized interview questions.",
    step: "02"
  },
  {
    icon: CheckCircle,
    title: "Check Your Responses",
    description: "Submit the interview and review the AI-generated feedback. You can also see the rating given, view the correct answers, and identify areas for improvement.",
    step: "03"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            How it Works?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Give mock interviews in just 3 simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="group relative border-0 shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-brand-purple to-brand-blue rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-purple text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center">
          <Button variant="gradient" size="xl">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;