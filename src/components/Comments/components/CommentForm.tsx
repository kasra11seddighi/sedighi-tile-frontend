import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, CheckCircle2, AlertCircle, Star, LogIn } from "lucide-react";
import { createComment } from "../services/comments.service";
import { useAuth } from "../../../context/AuthContext";

interface Props {
  productId: string;
}

export default function CommentForm({ productId }: Props) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    // کاربر مهمون اجازه‌ی ثبت نظر نداره؛ به‌جای زدن درخواست ناموفق به سرور،
    // مستقیم می‌فرستیمش صفحه‌ی ورود
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    if (!name.trim() || !text.trim()) {
      setErrorMessage("لطفاً نام و متن نظر رو تکمیل کن.");
      return;
    }

    try {
      setIsSubmitting(true);
      await createComment({
        product: productId,
        name: name.trim(),
        email: email.trim() || undefined,
        text: text.trim(),
        rating: rating || undefined,
      });

      setSuccessMessage("نظر شما ثبت شد و پس از تایید نمایش داده می‌شود.");
      setName("");
      setEmail("");
      setText("");
      setRating(0);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "ثبت نظر با خطا مواجه شد. دوباره تلاش کن.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center sm:p-8">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-gradient-from/20 to-brand-gradient-to/20 text-brand-light">
          <LogIn size={18} />
        </span>
        <h3 className="text-sm font-bold text-white">ثبت نظر شما</h3>
        <p className="max-w-sm text-xs leading-6 text-white/40">
          برای ثبت نظر باید وارد حساب کاربری‌ات بشی.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-2.5 text-xs font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98]"
        >
          ورود / ثبت‌نام
          <LogIn size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
      <h3 className="text-sm font-bold text-white">ثبت نظر شما</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="mt-4 space-y-3"
      >
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => {
            const value = index + 1;
            const filled = value <= (hoverRating || rating);
            return (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`امتیاز ${value} از ۵`}
                className="p-0.5"
              >
                <Star
                  size={20}
                  className={filled ? "fill-brand-light text-brand-light" : "text-white/20"}
                />
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            required
            placeholder="نام شما"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
          />
          <input
            type="email"
            placeholder="ایمیل (اختیاری)"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-right text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
          />
        </div>

        <textarea
          required
          rows={3}
          placeholder="نظر شما درباره‌ی این محصول..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-brand/50"
        />

        {successMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-300">
            <CheckCircle2 size={15} />
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
            <AlertCircle size={15} />
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to px-6 py-2.5 text-xs font-bold text-[#07111f] transition-all hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "در حال ارسال..." : "ثبت نظر"}
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
