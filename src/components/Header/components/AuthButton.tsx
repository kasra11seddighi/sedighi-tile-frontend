import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

function AuthButton() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <Link
        to="/profile"
        title={user?.name || "پروفایل من"}
        className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#101c2d] text-white transition hover:border-brand hover:text-brand"
      >
        <User size={20} />
      </Link>
    );
  }

  return (
    <Link
      to="/login"
      className="flex h-12 w-35 items-center justify-center rounded-xl border border-white/10 bg-[#101c2d] px-6 text-white transition hover:border-brand hover:text-brand"
    >
      ورود / ثبت‌نام
    </Link>
  );
}

export default AuthButton;
