import { Maintenance } from "./maintenance";

export class MaintenanceResponse {

    public status: number;
    public message: string;
    public maintenance_details: Maintenance[];
}