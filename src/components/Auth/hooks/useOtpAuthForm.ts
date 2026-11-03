import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const RESEND_COOLDOWN_SECONDS = 60;

type Step = "phone" | "otp";

function extractErrorMessage(err: unknown, fallback: string) {
  return (
    (err as { response?: { data?: { message?: string } } })?.response?.data
      ?.message || fallback
  );
}

export function useOtpAuthForm() {
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleSendOtp() {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setErrorMessage("شماره موبایل را وارد کنید.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      const data = await sendOtp({ phone: trimmedPhone });
      setIsNewUser(data.isNewUser);
      setCode("");
      setStep("otp");
      startCooldown();
    } catch (err) {
      setErrorMessage(
        extractErrorMessage(err, "ارسال کد با خطا مواجه شد. دوباره تلاش کنید."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    if (cooldown > 0 || isSubmitting) return;
    await handleSendOtp();
  }

  async function handleVerifyOtp() {
    const trimmedCode = code.trim();
    const trimmedName = name.trim();

    if (!trimmedCode) {
      setErrorMessage("کد تایید را وارد کنید.");
      return;
    }

    if (isNewUser && !trimmedName) {
      setErrorMessage("لطفاً نام خود را وارد کنید.");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await verifyOtp({
        phone: phone.trim(),
        code: trimmedCode,
        ...(isNewUser ? { name: trimmedName } : {}),
      });

      navigate("/");
    } catch (err) {
      setErrorMessage(extractErrorMessage(err, "کد وارد شده صحیح نیست."));
    } finally {
      setIsSubmitting(false);
    }
  }

  function editPhone() {
    setStep("phone");
    setCode("");
    setErrorMessage("");
    setCooldown(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  return {
    step,
    phone,
    code,
    name,
    isNewUser,
    isSubmitting,
    errorMessage,
    cooldown,
    setPhone,
    setCode,
    setName,
    handleSendOtp,
    handleVerifyOtp,
    handleResendOtp,
    editPhone,
  };
}
