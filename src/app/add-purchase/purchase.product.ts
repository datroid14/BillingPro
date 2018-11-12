export class PurchaseProduct {
    pur_chal_id: number;
    pur_chal_date: string;
    pur_veh_no: string;
    pur_prod_id: number;
    pur_prod_name: string;
    pur_prod_hsn: string;
    pur_prod_unit: string;
    pur_prod_qty: number;
    pur_prod_rate: number;
    pur_prod_total: number;
  
    constructor(chalanNo, date, vehicle, prod_id, name, hsn, unit, qty, rate, total) {
      this.pur_chal_id = chalanNo;
      this.pur_chal_date = date;
      this.pur_veh_no = vehicle;
      this.pur_prod_id = prod_id;
      this.pur_prod_name = name;
      this.pur_prod_hsn = hsn;
      this.pur_prod_unit = unit;
      this.pur_prod_qty = qty;
      this.pur_prod_rate = rate;
      this.pur_prod_total = total;
    }
  }