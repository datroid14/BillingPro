import { PurchaseProduct } from "../add-purchase/purchase.product";


export class PurchaseProductResponse {

    public status: number;
    public message: string;
    public products: PurchaseProduct[];
}