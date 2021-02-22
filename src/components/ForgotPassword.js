import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
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

export default function ForgotPassword() {
  const classes = useStyles();

  const emailRef = useRef();

  const { resetPassword } = useAuth();

  const [error, guardarError] = useState();
  const [mensaje, guardarMensaje] = useState("");
  const [carga, guardarCarga] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      guardarMensaje("") ; 
      guardarError("");
      guardarCarga(true);
      await resetPassword(emailRef.current.value)
      guardarMensaje('Revisa tu correo para próximas instrucciones')
    } catch {
      guardarError("Ocurrió un error al reiciar la contraseña");
    }

    guardarCarga(false);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reiniciar contraseña
        </Typography>
        {error && (
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        )}
        {mensaje && (
          <Alert variant="filled" severity="success">
            {mensaje}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                inputRef={emailRef}
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
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
            Reiniciar contraseña
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/login" variant="body2">
                Inicia sesión
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup" variant="body2">
                ¿Necesitas una cuenta? Regístrate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
