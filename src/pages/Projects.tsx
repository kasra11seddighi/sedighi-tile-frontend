import { useSearchParams } from "react-router-dom";
import ProjectsSection from "../components/Projects/ProjectsSection";

export default function Projects() {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") ?? "";

  return (
    <ProjectsSection key={categoryFromUrl} initialCategory={categoryFromUrl} />
  );
}
