import api from "../../../api/axios";
import type { ProductComment, CreateCommentInput } from "../types/comments.types";

// نظرات تاییدشده‌ی یک محصول (عمومی)
export async function getProductComments(productId: string): Promise<ProductComment[]> {
  const res = await api.get(`/comments/product/${productId}`);
  return res.data.data;
}

// ثبت نظر جدید - تا وقتی ادمین تاییدش نکنه توی لیست عمومی نشون داده نمی‌شه
export async function createComment(
  data: CreateCommentInput,
): Promise<ProductComment> {
  const res = await api.post("/comments", data);
  return res.data.data;
}
