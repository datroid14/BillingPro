import { Account } from './account';

export class AccountResponse {

    public status: number;
    public message: string;
    public account_details: Account[];
}