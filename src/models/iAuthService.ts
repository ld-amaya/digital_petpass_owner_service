import { iDataDTO } from "./iDataDTO";

export interface iAuthService {
    config(): any;
    getUserID(email: string, callback: any): void
    register(data: iDataDTO, callback: any): void,
}