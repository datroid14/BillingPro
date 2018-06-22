export class InvoiceProduct {
    prod_id: number;
    prod_qty: number;
    inv_id: number;
    chal_id: number;
    chal_date: Date;
    veh_number: string;
    prod_name: string;
    prod_hsn: number;
    prod_unit: string;
    prod_rate: number;
    prod_total_amount: number;
  
    constructor(prod_id, chal_id, date, vehicle, name, hsn, unit, rate, qty, total) {
      this.prod_id = prod_id;
      this.prod_qty = qty;
      this.chal_id = chal_id;
      this.chal_date = date;
      this.veh_number = vehicle;
      this.prod_name = name;
      this.prod_hsn = hsn;
      this.prod_unit = unit;
      this.prod_rate = rate;
      this.prod_total_amount = total;
    }
}