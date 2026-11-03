import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),

    babel({
      presets: [reactCompilerPreset()],
    }),

    tailwindcss(),
  ],

  // تنظیمات Vitest (اجرا با «npm run test» یا «npm run test:watch»).
  // چون Vitest از همون پایپ‌لاین Vite (پلاگین React، Tailwind و...) استفاده
  // می‌کنه، تنظیم جدا یا فایل کانفیگ اضافه لازم نیست — همین‌جا کافیه.
});
