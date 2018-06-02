import { Invoice } from '../create-invoice/invoice';

export class InvoiceResponse {

    public status: number;
    public message: string;
    public invoices: Invoice[];
}