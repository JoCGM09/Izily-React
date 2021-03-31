import React, { useRef, useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Divider from "@material-ui/core/Divider";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert2(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(3),
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width:"300px",
    color: "#3493C2",
    fontWeight: "bold",
  },
  subContainer :{
    display:"flex",
    flexDirection:"row",
    margin:0,
    justifyContent:"center",
  },
  subSubContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
  },
  Input:{
    width:"400px",
    margin:"10px 0px",
  },
  cancelar:{
    margin:"0px 0px 20px 0px",
    fontSize:"15px",
    "&:hover":{
      textDecoration:"underline",
      cursor:"pointer",
    },
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function EditProfile() {
  const classes = useStyles();
  const emailRef = useRef();
  const contraseñaRef = useRef();
  const confirmContraseñaRef = useRef();
  const nombreRef = useRef();
  const aboutMeRef = useRef();
  const descriptionRef = useRef();
  const calendlyRef = useRef();
  const [open, setOpen] = React.useState(false);

  const { usuarioActual, updatePassword, updateEmail } = useAuth();
  const [error, guardarError] = useState();
  const [carga, guardarCarga] = useState(false);
  const [profesor, setProfesor] = useState(null);
  const history = useHistory();

  // Get current user with database values and set on useState

  const traerPerfil = useCallback(() => {
    if (usuarioActual) {
      const idd = usuarioActual.uid;
      const usuariosRef = db.collection("usuarios");
      usuariosRef
        .where("loginid", "==", idd)
        .get()
        .then((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          if (docs.length > 0) {
            setProfesor(docs[0]);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setProfesor]);

  //Functions to update individual values

  function updateName(name) {
    db.collection("usuarios").doc(`${profesor.id}`).update({
      nombre: name
    });
  }

  function updateAboutMe(presentation) {
    db.collection("usuarios").doc(`${profesor.id}`).update({
      presentacion: presentation
    });
  }

  function updateDescription(description) {
    db.collection("usuarios").doc(`${profesor.id}`).update({
      descripcion: description
    });
  }

  function updateCalendly(calendly) {
    db.collection("usuarios").doc(`${profesor.id}`).update({
      calendly: calendly
    });
  }

  // Get promises and execute the functions
  
  function handleSubmit(e) {
    e.preventDefault();

    if (contraseñaRef.current.value !== confirmContraseñaRef.current.value) {
      return guardarError("Las contraseñas no coinciden");
    }

    const promises = [];
    guardarCarga(true);
    guardarError("");

    if (emailRef.current.value !== usuarioActual.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (contraseñaRef.current.value) {
      promises.push(updatePassword(contraseñaRef.current.value));
    }
    if (nombreRef.current.value !== profesor.nombre) {
      promises.push(updateName(nombreRef.current.value));
    }
    if (aboutMeRef.current.value !== profesor.presentacion) {
      promises.push(updateAboutMe(aboutMeRef.current.value));
    }
    if (descriptionRef.current.value !== profesor.descripcion) {
      promises.push(updateDescription(descriptionRef.current.value));
    }
    if (calendlyRef.current.value !== profesor.calendly) {
      promises.push(updateCalendly(calendlyRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        setOpen(true);
      })
      .catch(() => {
        guardarError("Ocurrió un error al actualizar la cuenta");
      })
      .finally(() => {
        guardarCarga(false);
      });
  }

  useEffect(() => {
    traerPerfil();
  }, []);

  async function goInicio(){
    guardarError()
    try {
      history.push(`/inicio`);
      window.location.reload();
    } catch {
      guardarError("Ocurrió un error al salir de la cuenta");
    }
  }

  async function actualizar(){
    guardarError()
    try {
      window.location.reload();
    } catch {
      guardarError("Ocurrió un error al salir de la cuenta");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Container className={classes.container}>
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
        <Divider/>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Grid style={{marginTop:"-20px", width:"90%"}}>
            <Divider/>
          </Grid>
          <Grid container className={classes.subContainer} spacing={2}>
            <Grid item className={classes.subSubContainer}>
              {/* <Grid > */}
                <TextField
                  variant="outlined"
                  required
                  defaultValue={usuarioActual.email}
                  className={classes.Input}
                  id="email"
                  inputRef={emailRef}
                  label="Correo Electrónico"
                  name="email"
                  autoComplete="email"
                />
              {/* </Grid> */}
              {/* <Grid  > */}
                <TextField
                  variant="outlined"
                  className={classes.Input}
                  name="password"
                  label="Contraseña"
                  defaultValue={null}
                  inputRef={contraseñaRef}
                  placeholder="Dejar en blanco para mantener la contaseña"
                  type="password"
                  id="password"
                  //autoComplete="current-password"
                />
              {/* </Grid> */}
              {/* <Grid  > */}
                <TextField
                  variant="outlined"
                  className={classes.Input}
                  name="confirm-password"
                  label="Confirmar contraseña"
                  inputRef={confirmContraseñaRef}
                  placeholder="Dejar en blanco para mantener la contaseña"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                />
              {/* </Grid> */}
              {profesor && (
                // <Grid >
                  <TextField
                    variant="outlined"
                    className={classes.Input}
                    name="name"
                    label="Nombre y Apellido"
                    defaultValue={profesor.nombre}
                    inputRef={nombreRef}
                    id="rename"
                    autoComplete="current-name"
                  />
                // </Grid>
              )}
            </Grid>
            <Grid item className={classes.subSubContainer}>
              {profesor && (
                // <Grid >
                  <TextField
                    variant="outlined"
                    className={classes.Input}
                    name="description"
                    label="Descripción"
                    defaultValue={profesor.descripcion}
                    inputRef={descriptionRef}
                    id="description"
                    autoComplete="current-description"
                    multiline
                  />
                // </Grid>
              )}
              {profesor && (
                // <Grid >
                  <TextField
                    variant="outlined"
                    className={classes.Input}
                    name="aboutMe"
                    label="Acerca de mí"
                    defaultValue={profesor.presentacion}
                    inputRef={aboutMeRef}
                    id="aboutMe"
                    autoComplete="current-aboutMe"
                    multiline
                  />
                // </Grid>
              )}
              {profesor && (
                // <Grid >
                  <TextField
                    variant="outlined"
                    className={classes.Input}
                    name="calendly"
                    label="Link de Calendly"
                    defaultValue={profesor.calendly}
                    inputRef={calendlyRef}
                    id="calendly"
                    autoComplete="current-calendly"
                    multiline
                  />
                // </Grid>
              )}
            </Grid>

            
          </Grid>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              This is a success message!
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            variant="outlined"
            className={classes.submit}
            disabled={carga}
          >
            Guardar
          </Button>
          <Grid container justify="space-between" style={{width:"100%"}}>
          <p className={classes.cancelar} variante="link" onClick={actualizar}> Actualiza para visualizar los cambios</p>
          <p className={classes.cancelar} variante="link" onClick={goInicio}>Cancelar</p>
              
            
          </Grid>

          
        </form>
      </div>
    </Container>
  );
}
