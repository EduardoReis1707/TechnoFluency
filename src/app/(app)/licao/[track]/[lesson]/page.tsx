"use client";

import { notFound, useParams } from "next/navigation";
import { LessonPlayer } from "@/components/lesson/lesson-player";
import { getLesson } from "@/content/tracks";

export default function LessonPage() {
  const params = useParams<{ track: string; lesson: string }>();
  const data = getLesson(params.track, params.lesson);

  if (!data) return notFound();

  return <LessonPlayer track={data.track} lesson={data.lesson} next={data.next} />;
}
