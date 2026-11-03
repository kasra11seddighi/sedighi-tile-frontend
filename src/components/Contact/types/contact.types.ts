export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface Faq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}
