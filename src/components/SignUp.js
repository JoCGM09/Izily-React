////////////////////////////////// SignUp = Registro ////////////////////////////////////
import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  
  const emailRef = useRef()
  const contraseñaRef = useRef()
  const confirmContraseñaRef = useRef()

  const { signup } = useAuth()

  const [error, guardarError] = useState()
  const [carga, guardarCarga] = useState(false)
  const [checked, setChecked] = useState(false)

  const history = useHistory()

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  async function handleSubmit(e) {
      e.preventDefault()

      if (contraseñaRef.current.value !== confirmContraseñaRef.current.value) {
          return guardarError('Las contraseñas no coinciden')
      }
      if (checked === false) {
          return guardarError('Esperamos que aceptes los términos y condiciones para crear una cuenta')
      }

      try {
        guardarError('') 
        guardarCarga(true)
        await signup(emailRef.current.value, contraseñaRef.current.value)
        history.push("/inicio")
      } catch {
          guardarError('Ocurrió un error al crear una cuenta')
      }

      guardarCarga(false)
  } 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        {error && <Alert variant="filled" severity="error">{error}</Alert>}
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                inputRef={contraseñaRef}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirm-password"
                label="Confirmar contraseña"
                inputRef={confirmContraseñaRef}
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} value="allowExtraEmails" color="primary" />}
                label="Acepto las políticas de conducta de la plataforma"
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
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}