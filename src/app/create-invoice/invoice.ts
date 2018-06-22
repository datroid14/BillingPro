import { InvoiceProduct } from "./invoice.product";

export class Invoice {
    private inv_id: number;
    private inv_date: Date;
    private inv_cust_name: string;
    private inv_cust_address: string;
    private inv_contact_person: string;
    private inv_contact_no: string;
    private inv_total_amount: number;
    private inv_products: InvoiceProduct[];

    constructor(id, date, name, address, contact_person, contact, total, products) {
        this.inv_id = id;
        this.inv_date = date;
        this.inv_cust_name = name;
        this.inv_cust_address = address;;
        this.inv_contact_person = contact_person;
        this.inv_contact_no = contact;
        this.inv_total_amount = total;
        this.inv_products = products;
    }
}