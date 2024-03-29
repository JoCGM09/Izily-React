// LogIn = Iniciar Sesión, los ids cambian a email-login y password-login 
import React, { useRef, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, useHistory } from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../contexts/AuthContext';
import fondo2 from "../assets/images/fondo2.png";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '50vh',
  },
  image: {
    backgroundImage: `url(${fondo2})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'left',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    style:"none",
  },
}));

export default function LogIn() {
  const classes = useStyles();

  const emailRef = useRef()
  const contraseñaRef = useRef()

  const { login } = useAuth()

  const [error, guardarError] = useState()
  const [carga, guardarCarga] = useState(false)

  const history = useHistory()


  async function handleSubmit(e) {
      e.preventDefault()

      try {
        guardarError('') 
        guardarCarga(true)
        await login(emailRef.current.value, contraseñaRef.current.value)
        history.push('/inicio')
        window.location.reload();
      } catch {
          guardarError('Ocurrió un error al iniciar sesión')
      }

      guardarCarga(false)
  } 

  return (
    <div style={{background:"#EEEFF0", height:"calc(100vh - 50px)"}}>
      <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false}  md={7} lg={7} className={classes.image} />
      <Grid item xs={12}  md={5} lg={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          {error && <Alert variant="filled" severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email-login"
              inputRef={emailRef}
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              inputRef={contraseñaRef}
              type="password"
              id="password-login"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mi cuenta"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={carga}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className={classes.link} to="/forgot-password" variant="body2">
                  Olvidé mi contraseña
                </Link>
              </Grid>
              <Grid item>
                <Link className={classes.link} to="/signup" variant="body2">
                  ¿Aún no tienes una cuenta? Regístrate
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
    </div>
    
  );
}