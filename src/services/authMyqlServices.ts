import { iDataDTO } from "../models/iDataDTO";
import dotenv from "dotenv";
import { iAuthServiceAdapter } from "../models/iAuthService";
import { iUserIDDTO } from "../models/iUserIDDTO";
import mysql, { Connection } from "mysql";

dotenv.config();

class authMysqlService implements iAuthServiceAdapter {
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
    private config(): Connection
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
            con.query(sqlString, [email], (err: any, results: iUserIDDTO[]) => {
                if (err) {
                    throw new Error(err);
                }
                callback(results[0]);
            });
            con.end();   
        } catch (err: any) {
            throw new Error(err);
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
            con.query(sqlString, [data.firstName, data.lastName, data.email, data.phone], (err: any, result: iUserIDDTO) => {
                if (err) {
                    throw new Error(err);
                }
                callback({ user_id: result.insertId });
            });
            con.end();
        } catch (err: any) {
            throw new Error(err);
        }   
    }
}

export default authMysqlService;