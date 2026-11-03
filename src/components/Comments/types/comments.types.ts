export interface ProductComment {
  _id: string;
  product: string;
  name: string;
  text: string;
  rating?: number;
  createdAt: string;
}

export interface CreateCommentInput {
  product: string;
  name: string;
  email?: string;
  text: string;
  rating?: number;
}
