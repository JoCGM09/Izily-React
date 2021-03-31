import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    boton: {
      margin: "0px 5px",
      color: "#3493C2",
      fontWeight: "bold",
      height: "40px",
      fontSize: "12px",
    },
  }));

function FeedbackForm(props) {
    const classes = useStyles();

    const initialBody = {
      content: "",
      date: "",
      loginid: "",
      name: "",
      imageURL: "",
      idPerfil: "",
    };
  
    const [body, setBody] = useState(initialBody);
    const [profesor, setProfesor] = useState(null);
  
    const { usuarioActual } = useAuth();
    const history = useHistory();
  
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
  
    const handleInputChange = (text) => {
      if (text && profesor) {
        const { name, value } = text.target;
        setBody({
          ...body,
          [name]: value,
          name: profesor.nombre,
          loginid: profesor.loginid,
          date: new Date().toLocaleDateString(),
          imageURL: profesor.imageURL,
          idPerfil: profesor.id,
        });
      } else {
        console.log("error");
      }
    };
  
    const handleClick = async e => {
      e.preventDefault();
      await props.addFeedback(body);
      setBody({...initialBody});
      history.push('/acerca-de-izily');
      window.location.reload();
    }
    
  
    useEffect(() => {
      traerPerfil();
    }, []);
  
    return (
      <div>
        <CardContent align="center" className={classes.containerContent}>
          <input
            className={classes.inputText}
            type="text"
            name="content"
            aria-label="minimum height"
            placeholder="Escribir publicación..."
            widht="500px"
            rowsMin={1}
            onChange={handleInputChange}
            value={body.content}
          />
        </CardContent>
  
        <Grid container className={classes.IconosContainer}>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Button
              className={classes.PublicarButton}
              variant="outlined"
              size="small"
              onClick={handleClick}
            >
              Publicar
            </Button>
          </Grid>
        </Grid>
  
        <Button
          href="javascript:history.back()"
          className={classes.boton}
          variant="outlined"
          size="small"
        >
          Volver atrás
        </Button>
      </div>
    );
}

export default FeedbackForm
