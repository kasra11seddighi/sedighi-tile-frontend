export interface SendOtpPayload {
  phone: string;
}

export interface SendOtpResponseData {
  message: string;
  isNewUser: boolean;
  expiresInSeconds: number;
}

export interface VerifyOtpPayload {
  phone: string;
  code: string;
  name?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  phone: string;
  role: string;
}

// بک‌اند توکن JWT رو مستقیم توی بدنه‌ی پاسخ برمی‌گردونه (نه کوکی)؛ فرانت
// همینو توی localStorage نگه می‌داره (src/utils/authToken.ts).
export interface AuthResponse {
  user: AuthUser;
  token: string;
}
