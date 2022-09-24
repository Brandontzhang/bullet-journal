import React, { useEffect, useState } from "react"
import DatePicker from "react-date-picker";
import Bullet from "../../models/bullets";

const BulletForm = (props : any) => {

  const [newTask, setNewTask] = useState<string>("");
  const [newDate, setNewDate] = useState(new Date());
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
  }, []);

  const handleSubmit = (event : any) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newTask,
        details: newDescription,
        date: newDate
      })
    };
    fetch('http://localhost:8080/bullets', requestOptions)
        .then(response => response.json())
        .then(data => {
          let newBullet : Bullet = new Bullet().createBullet(data);
          newBullet.id = `bullet${props.bullets.length}`
          props.setBullets([...props.bullets, newBullet])
        });
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <DatePicker value={newDate} onChange={setNewDate} />
        </label>
        <label>
          New task:
          <input type="text" name="newTask" value={newTask} onChange={event => setNewTask(event.target.value)} />
        </label>
        <label>
          Description:
          <textarea value={newDescription} onChange={event => setNewDescription(event.target.value)} />
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </React.Fragment>
  )
}

export default BulletForm