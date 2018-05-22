import { Customer } from '../add-customer/customer';

export class CustomerResponse {

    public status: number;
    public message: string;
    public customers: Customer[];
}