import { Vehicle } from '../add-vehicle/vehicle';

export class VehicleResponse {

    public status: number;
    public message: string;
    public vehicles: Vehicle[];
}