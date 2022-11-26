import express, {Express, Request, Response} from 'express';
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import ProductsRouter from './routes/products/product.router';
import ClientRouter from './routes/clients/client.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 6500;
app.use(bodyParser.json())
app.use("/api/v1/products",ProductsRouter);
app.use("/api/v1/clients",ClientRouter);
app.listen(port , () =>{
    console.log(`[Server]: Server is running at http://localhost:${port}`);
})