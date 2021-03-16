import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Publicacion from "../components/Publicacion";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import backgroundgrid1 from "../assets/images/backgroundgrid1.jpg";
import { useAuth } from '../contexts/AuthContext';
import { useParams } from "react-router-dom";
import { db } from "../firebase";

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
}));

function Home() {
  const classes = useStyles();



  const { usuarioActual } = useAuth();

  

  
  const [profesor, setProfesor] = useState(null);
  
 
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
        console.log({profesor});
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
  }, []);

  return (
    <>
      <Grid align="center" className={classes.gridTotal}>
        <Grid xs></Grid>
        <Grid xs></Grid>
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
                to={"/encontrar-un-maestro"}
                className={classes.botones}
                variant="outlined"
                size="small"
              >
                Encontrar un maestro
              </Button>
            </Grid>
          </Grid>
          <Grid align="start" className={classes.publicacionesContainer}>
          <div>
          {profesor && (
            
                  <div>
                    {profesor.map((profe)=>(
                      <p>
                        {profe.nombre}
                        {profe.loginid}
                        {}
                      </p>
                    ))}
                    <p>{profesor.nombre}</p>
                  </div>
                  
                
                )} 

                

          </div>
          
          <Publicacion
              letter="M"
              color="Purple"
              name="Margaly Flores"
              //image="url(${backgroundgrid1})"
              imagen={backgroundgrid1}
              date="16 de marzo, 2021"
              content="Alguien me ayuda con este problema porfavor?"
            />
            <Publicacion
              letter="M"
              color="red"
              name="Manuel Baella"
              date="11 de marzo, 2021"
              content="Necesito referencias de que libros puedo usar para RadioPropagación en la UNI, porfa ayudenme este ciclo estará dificil :c"
            />
            <Publicacion
              letter="J"
              color="blue"
              name="José Guerra"
              date="9 de marzo, 2021"
              content="¿Algún profesor especializado en Cálculo Multivariacional?"
            />
            <Publicacion
              letter="J"
              color="green"
              name="Jhomar Astuyauri"
              date="1 de marzo, 2021"
              content="Me estoy preparando para postular a la Cayetano Heredia, ¿alguien tiene exámenes pasados porfa?"
            />
          </Grid>
        </Grid>
        <Grid xs></Grid>
        <Grid xs></Grid>
        <Grid xs></Grid>
      </Grid>
    </>
  );
}
export default Home;
