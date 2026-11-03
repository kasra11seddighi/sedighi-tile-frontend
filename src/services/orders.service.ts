import api from "../api/axios";

export interface ShippingAddressPayload {
  fullName: string;
  phone: string;
  // شماره‌ی ثابت اختیاریه
  landlinePhone?: string;
  address: string;
  city: string;
  postalCode: string;
}

export type PaymentMethod = "cod" | "online";
export type PaymentStatus = "unpaid" | "paid";

export interface ApiOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  saleUnit?: "m2" | "carton";
  requestedM2?: number;
  cartons?: number;
  actualM2?: number;
}

export interface ApiOrder {
  _id: string;
  items: ApiOrderItem[];
  totalAmount: number;
  shippingAddress: ShippingAddressPayload;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

// بک‌اند خودش قیمت/موجودی رو از روی سبد فعلی کاربر (سمت سرور) محاسبه می‌کنه؛
// از سمت فرانت فقط آدرس ارسال و روش پرداخت لازمه.
export const createOrderRequest = async (
  shippingAddress: ShippingAddressPayload,
  paymentMethod: PaymentMethod,
): Promise<ApiOrder> => {
  const res = await api.post("/orders", { shippingAddress, paymentMethod });
  return res.data.data;
};

export const getMyOrdersRequest = async (): Promise<ApiOrder[]> => {
  const res = await api.get("/orders/my-orders");
  return res.data.data;
};

// فقط تا وقتی سفارش «در انتظار بررسی»ه قابل لغوعه؛ بعدش بک‌اند خطای واضح می‌ده
export const cancelMyOrderRequest = async (orderId: string): Promise<ApiOrder> => {
  const res = await api.put(`/orders/${orderId}/cancel`);
  return res.data.data;
};

export const getOrderRequest = async (orderId: string): Promise<ApiOrder> => {
  const res = await api.get(`/orders/${orderId}`);
  return res.data.data;
};

// شروع پرداخت آنلاین. تا وقتی درگاه زرین‌پال سمت بک‌اند فعال نشده (merchant id
// خالیه)، این درخواست با خطای ۵۰۳ و پیام روشن fail می‌شه — نه کرش.
export const payOrderRequest = async (
  orderId: string,
): Promise<{ paymentUrl: string }> => {
  const res = await api.post(`/orders/${orderId}/pay`);
  return res.data.data;
};

export const verifyOrderPaymentRequest = async (
  orderId: string,
  authority: string,
): Promise<{ isSuccessful: boolean; order: ApiOrder }> => {
  const res = await api.get(`/orders/${orderId}/verify`, {
    params: { Authority: authority },
  });
  return res.data.data;
};
