import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface InterviewFormData {
  jobPosition: string;
  jobDescription: string;
  experience: string;
  company: string;
}

const InterviewForm = ({ onStartInterview }: { onStartInterview: (data: InterviewFormData) => void }) => {
  const [formData, setFormData] = useState<InterviewFormData>({
    jobPosition: "",
    jobDescription: "",
    experience: "",
    company: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobPosition || !formData.jobDescription || !formData.experience) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onStartInterview(formData);
  };

  const handleChange = (field: keyof InterviewFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
          Create New Mock Interview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobPosition">Job Position *</Label>
            <Input
              id="jobPosition"
              placeholder="e.g. Frontend Developer, Product Manager"
              value={formData.jobPosition}
              onChange={(e) => handleChange("jobPosition", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              placeholder="e.g. Google, Microsoft, Startup"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience *</Label>
            <Input
              id="experience"
              placeholder="e.g. 2-3 years, Fresh Graduate, 5+ years"
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription">Job Description *</Label>
            <Textarea
              id="jobDescription"
              placeholder="Paste the job description or key requirements here..."
              className="min-h-32"
              value={formData.jobDescription}
              onChange={(e) => handleChange("jobDescription", e.target.value)}
              required
            />
          </div>

          <Button type="submit" variant="gradient" size="lg" className="w-full">
            Generate Interview Questions
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default InterviewForm;