export interface Invoice {
  client_info: {
    displayed_title: string,
    client: string,
    street: string,
    zip_code_city: string,
    cif: string,
    description: string,
    description_street: string,
    total_price_description: string,
    net_price: string,
    vat21: string,
    total_price: string,
    condition: string,
    payment_method: string,
    account_number: string,
    iban: string
  },
  number: number,
  invoice_date: string,
  month: string,
  deadline: string
}