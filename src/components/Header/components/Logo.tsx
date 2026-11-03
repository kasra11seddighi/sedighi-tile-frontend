import { Link } from "react-router-dom";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

interface Props {
  title: string;
  subtitle: string;
  /** عکس لوگو (اختیاری) - اگه خالی باشه، دایره‌ی طلایی با حرف «ک» جایگزینش می‌شه */
  logoImage?: string;
}

function Logo({ title, subtitle, logoImage }: Props) {
  return (
    <Link
      to="/"
      className="flex flex-row-reverse items-center gap-2.5 md:gap-3.5 cursor-pointer select-none"
    >
      {/* لوگو: اگه عکس ست شده باشه همون نشون داده می‌شه، وگرنه دایره‌ی طلایی پیش‌فرض */}
      <div
        className="
        w-12 h-12 md:w-16 md:h-16
        shrink-0
        overflow-hidden
        rounded-full
        bg-gradient-to-br from-brand-gradient-from via-brand-gradient-via to-brand-gradient-to
        flex items-center justify-center
        text-white text-lg md:text-2xl font-black
        shadow-lg shadow-brand-gradient-via/30
        "
      >
        {logoImage ? (
          <img
            src={resolveImageUrl(logoImage)}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          "ک"
        )}
      </div>

      {/* متن لوگو */}
      <div className="flex min-w-0 flex-col  items-center justify-center">
        <h1
          className="
          whitespace-nowrap
          text-[13px] leading-snug
          sm:text-lg
          md:text-xl
          lg:text-2xl
          font-black
          text-[#D8B28B]
          "
        >
          {title}
        </h1>

        <p
          className="
          mt-1 md:mt-1.5
          whitespace-nowrap
          text-xs
          sm:text-sm
          md:text-base
          font-bold
          leading-none
          text-brand
          "
        >
          {subtitle}
        </p>
      </div>
    </Link>
  );
}

export default Logo;
