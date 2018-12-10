import { CardDetail } from './card-detail';

export class CardDetailResponse {

    public status: number;
    public message: string;
    public card_details: CardDetail[];
}