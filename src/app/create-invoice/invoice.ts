import { InvoiceProduct } from "../create-invoice/invoice.product";

export class Invoice {
    inv_id: number;
    inv_date: Date;
    inv_customer: string;
    inv_address: string;
    inv_contact_person: string;
    inv_contact: string;
    inv_total_amount: number;
    inv_products: InvoiceProduct[];

    constructor(id, date, customer, address, contact_person, contact, amount, products){
        this.inv_id = id;
        this.inv_date = date;
        this.inv_customer = customer;
        this.inv_address = address;
        this.inv_contact_person = contact_person;
        this.inv_contact = contact;
        this.inv_total_amount = amount;
        this.inv_date = date;
        this.inv_products = products;
    }
}