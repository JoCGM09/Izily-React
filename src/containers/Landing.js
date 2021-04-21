import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import backgroundgrid1 from "../assets/images/backgroundgrid1.jpg";
import logoprincipal from "../assets/images/logoprincipal.webp";
import mentores from "../assets/images/mentores.png";
import comunidad from "../assets/images/comunidad.png";
import videollamada from "../assets/images/videollamada.png";
import CarouselLanding from "../components/CarouselLanding";

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: "Roboto",
  },
  Div1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    background: "white",
    // backgroundImage: `url(${backgroundgrid1})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "cover",
    width: "100%",
    margin: "0px",
    padding: "50px 0px 65px 0px",
    borderBottom: "1px solid #EBECEC",
  },
  titulo: {
    paddingLeft: "50px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "35px",
  },
  tituloimageContainer: {
    margin: "30px 60px",
    display: "flex",
    justifyContent: "center",
    padding: "40px",
    alignItems: "center",
    backgroundImage: `url(${videollamada})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center",
    backgroundSize: "contain",
    width: "600px",
    height: "400px",
  },
  renglon: {
    display: "flex",
    margin: "0px",
  },
  tituloblanco: {
    color: "black",
    margin: "5px 0px",
  },
  tituloazul: {
    color: "#3493C2",
    margin: "5px 0px",
  },
  tituloblancomedio: {
    color: "black",
    margin: "0px 0px 0px 0px",
  },
  tituloazulmedio: {
    color: "#3493C2",
    margin: "0px 25px 0px 0px",
  },
  tituloazulbajo: {
    color: "#3493C2",
    margin: "0px 0px 15px 0px",
  },
  Div2: {
    background: "white",
    // backgroundImage: `url(${backgroundgrid2})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    backgroundSize: "cover",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  TituloGrid2: {
    fontSize: "25px",
    fontWeight: "bold",
    color: "#3493C2",
    margin: 10,
  },
  Grid2: {
    padding: "20px",
    justifyContent: "center",
  },
  Grid2Item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "10px",
    //borderTop:"1px solid #EBECEC",
    borderBottom: "1px solid #EBECEC",
  },
  textgrid2: {
    width: "80%",
  },
  Imagen1: {
    width: "50%",
    height: "auto",
  },
  imggrid2: {
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "200%",
  },
  titulogrid2: {
    color: "#3493C2",
    fontSize: "17px",
    fontWeight: "bold",
  },
  subtitulogrid2: {},
}));

function Landing() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.Div1}>
        <Grid item className={classes.titulo}>
          <h1 className={classes.tituloblanco}>Aprende para</h1>
          <div className={classes.renglon}>
            <h1 className={classes.tituloazulmedio}>enseñar</h1>{" "}
            <h1 className={classes.tituloblancomedio}>y</h1>
          </div>
          <h1 className={classes.tituloblanco}>enseña para</h1>
          <h1 className={classes.tituloazulbajo}>aprender</h1>
        </Grid>
        <Grid item className={classes.tituloimageContainer}></Grid>
      </Grid>
      <div className={classes.Div2}>
        <p className={classes.TituloGrid2}>¿Quiénes somos?</p>
        <Grid className={classes.Grid2} container>
          <Grid className={classes.Grid2Item} item xs={10} sm={6} md={4} lg={4}>
            <Grid className={classes.imggrid2}>
              <div align="center">
                <img
                  src={logoprincipal}
                  className={classes.Imagen1}
                  alt="Logo"
                />
              </div>
            </Grid>
            <Grid className={classes.textgrid2}>
              <p className={classes.titulogrid2}>Red Social Educativa</p>
              <p className={classes.subtitulogrid2}>
                Orientada a ayudar tanto a escolares como a universitarios.
              </p>
            </Grid>
          </Grid>

          <Grid className={classes.Grid2Item} item xs={10} sm={6} md={4} lg={4}>
            <Grid className={classes.imggrid2}>
              <div align="center">
                <img
                  src={comunidad}
                  className={classes.Imagen1}
                  alt="Comunidades"
                />
              </div>
            </Grid>
            <Grid className={classes.textgrid2}>
              <p className={classes.titulogrid2}>Comunidad</p>
              <p className={classes.subtitulogrid2}>
                Donde puedes compartir tu experiencia y conocimiento.
              </p>
            </Grid>
          </Grid>

          <Grid className={classes.Grid2Item} item xs={10} sm={6} md={4} lg={4}>
            <Grid className={classes.imggrid2}>
              <div align="center">
                <img
                  src={mentores}
                  className={classes.Imagen1}
                  alt="Mentores"
                />
              </div>
            </Grid>
            <Grid className={classes.textgrid2}>
              <p className={classes.titulogrid2}>Mentores</p>
              <p className={classes.subtitulogrid2}>
                Con experiencia dispuestos a ayudarte a resolver todas tus
                dudas.
              </p>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <Grid
        style={{
          display: "flex",
          padding: "10px 0px 50px 0px",
          background: "white",
        }}
      >
        <CarouselLanding />
        {/* <Carousel2/> */}
      </Grid>
    </div>
  );
}

export default Landing;
