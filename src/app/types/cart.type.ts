export interface CartItem {
  cartItemId: number;
  productId: number;
  productName: string;
  productImage: string;
  brandName: string;

  variantId: number | null;
  size: string | null;
  color: string | null;

  unitPrice: number;
  quantity: number;

  hasCustomization: boolean;
  customizationPrice: number;
  subtotal: number;

  customization: any | null;
}

export interface CartResponse {
  items: CartItem[];
  totalItems: number;
  subTotal: number;
  customizationTotal: number;
  total: number;
}

export interface CartState extends CartResponse {
  isLoading: boolean;
  error: string | null;
}

export interface AddToCartRequest {
  productId: number;
  variantId?: number;
  quantity: number;
  customization?: {
    zone: number;
    techniqueId: number;
    designImageUrl: string;
    designText: string;
  } | null;
}