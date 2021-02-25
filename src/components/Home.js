import "./Home.css";
import Profesores from "../containers/Profesores";
import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '@material-ui/core/Button';


function Home() {

  const [error, setError] = useState("")
  const { usuarioActual, logout } = useAuth()
  const history = useHistory()


  async function handleLogOut(){
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Ocurrió un error al salir de la cuenta')
    }

  }

  return (
    <>
      {error && <Alert variant="filled" severity="error">{error}</Alert>}
      <Profesores />
      {/* <div>
        <Button variant="link" onClick={handleLogOut}> Cerrar sesión </Button>
        <Button variant="link" href="/edit-profile"> Editar perfil </Button>
        <div>{usuarioActual.email}</div>
      </div> */}
    </>
  );
}

export default Home;
