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
    this.router.put(`${this.path}/:id`, this.updateBullet);
    this.router.delete(`${this.path}/:id`, this.deleteBullet);
  }

  // Creates a new bullet
  private async createBullet(req : Request, resp : Response) {
    let newBullet : Bullet = new Bullet().createBullet(req.body);
    try {
      await db.query(`INSERT INTO BULLETS (TITLE, DETAILS, DATE, STATUS) VALUES('${newBullet.title}','${newBullet.details}','${newBullet.date}', '${newBullet.status}')`);
      resp.send(newBullet);
    } catch (e) {
      resp.send(e);
    }
  }

  // Queries the database for all bullets
  private async getBullets(req : Request, resp : Response) {
    try {
      let res = await db.query("SELECT * FROM BULLETS");
      // resp.sendStatus(200);
      resp.send(res);
    } catch (e) {
      resp.send(e);
    }
  }

  // Update bullet
  private async updateBullet(req : Request, resp : Response) {
    try {
      let bulletId = req.params.id
      let updatedBullet = new Bullet().createBullet(req.body);
      await db.query(`UPDATE BULLETS SET TITLE='${updatedBullet.title}', DETAILS='${updatedBullet.details}',DATE='${updatedBullet.date}', STATUS='${updatedBullet.status}' WHERE ID=${bulletId}`);
      resp.sendStatus(200);
      return updatedBullet;
    } catch (e) {
      resp.send(e);
    }
  }

  // Delete bullet
  private async deleteBullet(req : Request, resp : Response) {
    try {
      let bulletId = req.params.id;
      console.log(bulletId);
      await db.query(`DELETE FROM BULLETS WHERE ID=${bulletId}`);
      resp.sendStatus(200);
      return bulletId;
    } catch (e) {
      resp.send(e);
    }
  }
}

export default BulletController;