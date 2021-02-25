////////////////////////////////// SignUp = Registro /////////////////////////////////////////

import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditProfile() {
  const classes = useStyles();

  const emailRef = useRef();
  const contraseñaRef = useRef();
  const confirmContraseñaRef = useRef();

  const { usuarioActual, updatePassword, updateEmail } = useAuth();

  const [error, guardarError] = useState();
  const [carga, guardarCarga] = useState(false);

  const history = useHistory();
  
  function handleSubmit(e) {
    e.preventDefault();

    if (contraseñaRef.current.value !== confirmContraseñaRef.current.value) {
      return guardarError("Las contraseñas no coinciden");
    }

    const promises = []
    guardarCarga(true);
    guardarError("");

    if(emailRef.current.value !== usuarioActual.email){
      promises.push(updateEmail(emailRef.current.value))
    }
    if(contraseñaRef.current.value){
      promises.push(updatePassword(contraseñaRef.current.value))
    }

    Promise.all(promises).then(()=>{
      history.push('/inicio')
    }).catch(()=>{
      guardarError('Ocurrió un error al actualizar la cuenta')
    }).finally(()=>{
      guardarCarga(false)
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Editar perfil
        </Typography>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                defaultValue={usuarioActual.email}
                fullWidth
                id="email"
                inputRef={emailRef}
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Contraseña"
                inputRef={contraseñaRef}
                placeholder="Dejar en blanco para mantener la contaseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="confirm-password"
                label="Confirmar contraseña"
                inputRef={confirmContraseñaRef}
                placeholder="Dejar en blanco para mantener la contaseña"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={carga}
          >
            Actualizar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/inicio" variant="body2">
                Cancelar
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
