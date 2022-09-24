import Status from "./status";

class Bullet {
  id: string;
  title?: string;
  details?: string;
  date: Date;
  status? : string;

  constructor() {
    this.id = '-1';
    this.title = "";
    this.details = "";
    this.date = new Date();
    this.status = Status.bullet;
  }
  
  createBullet = (obj : any) : Bullet => {
    this.id = obj.id;
    this.title = obj.title;
    this.details = obj.details;
    this.date = obj.date;
    this.status = this.getStatus(obj.status);

    return this;
  }

  getStatus = (s : string) : Status => {
    switch (s) {
      case "bullet":
      case "complete":
        return Status.complete;
      case "migrate":
        return Status.migrate;
      case "note":
        return Status.note;
      case "cancelled":
        return Status.cancelled;
      case "star":
        return Status.star;
      default:
        return Status.bullet;
    }
  }
}

export default Bullet;