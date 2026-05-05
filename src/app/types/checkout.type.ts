export interface CreditCard {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardHolderName: string;
}

export type CheckoutRequest = {
  firstName: string;
  lastName: string;
  shippingAddress: string;
  paymentMethod: number;
  creditCard: CreditCard | null;
};