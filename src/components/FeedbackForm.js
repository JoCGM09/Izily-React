import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "450px",
    margin: "10px 0px",
    paddingBottom: "5px",
  },
  containerContent: {
    padding: "0px 10px",
    widht: "100%",
    display: "flex",
    justifyContent: "center",
  },
  IconosContainer: {
    paddingLeft: "5px",
    paddingTop: "5px",
    justifyContent: "space-between",
  },
  PublicarButton: {
    margin: "5px 5px 0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "30px",
    fontSize: "12px",
    border: "0px",
    "&:hover": {
      backgroundColor: "white",
    },
  },
  inputText: {
    outline: "none",
    resize: "inherit",
    fontSize: "14px",
    fontFamily: "arial",
    border: "1px solid #C7C6C6",
    borderRadius: "10px",
    width: "100%",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 1)",
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

  const handleClick = async (e) => {
    e.preventDefault();
    await props.addFeedback(body);
    setBody({ ...initialBody });
    history.push("/califica-a-izily");
    window.location.reload();
  };

  useEffect(() => {
    traerPerfil();
  }, []);

  function validarInput() {
    document.getElementById("btn_Validar").disabled = !document.getElementById(
      "content"
    ).value.length;
  }

  return (
    <Card style={{ fontFamily: "Roboto" }} className={classes.root}>
      <p
        style={{
          display: "flex",
          justifyContent: "left",
          paddingLeft: "12px",
          fontSize: "16px",
          margin: "10px 0px",
        }}
      >
        Envíanos tu opinión para seguir mejorando
      </p>

      <CardContent align="center" className={classes.containerContent}>
        <input
          className={classes.inputText}
          variant="outline"
          type="text"
          name="content"
          id="content"
          aria-label="minimum height"
          placeholder="¿Qué opinas de Izily?"
          rowsMin={1}
          onChange={handleInputChange}
          value={body.content}
          // onInput={validarInput}
        />
      </CardContent>

      <Grid container className={classes.IconosContainer}>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Button
            className={classes.PublicarButton}
            variant="outlined"
            size="small"
            onClick={handleClick}
            id="btn_Validar"
            disabled={!body.content}
          >
            Publicar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}

export default FeedbackForm;

//Este es un comentario
//Este es un comentario de prueba
