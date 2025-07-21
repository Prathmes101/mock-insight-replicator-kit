import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  type: "behavioral" | "situational" | "technical";
}

interface InterviewSessionProps {
  jobPosition: string;
  onCompleteInterview: (responses: { questionId: number; answer: string }[]) => void;
}

// Mock questions generator based on job position
const generateQuestions = (jobPosition: string): Question[] => {
  const baseQuestions: Question[] = [
    { id: 1, question: "Tell me about yourself and your background.", type: "behavioral" },
    { id: 2, question: `What interests you about this ${jobPosition} role?`, type: "behavioral" },
    { id: 3, question: "Describe a challenging project you worked on and how you overcame obstacles.", type: "situational" },
    { id: 4, question: "What are your greatest strengths and how do they apply to this role?", type: "behavioral" },
    { id: 5, question: "Where do you see yourself in 5 years?", type: "behavioral" }
  ];

  if (jobPosition.toLowerCase().includes("frontend") || jobPosition.toLowerCase().includes("developer")) {
    baseQuestions.push(
      { id: 6, question: "Explain the difference between var, let, and const in JavaScript.", type: "technical" },
      { id: 7, question: "How do you optimize website performance?", type: "technical" }
    );
  }

  return baseQuestions;
};

const InterviewSession = ({ jobPosition, onCompleteInterview }: InterviewSessionProps) => {
  const [questions] = useState<Question[]>(generateQuestions(jobPosition));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ questionId: number; answer: string }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      toast({
        title: "Answer Required",
        description: "Please provide an answer before proceeding.",
        variant: "destructive"
      });
      return;
    }

    const newResponse = {
      questionId: currentQuestion.id,
      answer: currentAnswer
    };

    const updatedResponses = [...responses.filter(r => r.questionId !== currentQuestion.id), newResponse];
    setResponses(updatedResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      const nextQuestionResponse = updatedResponses.find(r => r.questionId === questions[currentQuestionIndex + 1].id);
      setCurrentAnswer(nextQuestionResponse?.answer || "");
    } else {
      onCompleteInterview(updatedResponses);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const currentResponse = {
        questionId: currentQuestion.id,
        answer: currentAnswer
      };
      
      const updatedResponses = [...responses.filter(r => r.questionId !== currentQuestion.id), currentResponse];
      setResponses(updatedResponses);
      
      setCurrentQuestionIndex(prev => prev - 1);
      const prevQuestionResponse = updatedResponses.find(r => r.questionId === questions[currentQuestionIndex - 1].id);
      setCurrentAnswer(prevQuestionResponse?.answer || "");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-medium">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">Mock Interview Session</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-xs font-medium">
                {currentQuestion.type.charAt(0).toUpperCase() + currentQuestion.type.slice(1)}
              </span>
            </div>
            <h3 className="text-lg font-medium text-foreground">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Your Answer:
            </label>
            <Textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-40"
            />
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              variant="gradient"
              onClick={handleNext}
            >
              {currentQuestionIndex === questions.length - 1 ? "Complete Interview" : "Next"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSession;