import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import { db } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 15,
    paddingBottom: 20,
  },
  message: {
    border: "1px solid #ccc",
    borderRadius: 8,
    padding: "0 20px",
  },
  box: {
    height: "100%",
    paddingLeft: 20,
  },
}));

const NewMessage = () => {
  const classes = useStyles();

  const [message, setMessage] = useState("");
  const [profesor, setProfesor] = useState(null);

  const { usuarioActual } = useAuth();

  //cuando se envia el mensaje
  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      /* user: currentUser.uid, */
      body: message,
      id: usuarioActual.uid,
    };

    db.collection("chat").add(newMessage);

    //traemos el perfil del usuario
    /* const traerPerfil = useCallback(() => {
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
      }, [setProfesor]); */

    //escribir el mensaje en la base de datos
  };

  return (
    <Paper square className={classes.paper}>
      <form>
        <Grid container spacing={0} direction="row" className={classes.message}>
          <Grid item xs={10}>
            <TextField
              margin="normal"
              name="message"
              required
              fullWidth
              id="message"
              label="Mensaje"
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Box display="flex" alignItems="center" className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<SendIcon />}
                fullWidth
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default NewMessage;
