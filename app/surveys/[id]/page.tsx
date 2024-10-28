// app/surveys/[id]/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Button, buttonVariants } from "../../components/ui-page/button";
import { Input } from "../../components/ui-page/input";
import { Label } from "../../components/ui-page/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../components/ui-page/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui-page/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui-page/dialog";
import { Moon, Sun, CheckCircle, User, Mail, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

// Define the structure of your survey data
interface SurveyQuestion {
  questionId: number;
  type: string;
  text: string;
  options: { optionId: number; text: string }[];
}

interface SurveyData {
  surveyId: number;
  title: string;
  description: string;
  questions: SurveyQuestion[];
}
interface FormData {
  name: string;
  email: string;
  [key: string]: any; // Allow dynamic keys like `question_1`, `question_2`, etc.
}

// Default survey data to use if the API call fails
const defaultSurveyData: SurveyData = {
  surveyId: 0,
  title: "Developer Survey",
  description: "Fallback data: Explore your programming preferences",
  questions: [
    {
      questionId: 1,
      type: "radio",
      text: "What is your preferred programming paradigm?",
      options: [
        { optionId: 1, text: "Object-Oriented" },
        { optionId: 2, text: "Functional" },
        { optionId: 3, text: "Procedural" },
        { optionId: 4, text: "Hybrid" },
      ],
    },
    // Add more default questions if needed
  ],
};

// Initial form data
const initialFormData: FormData = {
  name: "",
  email: "",
};

export default function SurveyPageComponent() {
  const params = useParams();
  const id = params.id; // Retrieve the 'id' from the URL

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { theme, setTheme } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveyData, setSurveyData] = useState<SurveyData>(defaultSurveyData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch survey data based on 'id'
  useEffect(() => {
    if (id) {
      setLoading(true);
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/surveys/json/${id}?ngrok-skip-browser-warning=true`;
      console.log(
        "Fetching survey data from:",
        process.env.NEXT_PUBLIC_API_BASE_URL
      );

      fetch(url)
        .then((response) => {
          console.log("Response status:", response.status);
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data: SurveyData) => {
          console.log("Fetched data:", data);
          if (data && Array.isArray(data.questions)) {
            setSurveyData(data);
            setError(null);
          } else {
            console.warn("Invalid survey data structure. Using default data.");
            setSurveyData(defaultSurveyData);
            setError("Invalid survey data structure.");
          }
        })
        .catch((error) => {
          console.error("Error fetching survey data:", error);
          setSurveyData(defaultSurveyData);
          setError("Failed to load survey data. Showing default survey.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  // Handle input changes for name and email
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle option changes for survey questions
  const handleOptionChange = (questionId: number, option: string) => {
    setFormData((prev) => ({
      ...prev,
      [`question_${questionId}`]: option,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey submitted:", formData);
    setIsSubmitted(true);
    // Here you would typically send the data to your server
  };

  // Reset the form after submission
  const resetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    // Reset survey responses
    surveyData.questions.forEach((question) => {
      setFormData((prev) => ({
        ...prev,
        [`question_${question.questionId}`]: undefined,
      }));
    });
  };

  // Clear only the survey responses, not name and email
  const clearResponses = () => {
    const clearedData = { ...formData };
    surveyData.questions.forEach((question) => {
      clearedData[`question_${question.questionId}`] = undefined;
    });
    setFormData(clearedData);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 w-full border-b border-green-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold text-green-600 sm:inline-block">
                Survey Bull
              </span>
            </a>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading ? (
          <p>Loading survey data...</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="w-full max-w-2xl mx-auto bg-white border-green-300 shadow-lg">
              {/* Survey Header */}
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-green-600">
                  {surveyData.title}
                </CardTitle>
                <CardDescription className="text-green-700">
                  {surveyData.description}
                </CardDescription>
              </CardHeader>

              {/* Survey Form */}
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-green-700 flex items-center"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-white text-gray-900 border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-green-700 flex items-center"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-white text-gray-900 border-green-300 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  {/* Survey Questions */}
                  {surveyData.questions.map((question) => (
                    <motion.div
                      key={question.questionId}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: question.questionId * 0.1,
                      }}
                    >
                      <Label className="text-green-700">{question.text}</Label>
                      <RadioGroup
                        name={`question_${question.questionId}`}
                        value={
                          formData[`question_${question.questionId}`] || ""
                        }
                        onValueChange={(value) =>
                          handleOptionChange(question.questionId, value)
                        }
                      >
                        {question.options.map((option) => (
                          <div
                            key={option.optionId}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.text}
                              id={`${question.questionId}_${option.optionId}`}
                              className="border-green-400 text-green-600"
                            />
                            <Label
                              htmlFor={`${question.questionId}_${option.optionId}`}
                              className="text-gray-700"
                            >
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </motion.div>
                  ))}
                </CardContent>

                {/* Form Footer */}
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={clearResponses}
                    className="flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear Responses
                  </Button>
                  <Button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Submit Survey
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Thank You Dialog */}
      <Dialog open={isSubmitted} onOpenChange={setIsSubmitted}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-green-600">
              Thank You, {formData.name || "Participant"}!
            </DialogTitle>
            <DialogDescription className="text-center">
              <motion.div
                className="flex justify-center my-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <CheckCircle className="h-16 w-16 text-green-500" />
              </motion.div>
              <p className="text-lg font-semibold mb-2">Survey Bull</p>
              <p>Your go-to survey tool for the USF community.</p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={resetForm}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
