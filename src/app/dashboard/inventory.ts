
import { Invoice } from '../create-invoice/invoice';
import { Purchase } from '../add-purchase/purchase';
import { Maintenance } from '../add-maintenance-detail/maintenance';
import { DieselEntry } from '../add-diesel-entry/diesel-entry';
import { EmiDetail } from '../add-emi-detail/emi-detail';
import { Insurance } from '../add-insurance-detail/insurance';
import { TripDetail } from '../add-trip-detail/trip-detail';
import { CardDetail } from '../add-card-detail/card-detail';

export class Inventory {

    public invoices: Invoice[];
    public purchases: Purchase[];
    public maintenance_details: Maintenance[];
    public diesel_entries: DieselEntry[];
    public emi_details: EmiDetail[];
    public insurance_details: Insurance[];
    public trip_details: TripDetail[];
    public card_details: CardDetail[];
}