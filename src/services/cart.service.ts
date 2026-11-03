import api from "../api/axios";

export interface CartProductRef {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  pricePerM2?: number;
  pricePerCarton?: number;
  piecesPerCarton?: number;
  m2PerCarton?: number;
  tileWidth?: number;
  tileHeight?: number;
  saleUnit?: "m2" | "carton" | "both";
}

export interface ApiCartItem {
  product: CartProductRef;
  quantity: number;
  saleUnit?: "m2" | "carton";
  requestedM2?: number;
  cartons?: number;
  actualM2?: number;
  unitPrice?: number;
  totalPrice?: number;
}

export interface ApiCart {
  _id: string;
  items: ApiCartItem[];
}

// برای محصول معمولی (بدون saleUnit)
export interface AddRegularItemPayload {
  productId: string;
  quantity?: number;
}

// برای محصول کاشی/سرامیک: خرید متری یا کارتنی
export interface AddTileItemPayload {
  productId: string;
  saleUnit: "m2" | "carton";
  requestedM2?: number;
  cartons?: number;
}

export type AddCartItemPayload = AddRegularItemPayload | AddTileItemPayload;

export const getCartRequest = async (): Promise<ApiCart> => {
  const res = await api.get("/cart");
  return res.data.data;
};

export const addCartItemRequest = async (
  payload: AddCartItemPayload,
): Promise<ApiCart> => {
  const res = await api.post("/cart", payload);
  return res.data.data;
};

export const updateCartItemRequest = async (
  productId: string,
  payload: Omit<AddCartItemPayload, "productId">,
): Promise<ApiCart> => {
  const res = await api.put(`/cart/${productId}`, payload);
  return res.data.data;
};

export const removeCartItemRequest = async (productId: string): Promise<ApiCart> => {
  const res = await api.delete(`/cart/${productId}`);
  return res.data.data;
};

export const clearCartRequest = async (): Promise<ApiCart> => {
  const res = await api.delete("/cart");
  return res.data.data;
};
