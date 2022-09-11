import { resolveSoa } from 'dns';
import { Request, Response, Router } from 'express';
import db from '../db';
import Bullet from '../models/bullets';

class BulletController {
  public path = "/bullets";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(this.path, this.getBullets);
    this.router.post(this.path, this.createBullet);
    // this.router.put(this.path, this.updateBullet);
  }

  // Creates a new bullet
  private async createBullet(req : Request, resp : Response) {
    let newBullet : Bullet = new Bullet().createBullet(req.body);
    try {
      await db.query(`INSERT INTO BULLETS (TITLE, DETAILS, DATE, STATUS) VALUES('${newBullet.title}','${newBullet.details}','${newBullet.date}', '${newBullet.status}')`);
      resp.sendStatus(200);
      return newBullet;
    } catch (e) {
      resp.send(e);
    }
  }

  // Queries the database for all bullets
  private async getBullets(req : Request, resp : Response) {
    let res = await db.query("SELECT * FROM BULLETS");
    resp.send(res);
  }
}

export default BulletController;