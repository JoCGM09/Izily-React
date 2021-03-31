import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import CrearPublicacion from "../components/CrearPublicacion";
import Publicacion from "../components/Publicacion";
import Comentario from "../components/Comentario";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  botones: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "40px",
    fontSize: "12px",
  },

  searchInput: {
    opacity: "0.9",
    padding: "0px 5px",
    margin: "0px",
    fontSize: "11px",
    width: "200px",
  },

  gridTotal: {
    paddingTop: "10px",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  gridArriba: {
    display: "flex",
    justifyContent: "space-between",

    flexDirection: "row",
    width: "100%",
  },

  publicacionesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
  },
  gridMedio: {
    //minWidth:"90px",
  },
  root: {
    maxWidth: 550,
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
    transform: "rotate(180deg)",
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  Content: {
    widht: "100px",
    color: "black",
    // display: "flex",
    // alignContent:"start",
    //flexWrap: "wrap",
    //hyphens: "auto",
    //wordBreak:"break-all",
  },

  etiqueta0: {
    //margin: "15px",
    background: "#51B852",
    color: "white",
    fontWeight: "bold",
  },

  etiqueta1: {
    //marginRight: "15px",
    background: "#3493C2",
    color: "white",
    fontWeight: "bold",
  },

  etiqueta2: {
    //margin: "15px",
    background: "#8F55A0",
    color: "white",
    fontWeight: "bold",
  },
}));

function Home() {
  const classes = useStyles();

  const { usuarioActual } = useAuth();
  const [profesor, setProfesor] = useState(null);
  const [screams, setScreams] = useState(["2"]);
  


  const traerProfesor = () => {
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
        setProfesor(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getScreams = () => {
    const screamRef = db.collection("publicaciones");
    screamRef
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
          //console.log(doc.id, " => ", doc.data());
        });
        //error
        setScreams(docs);
        console.log(screams);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    traerProfesor();
    getScreams();
  }, []);

  return (
    <>
      <Grid align="center" className={classes.gridTotal}>
        <Grid xs></Grid>

        <Grid>
          <Grid className={classes.gridArriba}>
            <Grid>
              <TextField
                disabled
                className={classes.searchInput}
                variant="outlined"
                item
                id="buscador"
                placeholder="Buscar"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid xs className={classes.gridMedio}></Grid>

            <Grid>
              <Button
                component={Link}
                to={"/buscar-un-mentor"}
                className={classes.botones}
                variant="outlined"
                size="small"
              >
                Buscar un mentor
              </Button>
            </Grid>
          </Grid>
          <Grid align="start" className={classes.publicacionesContainer}>
  
            <CrearPublicacion />

            {screams && (
              <div>
                {screams.map((scream) => (
                  <Publicacion
                    screamId={scream.id}
                    imageURL={scream.imageURL}
                    name={scream.name}
                    imagen="https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/publicacionImages%2Fproblema1.jpeg?alt=media&token=f4e69610-db14-4e2d-a5fa-b97bae16daec"
                    date={scream.date}
                    content={scream.content}
                    interesados={scream.interesados}
                    comentarios={scream.comentarios}
                    numeroDeComentarios={scream.numeroDeComentarios}
                    tag={
                      <Chip
                        className={classes.etiqueta2}
                        label={scream.label}
                      />
                    }
                    // children={screams.comentarios.map((comentarios) => (
                    //   <Comentario
                    //     nameComent={comentarios.name}
                    //     contentComent={comentarios.content}
                    //     dateComent={comentarios.date}
                    //     imageURLComent={comentarios.imageURL}
                    //     loginidComent={comentarios.loginid}
                    //     idPerfilComent={comentarios.idPerfil}
                    //   />
                    //   ))} 
                  />
                ))}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid xs></Grid>
      </Grid>
    </>
  );
}
export default Home;
