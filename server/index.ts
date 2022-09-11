import express, { Express, Request, Response } from 'express';
import BulletController from './controllers/bulletController';
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config();

const app: Express = express();
const port = process.env.SERVERPORT;

// create application/json parser
var jsonParser = bodyParser.json();

// List of controllers
const controllers = [
  new BulletController(),
]

// Initializing all the routes within the controllers
controllers.forEach(controller => {
  app.use('/', jsonParser, controller.router);
})

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// app.get('/bullets', async (req: Request, res:Response) => {
//   res.send(await db.query('SELECT * FROM BULLETS'));
// })

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

