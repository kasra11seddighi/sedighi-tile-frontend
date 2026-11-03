import api from "../../../api/axios";
import type {
  Project,
  ProjectCategory,
  ProjectsQuery,
  ProjectsResponse,
} from "../types/projects.types";

export const getProjectsRequest = async (
  query: ProjectsQuery,
): Promise<ProjectsResponse> => {
  const res = await api.get("/projects", { params: query });
  return { projects: res.data.projects, pagination: res.data.pagination };
};

export const getProjectCategoriesRequest = async (): Promise<
  ProjectCategory[]
> => {
  const res = await api.get("/projects/categories");
  return res.data.data;
};

export const getProjectByIdRequest = async (id: string): Promise<Project> => {
  const res = await api.get(`/projects/${id}`);
  return res.data.data;
};

// اگه بک‌اند بخواد لیست گزینه‌های مرتب‌سازی رو هم قابل‌ویرایش از داشبورد
// بده (مثل sort-options توی Products)، همین‌جا اضافه می‌شه؛ فعلاً چون
// پروژه‌ها فقط جدید/قدیم دارن (بدون قیمت)، لیست ثابت توی useProjects
// کافیه و اندپوینت جدا لازم نیست.
