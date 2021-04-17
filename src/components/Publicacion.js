import React, { useState, useEffect, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CardMedia from "@material-ui/core/CardMedia"
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";
import TheatersIcon from "@material-ui/icons/Theaters";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
    minWidth: "100%",
    margin: "10px 0px",
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
    transform: "red",
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  Content: {
    widht: "100px",
    color: "black",
    fontSize: "14px",
    // display: "flex",
    // alignContent:"start",
    //flexWrap: "wrap",
    //hyphens: "auto",
    //wordBreak:"break-all",
  },
  containerContent: {
    paddingTop: "0px",
    widht: "100%",
  },
  comentarioSContainer: {
    padding: "0px",
    margin: "0px",
  },

  comentariosP: {
    marginRight: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },

  interesadosP: {
    marginLeft: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    "&:hover": {
      cursor: "default",
    },
  },

  CardHeader: {
    paddingTop: "15px",
    paddingLeft: "15px",
  },

  header: {
    paddingRight: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rootCrearComentario: {
    //maxWidth: 550,
    width: "100%",
    margin: "0px 0px",
    border: "0px",
    boxShadow: "0px",
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
  containerContentCrearComentario: {
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
  const initialBody = {
    content: "",
    name: "",
    date: "",
    loginid: "",
    imageURL: "",
    idPerfil: "",
  };

  const [expanded, setExpanded] = React.useState(false);
  const [bodyComent, setBodyComent] = useState(initialBody);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { usuarioActual } = useAuth();
  const history = useHistory();

  const [profesor, setProfesor] = useState(null);
  const [screams, setScreams] = useState(["2"]);

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

  const getScreams = () => {
    const screamRef = db.collection("publicaciones");
    screamRef
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setScreams(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (text) => {
    if (text && profesor) {
      const { name, value } = text.target;
      setBodyComent({
        ...bodyComent,
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

  const handleClickHeart = () => {};

  // const handleClick = async e => {
  //   db.collection('publicaciones').doc(`${props.screamId}`).collection('coments').doc(`${props.comentId}`)
  //   .add(bodyComent)
  //   .then(()=>{
  //     setBodyComent({...initialBody})
  //   }).then(()=>{
  //     history.push('/inicio');
  //     window.location.reload();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  useEffect(() => {
    traerPerfil();
    getScreams();
  }, []);

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
        <CardHeader
          className={classes.CardHeader}
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              alt={props.name}
              src={props.imageURL}
            />
          }
          // action={
          //   <IconButton aria-label="settings">
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={props.name}
          subheader={props.date}
        />

        {/* {props.tag} */}
      </div>

      <CardContent className={classes.containerContent}>
        <Typography
          className={classes.Content}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {props.content}
        </Typography>
      </CardContent>

      {/*<CardMedia className={classes.media} image={props.imagen} title="image" /> */}
      <img src={props?.imagen} className={classes.media} alt="" />

      {/*
      <Grid
        container
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid style={{ "&:hover": { cursor: "default" } }} item>
          <p className={classes.interesadosP}>
            A {props.interesados} personas les interesa esto.
          </p>
        </Grid>

        <Grid item>
          <p className={classes.comentariosP} onClick={handleExpandClick}>
            {props.numeroDeComentarios} comentarios
          </p>
        </Grid>
      </Grid>

      <div style={{ padding: "0px 10px" }}>
        <Divider />
      </div>      
      */}

      <CardActions
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "5px",
        }}
      >
        <Button
          disabled
          aria-label="add to favorites"
          style={{ height: "35px" }}
        >
          {/*<FavoriteIcon /> <p style={{marginLeft:"10px"}}>Me Interesa</p>*/}
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                name="checkedH"
              />
            }
            label="Me interesa"
            onClick={handleClickHeart}
          />
        </Button>
        <Button
          disabled
          onClick={handleExpandClick}
          aria-label="share"
          style={{ height: "35px" }}
        >
          <ChatBubbleOutlineIcon />{" "}
          <p style={{ marginLeft: "10px" }}>Comentar</p>
        </Button>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>

      {/* <CrearComentario/> */}

      <Card variant="outlined" className={classes.rootCrearComentario}>
        <CardContent
          align="center"
          className={classes.containerContentCrearComentario}
        >
          <input
            disabled
            className={classes.inputText}
            variant="outline"
            type="text"
            name="content"
            aria-label="minimum height"
            placeholder="Comentar..."
            rowsMin={1}
            onChange={handleInputChange}
            value={bodyComent.content}
          />
        </CardContent>
        <Grid container className={classes.IconosContainer}>
          <Grid item style={{ display: "flex", alignItems: "center" }}>
            <Button
              disabled
              className={classes.PublicarButton}
              size="small"
              // onClick={handleClick}
            >
              Enviar
            </Button>
          </Grid>

          <Grid item style={{ display: "flex", flexDirection: "row" }}>
            <Grid item>
              <IconButton disabled style={{ padding: "10px 10px 10px 10px" }}>
                <AddAPhotoIcon fontSize="medium" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton disabled style={{ padding: "10px 10px 10px 10px" }}>
                <TheatersIcon fontSize="medium" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <Collapse
        className={classes.comentarioSContainer}
        in={expanded}
        timeout="auto"
        unmountOnExit
      >
        <CardContent className={classes.comentarioSContainer}>
          {props.children}
          {/* hacer aqui el mapeo de los comentarios */}
        </CardContent>
      </Collapse>
    </Card>
  );
}
