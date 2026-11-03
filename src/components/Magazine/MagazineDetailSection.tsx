import { useParams, Link } from "react-router-dom";
import { Clock, User, ArrowRight } from "lucide-react";
import { useMagazineDetail } from "./hooks/useMagazineDetail";
import { useRelatedArticles } from "./hooks/useRelatedArticles";
import ShareButtons from "./components/ShareButtons";
import MagazineCard from "./components/MagazineCard";
import { useSeo } from "../../hooks/useSeo";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

export default function MagazineDetailSection() {
  const { slug } = useParams<{ slug: string }>();
  const { article, isLoading, error } = useMagazineDetail(slug);
  const { articles: relatedArticles } = useRelatedArticles(slug, article?.tags ?? []);

  useSeo({
    title: article?.title ?? "مقاله",
    description: article?.excerpt?.slice(0, 160),
    image: article?.coverImage ? resolveImageUrl(article.coverImage) : undefined,
    type: "article",
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-32">
        <p className="text-sm text-white/40">در حال بارگذاری مقاله...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        dir="rtl"
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-32 text-center"
      >
        <p className="text-sm text-white/50">{error || "این مقاله پیدا نشد."}</p>
        <Link
          to="/magazine"
          className="flex items-center gap-1.5 text-xs font-medium text-brand-light hover:text-[#e3b27e]"
        >
          <ArrowRight size={14} />
          بازگشت به مجله
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="pt-28">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          to="/magazine"
          className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-brand-light hover:text-[#e3b27e]"
        >
          <ArrowRight size={14} />
          بازگشت به مجله
        </Link>

        {article.tags?.[0] && (
          <span className="mb-4 inline-flex w-fit rounded-full bg-brand/10 px-3 py-1 text-[11px] font-medium text-brand-light">
            {article.tags[0]}
          </span>
        )}

        <h1 className="text-2xl font-black leading-[1.6] text-white sm:text-3xl">
          {article.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <User size={13} />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {article.readTime}
            </span>
          </div>

          <ShareButtons title={article.title} />
        </div>

        <div className="mt-8 aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] border border-white/10">
          <img
            src={resolveImageUrl(article.coverImage)}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-5 text-sm leading-9 text-white/70">
          {article.content
            .split("\n")
            .filter((p) => p.trim().length > 0)
            .map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
        </div>

        {/* مقالات مرتبط */}
        {relatedArticles.length > 0 && (
          <div className="mt-14 border-t border-white/10 pb-24 pt-10">
            <h2 className="mb-6 text-lg font-black text-white sm:text-xl">
              مقالات مرتبط
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {relatedArticles.map((related) => (
                <MagazineCard key={related._id} article={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
