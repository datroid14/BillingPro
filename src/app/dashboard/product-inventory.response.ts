import { ProductInventory } from './product-inventory';

export class ProductInventoryResponse {

    public status: number;
    public message: string;
    public inventory: ProductInventory[];
}