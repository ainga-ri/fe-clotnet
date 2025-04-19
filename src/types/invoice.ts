export interface Invoice {
  invoice_number: number;
  invoice_date: string;
  service_description: string;
  address: string;
  month: string;
  price_per_hour: string;
  total_price: string;
  payment_condition: string;
  due_date: string;
  payment_method: string;
  account_number: string;
  iban: string;
  net_amount: string;
  vat: string;
  total_amount: string;
} 