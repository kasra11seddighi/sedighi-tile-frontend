import { Link } from "react-router-dom";
import { MapPin, CalendarDays, ImageOff } from "lucide-react";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";
import type { Project } from "../types/projects.types";

interface Props {
  project: Project;
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
    });
  } catch {
    return null;
  }
}

export default function ProjectCard({ project }: Props) {
  const coverSrc = project.coverImage
    ? resolveImageUrl(project.coverImage)
    : undefined;
  const date = formatDate(project.completedAt);

  return (
    <Link
      to={`/projects/${project._id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-brand/40 hover:bg-white/[0.05]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/5">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-white/20">
            <ImageOff size={28} />
          </div>
        )}

        {project.category && (
          <span className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#07111f]/80 px-3 py-1 text-[11px] font-medium text-brand-light backdrop-blur">
            {project.category.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4" dir="rtl">
        <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-brand-light">
          {project.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-6 text-white/50">
          {project.description}
        </p>

        {(project.location || date) && (
          <div className="mt-auto flex items-center gap-3 pt-2 text-[11px] text-white/40">
            {project.location && (
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {project.location}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1">
                <CalendarDays size={12} />
                {date}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
