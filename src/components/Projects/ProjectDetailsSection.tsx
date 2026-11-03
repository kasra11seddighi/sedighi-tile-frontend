import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertCircle,
  ImageOff,
  ArrowRight,
  ArrowLeft,
  MapPin,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { useProject } from "./hooks/useProject";
import { useRelatedProjects } from "./hooks/useRelatedProjects";
import ProjectCard from "./components/ProjectCard";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useSeo } from "../../hooks/useSeo";

function SkeletonDetails() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 md:grid-cols-2">
      <div className="aspect-[4/3] w-full rounded-2xl bg-white/5" />
      <div className="space-y-4">
        <div className="h-3 w-1/4 rounded bg-white/5" />
        <div className="h-6 w-3/4 rounded bg-white/5" />
        <div className="h-4 w-full rounded bg-white/5" />
        <div className="h-4 w-5/6 rounded bg-white/5" />
      </div>
    </div>
  );
}

function formatDate(iso?: string) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

export default function ProjectDetailsSection() {
  const { id } = useParams<{ id: string }>();
  const { project, isLoading, error } = useProject(id);
  const [activeImage, setActiveImage] = useState(0);

  const images = project
    ? [project.coverImage, ...(project.images ?? [])].filter(Boolean)
    : [];
  const date = formatDate(project?.completedAt);

  const { projects: relatedProjects } = useRelatedProjects(
    project?.category?._id,
    project?._id,
  );

  useSeo({
    title: project?.title ?? "جزئیات پروژه",
    description: project?.description?.slice(0, 160),
    image: images[0] ? resolveImageUrl(images[0]) : undefined,
  });

  return (
    <div dir="rtl" className="mx-auto max-w-6xl px-4 pb-24 pt-32">
      <Link
        to="/projects"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-brand-light"
      >
        <ArrowRight size={15} />
        بازگشت به پروژه‌ها
      </Link>

      {isLoading && <SkeletonDetails />}

      {!isLoading && error && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/5 py-16 text-center">
          <AlertCircle size={28} className="text-red-300" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {!isLoading && !error && project && (
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* گالری */}
            <div>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {images[activeImage] ? (
                  <img
                    src={resolveImageUrl(images[activeImage])}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-white/20">
                    <ImageOff size={32} />
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto">
                  {images.map((src, index) => (
                    <button
                      key={src + index}
                      type="button"
                      onClick={() => setActiveImage(index)}
                      className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border transition-colors ${
                        index === activeImage
                          ? "border-brand"
                          : "border-white/10 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={resolveImageUrl(src)}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* اطلاعات */}
            <div>
              {project.category && (
                <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-brand-light">
                  {project.category.name}
                </span>
              )}

              <h1 className="mt-4 text-2xl font-black leading-[1.6] text-white sm:text-3xl">
                {project.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/40">
                {project.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} />
                    {project.location}
                  </span>
                )}
                {date && (
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {date}
                  </span>
                )}
              </div>

              <p className="mt-6 whitespace-pre-line text-sm leading-8 text-white/60">
                {project.description}
              </p>

              {/* CTA - تبدیل بازدیدکننده به سرنخ واقعی */}
              <Link
                to="/contact"
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-3.5 text-sm font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
              >
                <MessageCircle size={16} />
                دوست داری فضایی شبیه این بسازیم؟ مشاوره رایگان بگیر
              </Link>
            </div>
          </div>

          {/* پروژه‌های مشابه */}
          {relatedProjects.length > 0 && (
            <div className="mt-16 border-t border-white/10 pt-10">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <h2 className="text-lg font-black text-white sm:text-xl">
                  پروژه‌های مشابه
                </h2>
                {project.category && (
                  <Link
                    to={`/projects?category=${project.category.slug}`}
                    className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand-light transition-colors hover:text-[#e3b27e]"
                  >
                    دیدن همه‌ی این دسته
                    <ArrowLeft size={14} />
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((related) => (
                  <ProjectCard key={related._id} project={related} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
