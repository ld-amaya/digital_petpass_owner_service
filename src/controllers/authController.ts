import { iDataDTO } from "../models/iDataDTO";
import { iUserID } from "../models/iUserIDDTO";
import authService from "../services/authServices";

class authController {
    private authServices;

    constructor() {
        this.authServices = new authService();
    }

    /**
     * Get the user if user exists then return the user id if not register the user then return the user id
     * @param data 
     * @param callback 
     */
    register(data: iDataDTO, callback: any): void
    {
        this.authServices.getUserID(data.email, (results: iUserID) => {
            if (results) {
                callback(results);
            } else {
                this.authServices.register(data, (results: iUserID) => {
                    if (results) {
                        callback(results);
                    }
                });
            }
        });
    }
}

export default authController;