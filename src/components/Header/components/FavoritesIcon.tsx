import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useFavorites } from "../../../context/FavoritesContext";

// آیکون علاقه‌مندی‌ها توی هدر؛ اگه کاربر لاگین نکرده باشه به صفحه‌ی ورود
// می‌ره (مشابه رفتار قلب روی کارت محصولات)، وگرنه مستقیم به تب
// «علاقه‌مندی‌ها»ی پروفایل.
function FavoritesIcon() {
  const { isAuthenticated } = useAuth();
  const { favorites } = useFavorites();

  const count = isAuthenticated ? favorites.length : 0;

  return (
    <Link
      to={isAuthenticated ? "/profile?tab=favorites" : "/login"}
      aria-label={`علاقه‌مندی‌ها${count ? `، ${count} محصول` : ""}`}
      className="
        relative
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-white/10
        bg-[#101c2d]
        text-white
        transition
        hover:border-brand
        hover:text-brand
        sm:h-12
        sm:w-12
      "
    >
      <Heart size={19} />

      {count > 0 && (
        <span
          className="
            absolute
            -right-1.5
            -top-1.5
            flex
            h-5
            min-w-5
            items-center
            justify-center
            rounded-full
            bg-white
            px-1
            text-[10px]
            font-bold
            text-[#B56A3B]
            shadow-md
            sm:-right-2
            sm:-top-2
            sm:h-6
            sm:min-w-6
            sm:text-xs
          "
        >
          {count}
        </span>
      )}
    </Link>
  );
}

export default FavoritesIcon;
