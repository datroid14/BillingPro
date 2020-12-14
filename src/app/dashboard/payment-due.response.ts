import { PaymentDue } from './payment_due';
import { ProductInventory } from './product-inventory';

export class PaymentDueResponse {

    public status: number;
    public message: string;
    public payment_due: PaymentDue[];
}