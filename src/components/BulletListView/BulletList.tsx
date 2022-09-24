import { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import Bullet from "../../models/bullets";
import BulletForm from "./BulletForm";


const BulletList = () => {

  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [str, setStr] = useState("");


  useEffect(() => {
    fetch('http://localhost:8080/bullets').then(response => response.json()).then(data => {
      data.forEach((d : any) => {
        setBullets(bullets => [...bullets, new Bullet().createBullet(d)])
      })
    });
  }, []);

  return (
    <div>
      {bullets.map(bullet => 
          <div key={bullet.id}>
            <h3>{bullet.title}</h3>
            {/* Status button, opens up to menu with other statuses */}
            {bullet.details}
            {/* drop down menu to view/update details. Other additional statuses, and move date */}
          </div>
        )
      }
      <BulletForm bullets={bullets} setBullets={setBullets}/>
      <button onClick={() => console.log(str)}>test</button>
    </div>
  )
}

export default BulletList;