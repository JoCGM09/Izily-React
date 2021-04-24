import React, { useEffect, useState } from "react";
// import { useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import CrearPublicacion from "../components/CrearPublicacion";
import Publicacion from "../components/Publicacion";
import Comentario from "../components/Comentario";
import Chip from "@material-ui/core/Chip";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import EstamosTrabajando from "../assets/images/EstamosTrabajando.png";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";
import Actualizacion from "../assets/images/actualizacionv05.png";

const drawerWidth = 300;
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
    paddingTop: "15px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    flexGrow: 1,
    // width: "100%",
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
    // minWidth: "100%",
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    paddingTop: "50px",
  },
  drawerPaper: {
    width: drawerWidth,
    padding: "50px 20px 10px 20px",
  },
  main: {
    flexGrow: 1,
  },
  divMain: {
    display: "flex",
  },
  FB: {
    color: "#3b5998",
    fontSize: "50px",
  },
  Li: {
    color: "#0e76a8",
    fontSize: "50px",
  },
  buttonLogo: {
    width: "400px",
    height: "40px",
    "&:hover": {
      // backgroundColor: "rgba(255, 255, 255, 0)",
    },
  },
  correo: {
    color: "#3493C2",
    marginBottom: "10px",
    fontWeight: "bold",
    "&:hover": {
      fontWeight: "bold",
      color: "#3493C2",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  EstamosTrabajandoImg: {
    width: "300px",
    height: "auto",
  },
}));

function Home() {
  const classes = useStyles();

  const { usuarioActual } = useAuth();
  const [profesor, setProfesor] = useState(null);
  const [screams, setScreams] = useState([]);

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
    const screamRef = db
      .collection("publicaciones")
      .orderBy("dateNumber", "desc")
      .onSnapshot((querySnapshot) => {
        const screams = [];
        querySnapshot.forEach((doc) => {
          // screams.push(doc.data());
          screams.push({ ...doc.data(), id: doc.id });
        });
        setScreams(screams);
      });
  };

  useEffect(() => {
    traerProfesor();
    getScreams();
  }, []);

  return (
    <div className={classes.divMain}>
      <CssBaseline />

      <main className={classes.main}>
        <Grid className={classes.gridTotal} spacing={0}>
          {/* <Grid xs></Grid> */}

          <Grid>
            <Grid className={classes.gridArriba}>
              <Grid>
                <Button
                  component={Link}
                  to={"/buscar"}
                  className={classes.botones}
                  variant="outlined"
                  size="small"
                  disabled
                >
                  Buscar personas
                </Button>
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
                  {screams.map((scream, key) => (
                    <Publicacion
                      // key={scream.id}
                      screamId={scream.id}
                      imageURL={scream.imageURL}
                      name={scream.name}
                      // imagen="https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/publicacionImages%2Fproblema1.jpeg?alt=media&token=f4e69610-db14-4e2d-a5fa-b97bae16daec"
                      imagen={scream.photoUrl}
                      date={scream.date}
                      dateNumber={scream.dateNumber}
                      content={scream.content}
                      idPerfil={scream.idPerfil}
                      interesados={scream.interesados}
                      comentarios={scream.comentarios}
                      numeroDeComentarios={scream.comments}
                      tag={
                        <Chip
                          //Soy Jhomar
                          className={classes.etiqueta2}
                          label={scream.label}
                        />
                      }
                      children={<Comentario screamID={scream.id} />}
                    />
                  ))}
                </div>
              )}
            </Grid>
          </Grid>
          {/* <Grid xs></Grid> */}
        </Grid>
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="right"
      >
        <h1 style={{ color: "#3493C2", textAlign: "center" }}>
          Gracias por apoyar el proyecto Izily :D
        </h1>
        <p>
          Síguenos en Facebook y LinkedIn para enterarte de los avances de
          Izily.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button
            target="_blank"
            href={"https://www.facebook.com/Izily-102740731946306/"}
            className={classes.buttonLogo}
          >
            <FacebookIcon className={classes.FB} />
          </Button>
          <Button
            target="_blank"
            href={"https://www.linkedin.com/company/izilype/about/"}
            className={classes.buttonLogo}
          >
            <LinkedInIcon className={classes.Li} />
          </Button>
        </div>
        <p>
          También puedes contactarnos a nuestro correo institucional dando click
          aquí:
        </p>
        <a
          target="_blank"
          className={classes.correo}
          href="https://mail.google.com/mail/u/0/?fs=1&to=aprendeizily@gmail.com%20&su=CONTACTAR%20A%20IZILY&body=&tf=cm"
        >
          aprendeizily@gmail.com
        </a>
        <Divider />
        {/* <img src={Actualizacion} /> */}
      </Drawer>
    </div>
  );
}
export default Home;
