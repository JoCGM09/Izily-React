import React, { useState, useEffect } from "react";
import { db } from "../firebase";

import "./Cards.css";

function Cards() {
  const [values, setValues] = useState([]);

  const getData = () => {
    db.collection("profesores").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setValues(docs);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {values.map((value) => (
        <div className="card-container">
          <h1>{value.nombre}</h1>
          <h2>{value.curso}</h2>
          <button className="btn">Agendar reunión</button>
        </div>
      ))}
    </div>
  );
}

export default Cards;
