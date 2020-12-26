import { PurchaseProduct } from "../add-purchase/purchase.product";

export class Purchase {
    pur_id: number;
    pur_date: Date;
    pur_invoice_no: string;
    pur_vend_id: number;
    pur_vend_name: string;
    pur_vend_address: string;
    pur_contact_person: string;
    pur_contact_no: string;
    pur_total_amount: number;
    pur_products: PurchaseProduct[];

    constructor(id, date, invoice_no, vendor, address, contact_person, contact, products){
        this.pur_id = id;
        this.pur_date = date;
        this.pur_invoice_no = invoice_no;
        this.pur_vend_name = vendor;
        this.pur_vend_address = address;
        this.pur_contact_person = contact_person;
        this.pur_contact_no = contact;
        this.pur_products = products;
    }
}