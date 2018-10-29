import { DieselEntry } from '../add-diesel-entry/diesel-entry';

export class DieselEntryResponse {

    public status: number;
    public message: string;
    public dieselEntries: DieselEntry[];
}