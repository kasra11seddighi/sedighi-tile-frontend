import { FolderX, AlertCircle } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "../types/projects.types";

interface Props {
  projects: Project[];
  isLoading: boolean;
  error: string;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="aspect-[4/3] w-full bg-white/5" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/5 rounded bg-white/5" />
        <div className="h-3 w-full rounded bg-white/5" />
        <div className="h-3 w-2/5 rounded bg-white/5" />
      </div>
    </div>
  );
}

export default function ProjectGrid({ projects, isLoading, error }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center"
      >
        <AlertCircle size={28} className="text-red-300" />
        <p className="text-sm text-red-300">{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div
        dir="rtl"
        className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] py-16 text-center"
      >
        <FolderX size={28} className="text-white/25" />
        <p className="text-sm text-white/50">پروژه‌ای با این فیلترها پیدا نشد.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
