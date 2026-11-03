export interface Testimonial {
  _id: string;
  name: string;
  // مثلاً «معمار» یا نام شهر/محله؛ اختیاریه چون ممکنه ادمین چیزی وارد نکنه
  role?: string;
  avatar?: string;
  rating: number; // ۱ تا ۵
  comment: string;
  createdAt: string;
}
