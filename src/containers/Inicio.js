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
        {/* <Grid xs></Grid>
        <Grid xs></Grid> */}
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
            {/* <Calificacion/> */}
            <CrearPublicacion />

            {screams && (
              <div>
                {screams.map((scream) => (
                  <Publicacion
                    letter="M"
                    color="Purple"
                    name={scream.name}
                    imagen="https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/publicacionImages%2Fproblema1.jpeg?alt=media&token=f4e69610-db14-4e2d-a5fa-b97bae16daec"
                    date={scream.date}
                    content={scream.content}
                    interesados={scream.interesados}
                    comentarios={scream.comentarios}
                    tag={
                      <Chip
                        className={classes.etiqueta2}
                        label={scream.label}
                      />
                    }
                    children={
                      <Comentario
                        name="hola"
                        comment="Recuerdo que el Ing. Medina resolvió ese problema en clases."
                        image=""
                      />
                    }
                  />
                ))}
              </div>
            )}
            {
              // <Publicacion
              //   letter="J"
              //   color="blue"
              //   name="José Guerra"
              //   date="9 de marzo, 2021"
              //   content="¿Algún mentor especializado en Física para nivel escolar?"
              //   interesados={4}
              //   comentarios={1}
              //   tag={<Chip className={classes.etiqueta0} label="Física" />}
              //   children={
              //     <div>
              //       <Comentario
              //         name="Manuel Baella"
              //         color="red"
              //         letter="M"
              //         comentario="Jesús Cama es bueno en esos temas, lo puedes encontrar en el buscador de mentores."
              //       />
              //     </div>
              //   }
              // />
              // <Publicacion
              //   letter="M"
              //   color="red"
              //   name="Manuel Baella"
              //   date="11 de marzo, 2021"
              //   content="Necesito referencias de que libros puedo usar para RadioPropagación en la UNI, porfa ayudenme este ciclo estará dificil :c"
              //   interesados={7}
              //   comentarios={2}
              //   tag={
              //     <Chip className={classes.etiqueta2} label="RadioPropagación" />
              //   }
              //   children={
              //     <div>
              //       <Comentario
              //         name="Jesus Cama"
              //         color="grey"
              //         letter="J"
              //         comentario="Puedes buscar en los libros virtuales que subió el Centro Cultural Pedro Paulet a su drive."
              //       />
              //       <Comentario
              //         name="Margaly Flores"
              //         color="purple"
              //         letter="M"
              //         comentario="Frente a la puerta 3 de la UNI puedes encontrar los más importantes para ese curso. Suerte!"
              //       />
              //     </div>
              //   }
              // />
              // <Publicacion
              //   letter="J"
              //   color="green"
              //   name="Jhomar Astuyauri"
              //   date="1 de marzo, 2021"
              //   content="Me estoy preparando para postular a la Cayetano Heredia, ¿alguien tiene exámenes pasados porfa?"
              //   interesados={16}
              //   comentarios={2}
              //   tag={
              //     <Chip className={classes.etiqueta1} label="Preuniversitario" />
              //   }
              //   children={
              //     <div>
              //       <Comentario
              //         name="Margaly Flores"
              //         color="purple"
              //         letter="M"
              //         comentario="Me parece que frente a la UNI venden exámenes para Cayetano también. Éxitos!"
              //       />
              //       <Comentario
              //         name="Jhomar Astuyauri"
              //         color="green"
              //         letter="J"
              //         comentario="Muchas gracias, si encontré :D"
              //       />
              //     </div>
              //   }
              // />
              // screams.map((scream)=>{
              //   <Publicacion
              //     letter="M"
              //     color="Purple"
              //     name={scream.name}
              //     imagen="https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/publicacionImages%2Fproblema1.jpeg?alt=media&token=f4e69610-db14-4e2d-a5fa-b97bae16daec"
              //     date={scream.date}
              //     content={scream.content}
              //     interesados={scream.interesados}
              //     comentarios={scream.comentarios}
              //     tag={
              //       <Chip
              //         className={classes.etiqueta2}
              //         label={scream.label}
              //       />
              //     }
              //     children={
              //       <Comentario
              //         name="Vivian Quispe"
              //         color="brown"
              //         letter="V"
              //         comentario="Recuerdo que el Ing. Medina resolvió ese problema en clases."
              //       />
              //     }
              //   />
              // })
            }
          </Grid>
        </Grid>
        <Grid xs></Grid>
        {/* <Grid xs></Grid>
        <Grid xs></Grid> */}
      </Grid>
    </>
  );
}
export default Home;
