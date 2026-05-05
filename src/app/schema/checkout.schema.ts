import { z } from "zod";

export type CheckoutForm = z.infer<typeof checkoutSchema>;

export const checkoutSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    shippingAddress: z.string().min(5, "Address is required"),
    paymentMethod: z.number().min(1).max(2),
    creditCard: z
      .object({
        cardNumber: z.string().min(1),
        expiryDate: z.string().min(1),
        cvc: z.string().min(1),
        cardHolderName: z.string().min(1),
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === 2) {
      if (!data.creditCard?.cardNumber?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number is required",
          path: ["creditCard", "cardNumber"],
        });
      } else if (!/^\d{16}$/.test(data.creditCard.cardNumber.replace(/\s/g, ""))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card number must be 16 digits",
          path: ["creditCard", "cardNumber"],
        });
      }

      if (!data.creditCard?.expiryDate?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Expiry date is required",
          path: ["creditCard", "expiryDate"],
        });
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.creditCard.expiryDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Invalid format, use MM/YY",
          path: ["creditCard", "expiryDate"],
        });
      }

      if (!data.creditCard?.cvc?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVC is required",
          path: ["creditCard", "cvc"],
        });
      } else if (!/^\d{3,4}$/.test(data.creditCard.cvc)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "CVC must be 3 or 4 digits",
          path: ["creditCard", "cvc"],
        });
      }

      if (!data.creditCard?.cardHolderName?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Card holder name is required",
          path: ["creditCard", "cardHolderName"],
        });
      }
    }
  });