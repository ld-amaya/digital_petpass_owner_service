import { iDataDTO } from "../models/iDataDTO";
import { iUserIDDTO } from "../models/iUserIDDTO";
import authMysqlService from "../services/authMyqlServices";

class authController {
    private authServices;

    constructor() {
        this.authServices = new authMysqlService();
    }

    /**
     * Get the user if user exists then return the user id if not register the user then return the user id
     * @param data 
     * @param callback 
     */
    register(data: iDataDTO, callback: any): void
    {
        this.authServices.getUserID(data.email, (results: iUserIDDTO) => {
            if (results) {
                callback(results);
            } else {
                this.authServices.register(data, (results: iUserIDDTO) => {
                    if (results) {
                        callback(results);
                    }
                });
            }
        });
    }
}

export default authController;