import { iDataDTO } from "../models/iDataDTO";
import dotenv from "dotenv";
import { iAuthService } from "../models/iAuthService";
import { iUserID } from "../models/iUserIDDTO";
import mysql from "mysql";

dotenv.config();

class authService implements iAuthService {
    private host: string | undefined;
    private user: string | undefined;
    private password: string | undefined;
    private database: string | undefined;

    constructor() {
        this.host = process.env.mysql_host ??= "";
        this.user = process.env.mysql_user ??= "";
        this.password = process.env.mysql_password ??= "";
        this.database = process.env.mysql_database ??= "";
    }
    
    /**
     * Create a mysql connection
     * @returns any
     */
    config(): any
    {
        return mysql.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }

    /**
     * Get the user id based on email and return a callback with the user id
     * @param email 
     * @param callback 
     */

    getUserID(email: string, callback: any): void
    {
        try {
            const con = this.config();
            con.connect();

            const sqlString = "SELECT id as user_id FROM owners WHERE email = ?";
            con.query(sqlString, [email], (err: any, results: iUserID[]) => {
                if (err) {
                    console.error("I have errors:", err);
                }
                callback(results[0]);
            });
            con.end();   
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Register user and return a callback with user_id
     * @param data
     * @param callback 
     */
    
    register(data: iDataDTO, callback: any): void
    {
        try {
            const con = this.config();
            con.connect();
            const sqlString = 'INSERT INTO owners (firstName, lastName, email, phone) VALUES (?,?,?,?)';
            con.query(sqlString, [data.firstName, data.lastName, data.email, data.phone], (err: any, result: any) => {
                if (err) {
                    console.log(err);
                }
                callback({ user_id: result.insertId });
            });
            con.end();
        } catch (err) {
            console.error(err);
        }
        
    }
}

export default authService;