export class Product {
    public prod_id: number;
    public prod_name: string;
    public prod_desc: string;
    public prod_unit: string;
    public prod_rate: number;
    constructor(id, name, desc, unit, rate) {
        this.prod_id = id;
        this.prod_name = name;
        this.prod_desc = desc;
        this.prod_unit = unit;
        this.prod_rate = rate;
    }
}