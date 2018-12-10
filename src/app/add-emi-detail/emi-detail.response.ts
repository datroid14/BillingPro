import { EmiDetail } from './emi-detail';

export class EmiDetailResponse {

    public status: number;
    public message: string;
    public emi_details: EmiDetail[];
}