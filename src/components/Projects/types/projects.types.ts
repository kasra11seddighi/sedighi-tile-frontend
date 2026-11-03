export interface ProjectCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  location?: string;
  completedAt?: string; // تاریخ اتمام پروژه (ISO)
  coverImage: string;
  images?: string[];
  category?: ProjectCategory;
  isActive: boolean;
  createdAt: string;
}

export type ProjectSortOption = "-createdAt" | "createdAt";

// گزینه‌ی مرتب‌سازی که از بک‌اند میاد؛ دقیقاً هم‌الگو با SortOptionItem توی
// فیچر Products (نگاه کن به products.types.ts) تا بک‌اند بتونه از همون
// ساختار/اندپوینت الگو بگیره.
export interface ProjectSortOptionItem {
  value: ProjectSortOption;
  label: string;
  order?: number;
}

export interface ProjectsQuery {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
  sort?: ProjectSortOption;
}

export interface ProjectsPagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: ProjectsPagination;
}
