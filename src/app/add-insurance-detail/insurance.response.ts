import { Insurance } from "./insurance";

export class InsuranceResponse {

    public status: number;
    public message: string;
    public insurance_details: Insurance[];
}
