import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InterviewForm from "@/components/InterviewForm";
import InterviewSession from "@/components/InterviewSession";
import InterviewResults from "@/components/InterviewResults";

type AppState = "landing" | "form" | "interview" | "results";

interface InterviewData {
  jobPosition: string;
  jobDescription: string;
  experience: string;
  company: string;
}

interface InterviewResponse {
  questionId: number;
  answer: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [interviewResponses, setInterviewResponses] = useState<InterviewResponse[]>([]);

  const handleStartInterview = (data: InterviewData) => {
    setInterviewData(data);
    setCurrentState("interview");
  };

  const handleCompleteInterview = (responses: InterviewResponse[]) => {
    setInterviewResponses(responses);
    setCurrentState("results");
  };

  const handleStartNew = () => {
    setCurrentState("form");
    setInterviewData(null);
    setInterviewResponses([]);
  };

  const handleBackToLanding = () => {
    setCurrentState("landing");
  };

  const handleGetStarted = () => {
    setCurrentState("form");
  };

  useEffect(() => {
    const handleStartInterview = () => {
      setCurrentState("form");
    };

    window.addEventListener('startInterview', handleStartInterview);
    return () => window.removeEventListener('startInterview', handleStartInterview);
  }, []);

  // Mock results generation
  const generateResults = () => {
    return interviewResponses.map(response => ({
      questionId: response.questionId,
      question: `Interview question ${response.questionId}`,
      userAnswer: response.answer,
      aiScore: Math.random() * 3 + 7, // Random score between 7-10
      aiFeedback: "AI-generated feedback would go here",
      improvementTips: ["Sample improvement tip"]
    }));
  };

  const calculateOverallScore = () => {
    const results = generateResults();
    return results.reduce((acc, result) => acc + result.aiScore, 0) / results.length;
  };

  if (currentState === "form") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-6">
          <InterviewForm onStartInterview={handleStartInterview} />
        </main>
      </div>
    );
  }

  if (currentState === "interview" && interviewData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-6">
          <InterviewSession 
            jobPosition={interviewData.jobPosition}
            onCompleteInterview={handleCompleteInterview}
          />
        </main>
      </div>
    );
  }

  if (currentState === "results") {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20 px-6">
          <InterviewResults 
            results={generateResults()}
            overallScore={calculateOverallScore()}
            onStartNew={handleStartNew}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        
        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-brand-purple to-brand-blue">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of professionals who have improved their interview skills with MockInsight
            </p>
            <Button variant="hero" size="xl" onClick={handleGetStarted}>
              Start Your Free Mock Interview
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
