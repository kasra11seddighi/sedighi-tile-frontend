import { useState } from "react";
import { sendQuickSupportMessage } from "../services/support.service";
import type { QuickSupportValues } from "../types/support.types";

const initialValues: QuickSupportValues = {
  name: "",
  phone: "",
  message: "",
};

export function useQuickSupportForm() {
  const [values, setValues] = useState<QuickSupportValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(field: keyof QuickSupportValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await sendQuickSupportMessage(values);

      setSuccessMessage(res.message || "پیام شما ارسال شد؛ به‌زودی باهات تماس می‌گیریم.");
      setValues(initialValues);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "ارسال پیام با خطا مواجه شد. دوباره تلاش کنید.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function reset() {
    setValues(initialValues);
    setSuccessMessage("");
    setErrorMessage("");
  }

  return {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
    reset,
  };
}
