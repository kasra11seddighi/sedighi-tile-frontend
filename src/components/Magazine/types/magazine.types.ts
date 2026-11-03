export interface MagazineListItem {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  readTime: string;
  tags: string[];
  createdAt: string;
}

export interface MagazineArticle extends MagazineListItem {
  content: string;
}

export interface MagazinePagination {
  total: number;
  page: number;
  pages: number;
  limit: number;
}

export interface MagazineQuery {
  search?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export interface MagazineListResponse {
  articles: MagazineListItem[];
  pagination: MagazinePagination;
}
