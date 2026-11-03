import api from "../../../api/axios";
import type { ContactFormValues, Faq } from "../types/contact.types";

export async function sendContactMessage(values: ContactFormValues) {
  const response = await api.post("/contact-messages", values);
  return response.data;
}

export async function getFaqs(): Promise<Faq[]> {
  const response = await api.get("/faqs");
  return response.data.data;
}
