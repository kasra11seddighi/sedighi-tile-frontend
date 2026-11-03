import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  getCartRequest,
  addCartItemRequest,
  updateCartItemRequest,
  removeCartItemRequest,
  clearCartRequest,
  type ApiCart,
  type ApiCartItem,
  type AddCartItemPayload,
} from "../services/cart.service";

interface CartContextValue {
  items: ApiCartItem[];
  isLoading: boolean;
  totalCount: number;
  totalPrice: number;
  /** برای محصول معمولی: {productId, quantity?} — برای محصول کاشی/سرامیک: {productId, saleUnit, requestedM2 یا cartons} */
  addToCart: (payload: AddCartItemPayload) => Promise<void>;
  updateItem: (
    productId: string,
    payload: Omit<AddCartItemPayload, "productId">,
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function itemLinePrice(item: ApiCartItem): number {
  // برای آیتم‌های متری/کارتنی، قیمت نهایی از قبل توسط بک‌اند محاسبه و ذخیره شده
  if (item.totalPrice != null) return item.totalPrice;

  // برای محصول معمولی، قیمت رو از روی محصول (تخفیف‌خورده اگه داشته باشه) حساب می‌کنیم
  const unit =
    item.product.discountPrice && item.product.discountPrice > 0
      ? item.product.discountPrice
      : item.product.price;
  return unit * item.quantity;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<ApiCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    try {
      setIsLoading(true);
      const data = await getCartRequest();
      setCart(data);
    } catch {
      // اگه گرفتن سبد خطا داد، فقط خالی نشونش می‌دیم؛ نیازی به توقف بقیه‌ی اپ نیست
      setCart(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // با تغییر وضعیت لاگین (ورود/خروج/رفرش)، سبد واقعی رو از سرور می‌گیریم
  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addToCart(payload: AddCartItemPayload) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const data = await addCartItemRequest(payload);
    setCart(data);
  }

  async function updateItem(
    productId: string,
    payload: Omit<AddCartItemPayload, "productId">,
  ) {
    const data = await updateCartItemRequest(productId, payload);
    setCart(data);
  }

  async function removeFromCart(productId: string) {
    const data = await removeCartItemRequest(productId);
    setCart(data);
  }

  async function clearCart() {
    const data = await clearCartRequest();
    setCart(data);
  }

  function isInCart(productId: string) {
    return (cart?.items ?? []).some((item) => item.product._id === productId);
  }

  const items = cart?.items ?? [];
  const totalCount = items.length;
  const totalPrice = items.reduce((sum, item) => sum + itemLinePrice(item), 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isLoading,
        totalCount,
        totalPrice,
        addToCart,
        updateItem,
        removeFromCart,
        clearCart,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart باید داخل CartProvider استفاده شود");
  }
  return ctx;
}
