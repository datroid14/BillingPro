import { InvoiceProduct } from '../create-invoice/invoice.product';

export class Invoice {
    inv_id: number;
    inv_date: Date;
    inv_number: string;
    inv_customer: string;
    inv_address: string;
    inv_contact_person: string;
    inv_contact: string;
    inv_email: string;
    inv_total_amount: number;
    inv_gst_id: number;
    inv_products: InvoiceProduct[];

    constructor(id, date, inv_no, customer, address, contact_person, contact, email, amount, gst_id, products){
        this.inv_id = id;
        this.inv_date = date;
        this.inv_number = inv_no;
        this.inv_customer = customer;
        this.inv_address = address;
        this.inv_contact_person = contact_person;
        this.inv_contact = contact;
        this.inv_email = email;
        this.inv_total_amount = amount;
        this.inv_gst_id = gst_id;
        this.inv_products = products;
    }
}