import { Purchase } from '../add-purchase/purchase';

export class PurchaseResponse {

    public status: number;
    public message: string;
    public purchases: Purchase[];
}