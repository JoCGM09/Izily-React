import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";

function Perfil() {
  const { profesorId } = useParams();
  const [profesor, setProfesor] = useState(null);

  const traerProfesor = async () => {
    const cityRef = db.collection("usuarios").doc(profesorId);
    const doc = await cityRef.get();
    if (doc.exists) {
      setProfesor({ ...doc.data(), id: doc.id });
    }
  };

  useEffect(() => {
    traerProfesor();
  }, []);

  return (
    <>
      {profesor && (
        <div>
          <h1>Hola este es el perfil</h1>
          <h1>Hola este es el perfil</h1>
          <h1>{profesor.nombre}</h1>
          <h1>{profesor.email}</h1>
          <h1>{profesor.presentacion}</h1>
        </div>
      )}
      {!profesor && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}
    </>
  );
}

export default Perfil;
