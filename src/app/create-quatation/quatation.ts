import { QuatationProduct } from "../create-quatation/quatation.product";

export class Quatation {
    quat_id: number;
    quat_date = Date;
    quat_cust_name: string;
    quat_cust_address: string;
    quat_contact_person: string;
    quat_contact_no: string;
    quat_products: QuatationProduct[];

    constructor(id, date, customer, address, contact_person, contact, products){
        this.quat_id = id;
        this.quat_date = date;
        this.quat_cust_name = customer;
        this.quat_cust_address = address;
        this.quat_contact_person = contact_person;
        this.quat_contact_no = contact;
        this.quat_products = products;
    }
}