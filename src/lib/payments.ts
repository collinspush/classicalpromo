import type { Currency } from "@/lib/site";

export type CheckoutInput = {
  amount: number;
  currency: Currency;
  reference: string;
  email: string;
  description: string;
};

export type CheckoutResult = {
  provider: string;
  reference: string;
  status: "PENDING" | "SUCCESSFUL" | "FAILED";
  checkoutUrl: string | null;
  message: string;
};

export interface PaymentProvider {
  id: string;
  label: string;
  configured: boolean;
  createCheckout(input: CheckoutInput): Promise<CheckoutResult>;
}

const paystack: PaymentProvider = {
  id: "paystack",
  label: "Paystack",
  configured: Boolean(process.env.PAYSTACK_SECRET_KEY),
  async createCheckout(input) {
    return {
      provider: "paystack",
      reference: input.reference,
      status: "PENDING",
      checkoutUrl: null,
      message: "Paystack is configured on the server. Connect the transaction initialisation call before going live.",
    };
  },
};

const stripe: PaymentProvider = {
  id: "stripe",
  label: "Stripe",
  configured: Boolean(process.env.STRIPE_SECRET_KEY),
  async createCheckout(input) {
    return {
      provider: "stripe",
      reference: input.reference,
      status: "PENDING",
      checkoutUrl: null,
      message: "Stripe is configured on the server. Connect Checkout Sessions before going live.",
    };
  },
};

const bank: PaymentProvider = {
  id: "bank_transfer",
  label: "Bank transfer",
  configured: true,
  async createCheckout(input) {
    return {
      provider: "bank_transfer",
      reference: input.reference,
      status: "PENDING",
      checkoutUrl: null,
      message: "Invoice created. Payment stays pending until ClassicalPromo confirms the transfer.",
    };
  },
};

export function listProviders() {
  return [paystack, stripe, bank].map(({ id, label, configured }) => ({ id, label, configured }));
}

export function getProvider(id: string) {
  return [paystack, stripe, bank].find((provider) => provider.id === id) ?? null;
}
