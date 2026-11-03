import type { RoomExample } from "../types/roomVisualizer.types";

/**
 * نمونه فضاهای آماده برای تست سریع بدون آپلود عکس.
 * تصاویر placeholder هستند - در پروژه واقعی با آدرس تصاویر واقعی جایگزین شوند.
 */
export const mockExamples: RoomExample[] = [
  {
    id: "bathroom",
    title: "حمام",
    image: "https://placehold.co/300x300/e7dfd4/29251f?text=حمام",
  },
  {
    id: "kitchen",
    title: "آشپزخانه",
    image: "https://placehold.co/300x300/e7dfd4/29251f?text=آشپزخانه",
  },
  {
    id: "living-room",
    title: "پذیرایی",
    image: "https://placehold.co/300x300/e7dfd4/29251f?text=پذیرایی",
  },
];

// تصاویر دمو پیش‌فرض که قبل از آپلود کاربر نمایش داده می‌شوند
export const demoBeforeImage =
  "https://placehold.co/900x700/1a1f28/8a93a6?text=قبل";
export const demoAfterImage =
  "https://placehold.co/900x700/2a2f3a/f5f6f8?text=بعد+از+هوش+مصنوعی";
