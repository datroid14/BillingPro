import { Challan } from '../create-challan/challan';

export class ChallanResponse {

    public status: number;
    public message: string;
    public challans: Challan[];
}