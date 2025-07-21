import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, TrendingUp, RotateCcw } from "lucide-react";

interface InterviewResult {
  questionId: number;
  question: string;
  userAnswer: string;
  aiScore: number;
  aiFeedback: string;
  improvementTips: string[];
}

interface InterviewResultsProps {
  results: InterviewResult[];
  overallScore: number;
  onStartNew: () => void;
}

// Mock AI feedback generator
const generateAIFeedback = (question: string, answer: string): Omit<InterviewResult, 'questionId' | 'question' | 'userAnswer'> => {
  const scores = [6, 7, 8, 7.5, 8.5, 6.5, 9];
  const score = scores[Math.floor(Math.random() * scores.length)];
  
  return {
    aiScore: score,
    aiFeedback: `Your answer demonstrates ${score >= 8 ? 'excellent' : score >= 7 ? 'good' : 'decent'} understanding. ${
      score >= 8 
        ? 'You provided specific examples and showed clear communication skills.' 
        : score >= 7 
        ? 'Your response was well-structured, but could benefit from more specific examples.'
        : 'Consider providing more detailed examples and showing deeper analysis.'
    }`,
    improvementTips: [
      "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
      "Provide specific, quantifiable examples when possible",
      "Show enthusiasm and genuine interest in the role",
      "Demonstrate problem-solving skills and adaptability"
    ].slice(0, Math.floor(Math.random() * 3) + 1)
  };
};

const InterviewResults = ({ results: rawResults, overallScore, onStartNew }: InterviewResultsProps) => {
  // Generate AI feedback for results that don't have it
  const results = rawResults.map(result => ({
    ...result,
    ...generateAIFeedback(result.question, result.userAnswer)
  }));

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return CheckCircle;
    return AlertCircle;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Overall Score Card */}
      <Card className="shadow-medium">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            Interview Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-4xl font-bold text-brand-purple">
                {overallScore.toFixed(1)}/10
              </div>
              <TrendingUp className="w-8 h-8 text-brand-purple" />
            </div>
            <Progress value={overallScore * 10} className="w-full max-w-md mx-auto" />
            <p className="text-muted-foreground">
              {overallScore >= 8 
                ? "Excellent performance! You're well-prepared for interviews." 
                : overallScore >= 6 
                ? "Good job! With some practice, you'll be ready to ace your interviews."
                : "Keep practicing! Review the feedback below to improve your interview skills."}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button variant="gradient" onClick={onStartNew}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Start New Interview
            </Button>
            <Button variant="outline">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Question Results */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Detailed Feedback</h2>
        
        {results.map((result, index) => {
          const ScoreIcon = getScoreIcon(result.aiScore);
          
          return (
            <Card key={index} className="shadow-soft">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">Question {index + 1}</Badge>
                      <div className={`flex items-center gap-1 ${getScoreColor(result.aiScore)}`}>
                        <ScoreIcon className="w-4 h-4" />
                        <span className="font-semibold">{result.aiScore}/10</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-foreground">
                      {result.question}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Your Answer:</h4>
                  <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    {result.userAnswer}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-foreground mb-2">AI Feedback:</h4>
                  <p className="text-muted-foreground">
                    {result.aiFeedback}
                  </p>
                </div>

                {result.improvementTips.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Improvement Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {result.improvementTips.map((tip, tipIndex) => (
                        <li key={tipIndex}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default InterviewResults;