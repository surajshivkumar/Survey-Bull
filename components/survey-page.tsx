"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../components/ui-page/button";
import { Input } from "../components/ui-page/input";
import { Label } from "../components/ui-page/label";
import { RadioGroup, RadioGroupItem } from "../components/ui-page/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui-page/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui-page/dialog";
import { Moon, Sun, CheckCircle, User, Mail, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

// Simplified default survey data
const defaultSurveyData = {
  questions: [
    {
      id: 1,
      type: "radio",
      question: "What is your preferred programming paradigm?",
      options: ["Object-Oriented", "Functional", "Procedural", "Hybrid"],
    },
    {
      id: 2,
      type: "radio",
      question: "How often do you contribute to open-source projects?",
      options: ["Frequently", "Occasionally", "Rarely", "Never"],
    },
    {
      id: 3,
      type: "radio",
      question: "Which development environment do you prefer?",
      options: ["IDE", "Text Editor", "Online IDE", "Command Line"],
    },
  ],
};

const initialFormData = {
  name: "",
  email: "",
};

export default function SurveyPageComponent({ id }) {
  const [formData, setFormData] = useState(initialFormData);
  const { theme, setTheme } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [surveyData, setSurveyData] = useState(defaultSurveyData); // Start with default data

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  useEffect(() => {
    if (id) {
      fetch(`https://localhost:7216/api/surveys/json/${id}`)
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          if (data && Array.isArray(data.questions)) {
            setSurveyData(data);
          } else {
            console.warn("Invalid survey data structure. Using default data.");
            setSurveyData(defaultSurveyData);
          }
        })
        .catch((error) => {
          console.error("Error fetching survey data:", error);
          setSurveyData(defaultSurveyData);
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (questionId, option) => {
    setFormData((prev) => ({
      ...prev,
      [`question_${questionId}`]: option,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey submitted:", formData);
    setIsSubmitted(true);
    // Send data to server if needed
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setIsSubmitted(false);
    surveyData.questions.forEach((question) => {
      setFormData((prev) => ({
        ...prev,
        [`question_${question.id}`]: undefined,
      }));
    });
  };

  const clearResponses = () => {
    const clearedData = { ...formData };
    surveyData.questions.forEach((question) => {
      clearedData[`question_${question.id}`] = undefined;
    });
    setFormData(clearedData);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
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
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-2xl mx-auto bg-white border-green-300 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-green-600">
                Developer Survey
              </CardTitle>
              <CardDescription className="text-green-700">
                Explore preferences in development practices.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
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
                {surveyData.questions.map((question) => (
                  <motion.div
                    key={question.id}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: question.id * 0.1 }}
                  >
                    <Label className="text-green-700">
                      {question.question}
                    </Label>
                    <RadioGroup
                      name={`question_${question.id}`}
                      value={formData[`question_${question.id}`]}
                      onValueChange={(value) =>
                        handleOptionChange(question.id, value)
                      }
                    >
                      {question.options.map((option, index) => (
                        <div
                          key={`${question.id}_${index}`}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option}
                            id={`${question.id}_${option}`}
                            className="border-green-400 text-green-600"
                          />
                          <Label
                            htmlFor={`${question.id}_${option}`}
                            className="text-gray-700"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </motion.div>
                ))}
              </CardContent>
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
      </div>
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
