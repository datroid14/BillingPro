import { InvoiceProduct } from '../create-invoice/invoice.product';

export class InvoiceProductResponse {

    public status: number;
    public message: string;
    public products: InvoiceProduct[];
    constructor(
    ){}
}