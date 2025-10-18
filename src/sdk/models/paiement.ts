export interface PaiementCustomer {
  email: string;
  first_name: string;
  last_name: string;
}

export interface IPaiementRequest {
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  customer: PaiementCustomer;
}

export interface MonerooPaymentResponse {
  message: string;
  data: {
    id: string;
    checkout_url: string;
  };
}
