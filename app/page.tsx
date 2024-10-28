"use client";

import { Button } from "./components/ui-page/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "./components/ui-page/card";
import {
  CheckCircle,
  ChartArea,
  FileSliders,
  Globe,
  Lock,
  Settings,
} from "lucide-react"; // Make sure to import the icon

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900">
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Welcome to Survey Bull!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Your go-to platform for creating, sharing, and analyzing surveys with
        ease.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
        <Card>
          <CardContent className="flex flex-col items-center mt-5">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center">
              <CheckCircle className="mr-2" />
              Easy to Use
            </CardTitle>
            <CardDescription className="text-center">
              Create and distribute surveys in minutes with our intuitive
              interface.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center mt-5">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center">
              <ChartArea className="mr-2" />
              Real-Time Analytics
            </CardTitle>
            <CardDescription className="text-center">
              Get instant feedback and analyze responses to improve your
              offerings.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center mt-5">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center">
              <Settings className="mr-2" />
              Customizable
            </CardTitle>
            <CardDescription className="text-center">
              Tailor your surveys with various question types and design options
              to fit your needs.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center mt-5">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center">
              <Globe className="mr-2" />
              Accessible Anywhere
            </CardTitle>
            <CardDescription className="text-center">
              Reach participants on any device, ensuring higher response rates.
            </CardDescription>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center mt-5">
            <CardTitle className="text-xl font-bold text-green-600 flex items-center">
              <Lock className="mr-2" />
              Secure & Private
            </CardTitle>
            <CardDescription className="text-center">
              Your data is safe with us. We prioritize user privacy and data
              security.
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Get Started
        </Button>
      </div>
    </main>
  );
}
