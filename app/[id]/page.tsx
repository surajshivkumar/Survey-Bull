"use client";

import { useParams } from "next/navigation";
import SurveyPageComponent from "../HomePage/page";

export default function IdPage() {
  const params = useParams();
  const id = params?.id;

  return <SurveyPageComponent id={id} />;
}
