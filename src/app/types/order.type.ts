export interface OrderItem {
  orderItemId: number;
  productId: number;
  productName: string;
  productImage: string;
  brandName: string;

  variantId: number | null;
  size: string | null;
  color: string | null;

  quantity: number;
  unitPrice: number;
  customizationPrice: number;

  subtotal: number;

  customization: any | null;
}

export interface Order {
  orderId: number;
  userId: number;

  customerName: string;

  totalAmount: number;
  shippingCost: number;
  finalTotal: number;

  orderStatus: number;
  orderStatusText: string;

  shippingAddress: string;

  paymentMethod: number;
  paymentMethodText: string;

  paymentStatus: number;
  paymentStatusText: string;

  transactionId: string | null;
  trackingNumber: string | null;
  paymentMessage: string | null;

  createdAt: string;

  items: OrderItem[];
}

export type OrdersResponse = Order[];