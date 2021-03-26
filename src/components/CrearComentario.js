import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 550,
    width: "100%",
    margin: "0px 0px",
    border: "0px",
    boxShadow: "0px",
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
  },
  IconosContainer: {
    padding: "0px 10px",
    justifyContent: "space-between",
  },
  PublicarButton: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "30px",
    fontSize: "12px",
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
    borderRadius: "15px",
    width: "100%",
    padding: "10px 10px 10px 10px",
    boxShadow: "rgba(0, 0, 0, 1)",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();

  const initialComment = {
    content: '',
    loginid: '',
    name: '', 
    image: '',
  }

  const [comment, setComment] = useState(initialComment);

  const { usuarioActual } = useAuth();
  const history = useHistory();

  const [profesor, setProfesor] = useState(null);

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

  const handleInputChange = text => {
    if(comment && profesor){
      const { name, value } = text.target;
      setComment({...comment, [name]: value, name: profesor.nombre, loginid: profesor.loginid});
    }else{
      console.log("error");
    }
  }

  const handleClick = async e => {
    e.preventDefault();
    await db.collection('publicaciones').doc().set(body)
    .then(()=>{
      setComment({...initialComment})
    }).then(()=>{
      history.push('/inicio');
      window.location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    traerPerfil();
  }, []);

  return (
    <Card variant="outlined" className={classes.root}>
      <CardContent align="center" className={classes.containerContent}>
        <Input
          className={classes.inputText}
          variant="outline"
          name="content"
          aria-label="minimum height"
          placeholder="Comentar..."
          rowsMin={1}
          onChange={handleInputChange}
          value={comment.content}
        />
      </CardContent>
      <Grid container className={classes.IconosContainer}>
        <Grid item style={{ display: "flex", alignItems: "center" }}>
          <Button className={classes.PublicarButton} size="small" onClick={handleClick}>
            Enviar
          </Button>
        </Grid>

        <Grid item style={{ display: "flex", flexDirection: "row" }}>
          <Grid item>
            <IconButton style={{ padding: "10px 10px 10px 10px" }}>
              <AddAPhotoIcon fontSize="medium" />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton style={{ padding: "10px 10px 10px 10px" }}>
              <TheatersIcon fontSize="medium" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
