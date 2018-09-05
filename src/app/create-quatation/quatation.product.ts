export class QuatationProduct {
    prod_id: number;
    quat_id: number;
    prod_name: string;
    prod_hsn: number;
    prod_unit: string;
    prod_qty: number;
    prod_rate: number;

    constructor(quat_id, prod_id, name, hsn, unit, rate, qty) {
        this.quat_id = quat_id;
        this.prod_id = prod_id;
        this.prod_name = name;
        this.prod_hsn = hsn;
        this.prod_unit = unit;
        this.prod_qty = qty;
        this.prod_rate = rate;
    }
}