import { Link } from "react-router-dom";
import { Building2, ArrowLeft } from "lucide-react";
import { useProjectsPreview } from "./hooks/useProjectsPreview";
import ProjectCard from "./components/ProjectCard";

export default function ProjectsHomeSection() {
  const { projects, isLoading, error } = useProjectsPreview(3);

  // اگه چیزی برای نشون دادن نیست (لود نشده، خطا خورده یا پروژه‌ای ثبت
  // نشده)، این بخش کلاً از صفحه اصلی حذف می‌شه — دقیقاً مثل بخش مجله.
  if (isLoading || error || projects.length === 0) return null;

  return (
    <section dir="rtl" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-brand-light">
              <Building2 size={14} />
              <span>نمونه‌کارها</span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              پروژه‌های اجراشده
            </h2>
          </div>

          <Link
            to="/projects"
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-brand-light transition-colors hover:text-[#e3b27e]"
          >
            دیدن همه‌ی پروژه‌ها
            <ArrowLeft size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
