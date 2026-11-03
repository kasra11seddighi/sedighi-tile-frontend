import api from "../../../api/axios";
import type {
  SendOtpPayload,
  SendOtpResponseData,
  VerifyOtpPayload,
  AuthResponse,
  AuthUser,
} from "../types/auth.types";

export const sendOtpRequest = async (
  payload: SendOtpPayload,
): Promise<SendOtpResponseData> => {
  const res = await api.post("/auth/send-otp", payload);
  return res.data.data;
};

export const verifyOtpRequest = async (
  payload: VerifyOtpPayload,
): Promise<AuthResponse> => {
  const res = await api.post("/auth/verify-otp", payload);
  return res.data.data;
};

export const getMeRequest = async (): Promise<AuthUser> => {
  const res = await api.get("/auth/me");
  return res.data.data;
};

// کوکی httpOnly رو سمت بک‌اند پاک می‌کنه؛ چون فرانت دیگه دسترسی مستقیم به
// توکن نداره، خروج از سیستم دیگه یه کار محلی (پاک‌کردن localStorage) نیست
// و حتماً باید از سرور خواسته بشه.
export const logoutRequest = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const updateProfileRequest = async (name: string): Promise<AuthUser> => {
  const res = await api.patch("/auth/me", { name });
  return res.data.data;
};
