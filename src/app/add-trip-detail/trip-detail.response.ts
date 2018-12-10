import { TripDetail } from './trip-detail';

export class TripDetailResponse {

    public status: number;
    public message: string;
    public trip_details: TripDetail[];
}