import { Invoice } from '../create-invoice/invoice';
import { Purchase } from '../add-purchase/purchase';

export class InvoiceResponse {

    public status: number;
    public message: string;
    public invoices: Invoice[];
    public purchases: Purchase[];
}