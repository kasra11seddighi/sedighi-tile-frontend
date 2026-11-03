import AboutHero from "../components/About/AboutHero";
import AboutStory from "../components/About/AboutStory";
import AboutStats from "../components/About/AboutStats";
import AboutValues from "../components/About/AboutValues";
import AboutCTA from "../components/About/AboutCTA";
import { useAboutContent } from "../components/About/hooks/useAboutContent";
import { FALLBACK_ABOUT_DATA } from "../components/About/fallback";
import { useSeo } from "../hooks/useSeo";

export default function About() {
  const { data, loading } = useAboutContent();

  useSeo({
    title: "درباره ما",
    description: "آشنایی با نمایندگی صدیقی، سابقه‌ی فعالیت و ارزش‌هایی که در ارائه‌ی خدمات دنبال می‌کنیم.",
  });

  // تا لود اولیه تموم نشده چیزی نشون نده تا یهو محتوا عوض نشه (پرش دیداری)
  if (loading) return null;

  const about = data ?? FALLBACK_ABOUT_DATA;

  return (
    <>
      <AboutHero {...about.hero} />
      <AboutStats stats={about.stats} />
      <AboutStory {...about.story} />
      <AboutValues {...about.values} />
      <AboutCTA {...about.cta} />
    </>
  );
}
