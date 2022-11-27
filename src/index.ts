import Express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

const PORT = 8000;
const app = Express();

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
})


