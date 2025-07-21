import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen grid-bg flex items-center justify-center py-20 px-6 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 surface-gradient opacity-50" />
      
      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Personal 
              <span className="block bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
                AI Interview Coach
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Double your chances of landing that job offer with our AI-powered interview prep
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button variant="hero" size="xl" className="group" onClick={() => {
              const element = document.getElementById('how-it-works');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button variant="outline" size="xl">
              Watch Demo
            </Button>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-3xl blur-3xl transform rotate-6" />
            <img 
              src={heroImage} 
              alt="AI Interview Coach" 
              className="relative w-full max-w-lg rounded-2xl shadow-strong"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;