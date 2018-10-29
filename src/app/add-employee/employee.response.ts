import { Employee } from './employee';

export class EmployeeResponse {

    public status: number;
    public message: string;
    public employees: Employee[];
}