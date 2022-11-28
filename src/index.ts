import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import { iDataDTO } from './models/iDataDTO';
import authController from './controllers/authController';
import { iUserID } from './models/iUserIDDTO';

dotenv.config();

const PORT = 8000;
const app = Express();

app.use(bodyParser.json());
app.use(cors());

/**
 * Provide user endpoint that returns the user id
 */
app.post("/register", async (req, res) => {
    const user: iDataDTO = req.body;
    const controller = new authController();
    await controller.register(user, (results: iUserID) => {
        res.send(results);    
    });
});

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});