import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  sendOtpRequest,
  verifyOtpRequest,
  getMeRequest,
  logoutRequest,
} from "../components/Auth/services/auth.service";
import { getToken, setToken, clearToken } from "../utils/authToken";
import type {
  AuthUser,
  SendOtpPayload,
  SendOtpResponseData,
  VerifyOtpPayload,
} from "../components/Auth/types/auth.types";

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sendOtp: (payload: SendOtpPayload) => Promise<SendOtpResponseData>;
  verifyOtp: (payload: VerifyOtpPayload) => Promise<void>;
  updateUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // موقع بالا اومدن اپ: اگه توکنی توی localStorage نیست، کاربر مطمئناً
  // لاگین نیست و نیازی به زدن درخواست به سرور نداریم. اگه توکن هست، با
  // /auth/me اعتبارش رو چک می‌کنیم (اینترسپتور axios خودش هدر Authorization
  // رو از همون توکن می‌سازه) - اگه منقضی/نامعتبر بود، پاکش می‌کنیم.
  useEffect(() => {
    async function restoreSession() {
      const token = getToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const me = await getMeRequest();
        setUser(me);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  // فقط کد رو می‌فرسته؛ به وضعیت لاگین کاری نداره
  async function sendOtp(payload: SendOtpPayload) {
    return sendOtpRequest(payload);
  }

  // کد رو تایید می‌کنه؛ بک‌اند توکن رو توی بدنه‌ی پاسخ برمی‌گردونه، اینجا
  // توی localStorage ذخیرش می‌کنیم تا هم الان و هم بعد از رفرش/باز کردن
  // مجدد سایت، درخواست‌های بعدی باهاش احراز هویت بشن.
  async function verifyOtp(payload: VerifyOtpPayload) {
    const { user: verifiedUser, token } = await verifyOtpRequest(payload);
    setToken(token);
    setUser(verifiedUser);
  }

  // خروج از سیستم: کار اصلی پاک‌کردن توکن از localStorage‌ه، چون JWT
  // stateless سمت کلاینت نگه داشته می‌شه. به بک‌اند هم خبر می‌دیم (فعلاً
  // کار خاصی نمی‌کنه، ولی جای مناسبیه اگه بعداً بلک‌لیست توکن اضافه شد).
  // حتی اگه این ریکوئست fail بشه (مثلاً قطعی شبکه)، بازم state و توکن
  // محلی رو پاک می‌کنیم تا UI درست رفتار کنه.
  async function logout() {
    try {
      await logoutRequest();
    } finally {
      clearToken();
      setUser(null);
    }
  }

  // بعد از ویرایش موفق پروفایل (مثلاً تغییر نام)، نسخه‌ی توی state رو
  // به‌روز می‌کنیم تا همه‌جای اپ (هدر، پروفایل و...) بدون نیاز به رفرش
  // مقدار جدید رو ببینن
  function updateUser(updated: AuthUser) {
    setUser(updated);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        sendOtp,
        verifyOtp,
        updateUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth باید داخل AuthProvider استفاده شود");
  }
  return ctx;
}
