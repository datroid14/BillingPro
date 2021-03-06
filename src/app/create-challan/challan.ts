export class Challan {
    chal_id: number;
    chal_date: Date;
    chal_cust_name: string;
    chal_cust_address: string;
    prod_name: string;
    prod_unit: string;
    chal_prod_qty: number;
    chal_prod_rate: number;
    veh_number: string;
    isChallanInUse: boolean;

    constructor(id, date, customer, address, prod_name, prod_unit, prod_qty, prod_rate, veh_no){
        this.chal_id = id;
        this.chal_date = date;
        this.chal_cust_name = customer;
        this.chal_cust_address = address;
        this.prod_name = prod_name;
        this.prod_unit = prod_unit;
        this.chal_prod_qty = prod_qty;
        this.chal_prod_rate = prod_rate;
        this.veh_number = veh_no;
    }
}