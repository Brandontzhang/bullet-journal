import React, { useEffect, useState } from "react";


const Home = () => {

  const [bullets, setBullets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/bullets').then(response => response.json()).then(data => console.log(data));
  }, []);

  return (
    <div>
      Test
    </div>
  )
}

export default Home;