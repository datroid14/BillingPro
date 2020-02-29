import { Inventory } from '../dashboard/inventory';

export class InventoryResponse {

    public status: number;
    public message: string;
    public inventory: Inventory;
}