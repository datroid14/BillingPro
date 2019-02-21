export class PurchaseProduct {
    pur_chal_no: number;
    pur_chal_date: string;
    pur_veh_no: string;
    prod_id: number;
    pur_prod_name: string;
    pur_prod_hsn: string;
    pur_prod_unit: string;
    pur_prod_qty: number;
    pur_prod_rate: number;
    pur_prod_subtotal: number;
    pur_prod_tax: number;
    pur_prod_total: number;
  
    constructor(chalanNo, date, vehicle, prod_id, name, hsn, unit, qty, rate, subtotal, tax, total) {
      this.pur_chal_no = chalanNo;
      this.pur_chal_date = date;
      this.pur_veh_no = vehicle;
      this.prod_id = prod_id;
      this.pur_prod_name = name;
      this.pur_prod_hsn = hsn;
      this.pur_prod_unit = unit;
      this.pur_prod_qty = qty;
      this.pur_prod_rate = rate;
      this.pur_prod_subtotal = subtotal;
      this.pur_prod_tax = tax;
      this.pur_prod_total = total;
    }
  }