import "./Home.css";
import Profesores from "../containers/Profesores";
import React, { useState } from "react"
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Home() {

  const [error, setError] = useState("")
  const { logout } = useAuth()
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
    </>
  );
}

export default Home;
