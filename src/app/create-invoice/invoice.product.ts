export class InvoiceProduct {
    prod_id: number;
    prod_qty: number;
    inv_id: number;
    chal_id: number;
    chal_no: number;
    chal_date: string;
    veh_number: string;
    prod_name: string;
    prod_gst_id:number;
    prod_hsn: number;
    prod_percentage: number;
    prod_unit: string;
    prod_rate: number;
    prod_sub_total: number;
    prod_tax: number;
    prod_total_amount: number;
  
    constructor(prod_id, chal_id, chal_no, date, vehicle, name, gst_id, hsn, unit, rate, qty, subTotal, tax, total) {
      this.prod_id = prod_id;
      this.prod_qty = qty;
      this.chal_id = chal_id;
      this.chal_no = chal_no;
      this.chal_date = date;
      this.veh_number = vehicle;
      this.prod_name = name;
      this.prod_gst_id = gst_id;
      this.prod_hsn = hsn;
      this.prod_unit = unit;
      this.prod_rate = rate;
      this.prod_sub_total = subTotal;
      this.prod_tax = tax;
      this.prod_total_amount = total;
    }
}