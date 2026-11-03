import { useState } from "react";
import { sendContactMessage } from "../services/contact.service";
import type { ContactFormValues } from "../types/contact.types";

const initialValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const res = await sendContactMessage(values);

      setSuccessMessage(res.message || "پیام شما با موفقیت ارسال شد");
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

  return {
    values,
    isSubmitting,
    successMessage,
    errorMessage,
    handleChange,
    handleSubmit,
  };
}
