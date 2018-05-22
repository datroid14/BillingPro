import { Product } from '../add-product/product';

export class ProductResponse {

    public status: number;
    public message: string;
    public products: Product[];
    constructor(
    ){}
}