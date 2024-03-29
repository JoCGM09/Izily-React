import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import logo from "../assets/images/logoprincipal.webp";
import { makeStyles, Grid, Button, IconButton, Badge } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MenuNavbar from "./MenuNavbar";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 4px 0 rgba(0, 0, 0, 0.2)",
    zIndex: theme.zIndex.drawer + 1,
  },

  gridPadre: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  gridHijo: {
    height: "50px",
    display: "flex",
    alignItems: "center",
  },

  searchInput: {
    opacity: "0.9",
    padding: "0px 5px",
    margin: "0px 40px",
    fontSize: "11px",
  },

  logo: {
    width: 64,
    height: 40,
    marginLeft: 15,
  },
  buttonLogo: {
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
  },

  botones: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "30px",
    fontSize: "11px",
  },

  menu: {
    padding: "0px",
  },

  icon: {
    padding: "10px",
  },

  nombrecontainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "160px",
    color: "black",
    paddingLeft: "10px",
  },

  rootAvatar: {
    marginRight: "10px",
    width: "33px",
    height: "33px",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    "&:hover": { cursor: "pointer" },
  },
  nombre: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    margin: "0px",
    padding: "0px",
    "&:hover": { cursor: "pointer" },
  },
}));


function ElevationScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();

  const { usuarioActual } = useAuth();

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

  useEffect(() => {
    traerPerfil();
  }, []);

  async function goProfile() {
    setError("");
    try {
      history.push(`/perfil/${profesor.id}`);
      window.location.reload();
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }
  async function goInicio() {
    setError("");
    try {
      history.push(`/inicio`);
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }

  return usuarioActual ? (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          {/* <Toolbar> */}
          <Grid className={classes.gridPadre} container alignItems="center">
            <Grid className={classes.gridHijo} item>
              <Button
                component={Link}
                to={"/"}
                className={classes.buttonLogo}
              >
                <img src={logo} className={classes.logo} />
              </Button>
            </Grid>

            {/* <Grid className={classes.gridHijo} item xs></Grid> */}

            <Grid className={classes.gridHijo} item>
              <Button
                variante="link"
                onClick={goInicio}
                className={classes.botones}
                variant="outlined"
              >
                Inicio
              </Button>

              <IconButton disabled className={classes.icon}>
                <Badge badgeContent={4}>
                  <MessageIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton disabled className={classes.icon}>
                <Badge badgeContent={4}>
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton disabled className={classes.icon}>
                {/*<Link to="/perfil">*/}
                <Badge badgeContent={4}>
                  <PersonIcon fontSize="small" />
                </Badge>
                {/*<Link />*/}
              </IconButton>

              {profesor && (
                  <Grid className={classes.nombrecontainer}  xs>

                      <Avatar variante="link" onClick={goProfile} className={classes.rootAvatar} alt={profesor.nombre} src={profesor.imageURL} />
                      <div className={classes.nombre}
                      variante="link" onClick={goProfile}
                      >
                        {profesor.nombre}
                      </div>
                    </Grid>  
                )}
                  <MenuNavbar perfil={profesor?.id} esProfesor={profesor?.esProfesor}/>              
            </Grid>
          </Grid>
          {/* </Toolbar> */}
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <ElevationScroll {...props}>
        <AppBar className={classes.root}>
          {/* <Toolbar> */}
          <Grid className={classes.gridPadre} container alignItems="center">
            <Grid className={classes.gridHijo} item>
              <Button
                component={Link}
                to={"/"}
                className={classes.buttonLogo}
              >
                <img src={logo} className={classes.logo} />
              </Button>
            </Grid>

            <Grid className={classes.gridHijo} item xs></Grid>

            <Grid className={classes.gridHijo} item>
              <Button
                component={Link}
                to={"/login"}
                className={classes.botones}
                variant="outlined"
              >
                Ingresar
              </Button>
              <Button
                component={Link}
                to={"/signup"}
                className={classes.botones}
                variant="outlined"
              >
                Regístrate
              </Button>
            </Grid>
          </Grid>
          {/* </Toolbar> */}
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}
