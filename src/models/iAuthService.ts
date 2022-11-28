import { iDataDTO } from "./iDataDTO";

/**
 * Create an adapter for authservice
 */
export interface iAuthServiceAdapter {
    getUserID(email: string, callback: any): void;
    register(data: iDataDTO, callback: any): void;
}