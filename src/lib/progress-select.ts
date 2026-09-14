import type { ProgressState, Track } from "@/lib/types";
import { TRACKS, getTrack } from "@/content/tracks";
import { recommendTracks } from "@/lib/recommend";

export function isLessonDone(state: ProgressState, trackSlug: string, lessonId: string): boolean {
  return state.completedLessons.includes(`${trackSlug}/${lessonId}`);
}

export function trackProgress(state: ProgressState, track: Track): { done: number; total: number; pct: number } {
  const total = track.lessons.length;
  const done = track.lessons.filter((l) => isLessonDone(state, track.slug, l.id)).length;
  return { done, total, pct: total ? (done / total) * 100 : 0 };
}

/** First not-yet-completed lesson, walking recommended tracks in order. */
export function nextLesson(state: ProgressState): { track: Track; lessonId: string } | null {
  const order = recommendTracks(state.profile);
  for (const slug of order) {
    const track = getTrack(slug);
    if (!track) continue;
    const lesson = track.lessons.find((l) => !isLessonDone(state, slug, l.id));
    if (lesson) return { track, lessonId: lesson.id };
  }
  return null;
}

export function recentLessons(state: ProgressState, limit = 3) {
  return [...state.completedLessons]
    .slice(-limit)
    .reverse()
    .map((key) => {
      const [trackSlug, lessonId] = key.split("/");
      const track = getTrack(trackSlug);
      const lesson = track?.lessons.find((l) => l.id === lessonId);
      return track && lesson ? { track, lesson } : null;
    })
    .filter(Boolean) as { track: Track; lesson: Track["lessons"][number] }[];
}

export function overallProgress(state: ProgressState): number {
  const total = TRACKS.reduce((s, t) => s + t.lessons.length, 0);
  return total ? (state.completedLessons.length / total) * 100 : 0;
}
