import { Vendor } from '../add-vendor/Vendor';

export class VendorResponse {

    public status: number;
    public message: string;
    public vendors: Vendor[];
}