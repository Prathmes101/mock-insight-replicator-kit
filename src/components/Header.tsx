import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="MockInsight" className="w-8 h-8" />
          <span className="text-xl font-bold text-foreground">MockInsight</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => window.location.reload()}
            className="text-foreground hover:text-primary transition-smooth"
          >
            Home
          </button>
          <button 
            onClick={() => {
              const element = document.getElementById('how-it-works');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-foreground hover:text-primary transition-smooth"
          >
            How it Works?
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button variant="hero" onClick={() => {
            // This will trigger the form state in the parent component
            const event = new CustomEvent('startInterview');
            window.dispatchEvent(event);
          }}>
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;