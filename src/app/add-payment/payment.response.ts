import { Payment } from '../add-payment/payment';

export class PaymentResponse {

    public status: number;
    public message: string;
    public paymentDetails: Payment[];
    constructor(
    ){}
}