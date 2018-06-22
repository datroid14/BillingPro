import { GST } from '../add-gst/gst';

export class GSTResponse {

    public status: number;
    public message: string;
    public gst_details: GST[];
}