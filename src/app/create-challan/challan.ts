export class Challan {
    chal_id: number;
    chal_date: Date;
    chal_cust_name: string;
    chal_cust_address: string;
    chal_prod_name: string;
    chal_prod_unit: string;
    chal_prod_qty: number;
    chal_prod_rate: number;
    chal_veh_no: string;
    isChallanInUse: boolean;

    constructor(id, date, customer, address, prod_name, prod_unit, prod_qty, prod_rate, veh_no){
        this.chal_id = id;
        this.chal_date = date;
        this.chal_cust_name = customer;
        this.chal_cust_address = address;
        this.chal_prod_name = prod_name;
        this.chal_prod_unit = prod_unit;
        this.chal_prod_qty = prod_qty;
        this.chal_prod_rate = prod_rate;
        this.chal_veh_no = veh_no;
    }
}