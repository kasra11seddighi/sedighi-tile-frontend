import { LogIn, User, Phone, Send } from "lucide-react";
import { FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
interface Props {
  onClose: () => void;
  authLink?: string;
  instagramLink?: string;
  telegramLink?: string;
  phoneLink?: string;
}

function MobileDrawerFooter({
  onClose,
  authLink = "/login",
  instagramLink,
  telegramLink,
  phoneLink,
}: Props) {
  const { isAuthenticated, user } = useAuth();
  const hasAnyContactLink = instagramLink || telegramLink || phoneLink;

  return (
    <div className="mt-auto border-t border-white/10 p-5">
      {/* دکمه ورود/ثبت‌نام یا پروفایل کاربر */}
      {isAuthenticated ? (
        <Link
          to="/profile"
          onClick={onClose}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#B56A3B]
            to-[#D08B59]
            px-4
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-[#B56A3B]/25
            transition
            duration-300
            hover:brightness-110
          "
        >
          <User size={18} />
          <span>{user?.name || "پروفایل من"}</span>
        </Link>
      ) : (
        <Link
          to={authLink}
          onClick={onClose}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#B56A3B]
            to-[#D08B59]
            px-4
            py-3.5
            font-bold
            text-white
            shadow-lg
            shadow-[#B56A3B]/25
            transition
            duration-300
            hover:brightness-110
          "
        >
          <LogIn size={18} />
          <span>ورود / ثبت‌نام</span>
        </Link>
      )}

      {/* شبکه‌های اجتماعی و تماس - فقط لینک‌هایی که واقعاً از تنظیمات سایت ست شدن نشون داده می‌شن */}
      {hasAnyContactLink && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {instagramLink && (
            <a
              href={instagramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="اینستاگرام"
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                bg-white/5
                py-3
                text-white/85
                transition
                duration-300
                hover:bg-white/10
                hover:text-[#D8B28B]
              "
            >
              <FaInstagramSquare size={18} />
            </a>
          )}

          {telegramLink && (
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              aria-label="تلگرام"
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                bg-white/5
                py-3
                text-white/85
                transition
                duration-300
                hover:bg-white/10
                hover:text-[#D8B28B]
              "
            >
              <Send size={18} />
            </a>
          )}

          {phoneLink && (
            <a
              href={phoneLink}
              aria-label="تماس با ما"
              className="
                flex
                items-center
                justify-center
                rounded-2xl
                bg-white/5
                py-3
                text-white/85
                transition
                duration-300
                hover:bg-white/10
                hover:text-[#D8B28B]
              "
            >
              <Phone size={18} />
            </a>
          )}
        </div>
      )}

      <p className="mt-4 text-center text-[11px] leading-5 text-white/35">
        پشتیبانی ۲۴ ساعته • ارسال سریع • ضمانت اصالت کالا
      </p>
    </div>
  );
}

export default MobileDrawerFooter;
