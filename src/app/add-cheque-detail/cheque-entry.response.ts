import { ChequeEntry } from '../add-cheque-detail/cheque-entry';

export class ChequeEntryResponse {

    public status: number;
    public message: string;
    public chequeEntries: ChequeEntry[];
}