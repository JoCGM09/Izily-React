import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import { storage } from "../firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 550,
    minWidth: "100%",
    margin: "10px 0px",
    paddingBottom: "5px",
  },
  media: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  Content: {
    widht: "100px",
    color: "black",
  },
  containerContent: {
    padding: "0px 10px",
    widht: "100%",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  IconosContainer: {
    paddingLeft: "5px",
    paddingTop: "5px",
    // padding:"0px",
    justifyContent: "space-between",
  },
  PublicarButton: {
    margin: "0px 5px",
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
    rowsMin: "1",
    outline: "none",
    wrap: "hard",
    resize: "inherit",
    fontSize: "14px",
    fontFamily: "arial",
    border: "1px solid #C7C6C6",
    borderRadius: "10px",
    width: "100%",
    height: "40px",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 1)",
  },
  botonIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    borderRadius: "50px",
    "&:hover": {
      backgroundColor: "#F5F5F5",
      cursor: "pointer",
    },
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();

  const initialBody = {
    // body: '',
    content: "",
    date: "",
    loginid: "",
    name: "",
    interesados: 0,
    comentarios: 0,
    label: "",
  };

  const [body, setBody] = useState(initialBody);

  const { usuarioActual } = useAuth();
  const history = useHistory();

  const [profesor, setProfesor] = useState(null);
  // const [isPhoto, setIsPhoto] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const [loading, setLoading] = useState(false);

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

  // save input values inside the state localy

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
        comentarios: [],
        numeroDeComentarios: 0,
        dateNumber: new Date(),
        photoUrl: " ",
      });
    } else {
      console.log("error");
    }
  };

  // set values on the database

  const handleClick = async (e) => {
    e.preventDefault();
    const publicationRef = await db.collection("publicaciones").doc();
    publicationRef
      .set(body)
      .then(() => {
        setBody({ ...initialBody });
      })
      .then(() => {
        publicationRef.update({
          photoUrl: photoUrl,
        });
      })
      .then(() => {
        history.push("/inicio");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handlePhotoClick = async () => {
  //   setIsPhoto(isPhoto => !isPhoto)
  // }

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(`screams/${profesor.id}/${new Date()}`);
    setLoading((loading) => !loading);
    await fileRef.put(file);
    setPhotoUrl(await fileRef.getDownloadURL());
    setLoading((loading) => !loading);
    setIsReady((isReady) => !isReady);
  };

  useEffect(() => {
    traerPerfil();
  }, []);

  return (
    <Card className={classes.root}>
      <p style={{ paddingLeft: "12px", fontSize: "18px", margin: "10px 0px" }}>
        Crear Publicación
      </p>

      <CardContent align="center" className={classes.containerContent}>
        <TextareaAutosize
          className={classes.inputText}
          type="text"
          name="content"
          aria-label="minimum height"
          placeholder="Escribir publicación..."
          widht="500px"
          rowsMin={1}
          onChange={handleInputChange}
          value={body.content}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleClick(event);
            }
          }}
        />
      </CardContent>
      {loading && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <CircularProgress color="none" style={{ color: "#3493C2" }} />
        </div>
      )}
      {isReady && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img style={{ width: "100%", height: "auto" }} src={photoUrl} />
        </div>
      )}
      <Grid container className={classes.IconosContainer}>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Button
            className={classes.PublicarButton}
            variant="outlined"
            size="small"
            onClick={handleClick}
            disabled={
              !((body.content && isReady) || (body.content && !isReady))
            }
          >
            Publicar
          </Button>
        </Grid>

        <Grid item style={{ display: "flex", flexDirection: "row" }}>
          <Grid item>
            {/*
            <IconButton onClick={handlePhotoClick} style={{ padding: "10px" }}>
              <AddAPhotoIcon fontSize="medium" />
            </IconButton>
          */}
            <div className={classes.inputFileContent}>
              <label htmlFor="screamPhoto1" className={classes.botonIcon}>
                <AddAPhotoIcon fontSize="medium" style={{ color: "#757575" }} />
              </label>
              <Input
                style={{ display: "none" }}
                onChange={handlePhotoChange}
                accept=".jpg,.jpeg,.png"
                type="file"
                id="screamPhoto1"
              ></Input>
            </div>
          </Grid>
          <Grid item>
            <IconButton disabled style={{ padding: "10px" }}>
              <TheatersIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
