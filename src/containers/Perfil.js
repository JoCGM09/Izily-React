import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Profesor from "../components/Profesor";
import { useAuth } from "../contexts/AuthContext";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import PeopleIcon from "@material-ui/icons/People";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import LanguageIcon from "@material-ui/icons/Language";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  seccion1: {
    margin: 0,
    paddingTop: 10,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  gridcontainer: {
    width: "100%",

    borderBottom: "1px solid #C4C4C4",
  },

  gridprofesor: {
    minWidth: "377px",
  },
  griddatos: {
    minWidth: "390px",
    justifyContent: "center",
  },

  titlePresentacion: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "0px",
    marginBottom: "-5px",
    width: "377px",
  },

  titlePresentacion_text: {
    margin: 0,
    marginLeft: "2px",
    // marginTop:"0px",
    fontSize: "15px",
    fontWeight: "bold",
  },

  paperPresentacion: {
    width: "377px",
    height: "90px",
    overflow: "auto",
    borderRadius: "10px",
    padding: "3px 8px 8px 8px",
    margin: "15px 0px 10px 0px",
  },

  etiquetasContainer: {
    display: "flex",
    alignContent: "start",
    flexWrap: "wrap",
    width: "380px",
    height: "120px",
    paddingBottom: "0px",

    overflow: "auto",
    marginLeft: "-25px",
    marginTop: "-10px",

    borderRadius: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },

  TabPanel: {
    padding: "0px",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },

  categories: {
    background: "white",
    color: "black",
  },

  categoriesAppBar: {
    marginBottom: "-10px",
  },

  categorie3: {
    width: "fullWidht",
  },

  etiqueta0: {
    margin: "4px",
    background: "#AADB55",
    color: "white",
    fontWeight: "bold",
  },

  etiqueta1: {
    margin: "4px",
    background: "#3493C2",
    color: "white",
    fontWeight: "bold",
  },

  etiqueta2: {
    margin: "4px",
    background: "#8F55A0",
    color: "white",
    fontWeight: "bold",
  },

  root: {
    //flexGrow: 1,
    width: "377px",
    backgroundColor: "rgba(0, 0, 0, 0.0)",
  },

  buttonPerfil: {
    background: "white",
    color: "#3493C2",
    border: "1px solid #3493C2",
    fontSize: "11px",
    height: "25px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#DAF1FC",
    },
  },

  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "-10px",

    width: "370px",
    paddingLeft: "5px",
  },

  idioms: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },

  idiomsContainer: {
    width: "380px",
  },

  seccion2: {
    marginTop: "40px",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

//termina cosas de la tabla

function Perfil() {
  const classes = useStyles();
  const theme = useTheme();

  const { usuarioActual } = useAuth();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { profesorId } = useParams();
  const [profesor, setProfesor] = useState(null);

  const traerProfesor = async () => {
    const profesorInfo = db.collection("usuarios").doc(profesorId);
    const doc = await profesorInfo.get();
    if (doc.exists) {
      setProfesor({ ...doc.data(), id: doc.id });
    }
  };

  const calendly = () => {
    window.Calendly.initPopupWidget({ url: `${profesor.calendly}` });
    return false;
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    traerProfesor();
  }, []);

  return (
    <>
      {profesor && (
        <div className={classes.seccion1}>
          <Grid
            container
            className={classes.gridcontainer}
            direction="row"
            justify="center"
            alignItems="flex-start"
            alignContent="center"
            spacing={4}
          >
            <Grid
              item
              xs={12}
              md={3}
              className={classes.gridprofesor}
              alignContent="center"
              justify="center"
              align="center"
            >
              <Profesor profesor={profesor} />
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              //alignItems="start"
              align="center"
              alignContent="center"
              justify="center"
              className={classes.griddatos}
            >
              <div className={classes.titlePresentacion}>
                <p className={classes.titlePresentacion_text}>Acerca de mi:</p>

                {usuarioActual.uid === profesor.loginid ? (
                  <p> </p>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    target="_blank"
                    // href={profesor.calendly}
                    color="inherit"
                    className={classes.buttonPerfil}
                    onClick={calendly}
                    startIcon={<EventAvailableIcon />}
                    disableElevation="true"
                  >
                    Agendar Reunión
                  </Button>
                  // <a href="" onClick={calendly}>Schedule time with me</a>
                )}
              </div>

              <Paper
                className={classes.paperPresentacion}
                overflow="scroll"
                align="start"
                variant="outlined"
                square
                children={profesor.presentacion}
              />

              <div className={classes.root}>
                <AppBar
                  elevation={1}
                  className={classes.categoriesAppBar}
                  position="static"
                >
                  <Tabs
                    className={classes.categories}
                    variant="fullWidth"
                    value={value}
                    onChange={handleChange}
                    aria-label="full width tabs example"
                  >
                    <Tab
                      className={classes.categorie1}
                      disableRipple="true"
                      label="Escolar"
                      {...a11yProps(0)}
                    />
                    <Tab
                      className={classes.categorie2}
                      disableRipple="true"
                      label="Preuniv."
                      {...a11yProps(1)}
                    />
                    <Tab
                      className={classes.categorie3}
                      disableRipple="true"
                      label="Universitario"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </AppBar>
                <TabPanel className={classes.TabPanel} value={value} index={0}>
                  <Paper
                    className={classes.etiquetasContainer}
                    overflow="scroll"
                    variant="outlined"
                    square
                    children={profesor.cursos
                      .filter((cursos) => cursos.numberNivel == "0")
                      .map((cursos) => (
                        <Chip
                          className={classes.etiqueta0}
                          label={cursos.nombre}
                        />
                      ))}
                  />
                </TabPanel>
                <TabPanel className={classes.TabPanel} value={value} index={1}>
                  <Paper
                    className={classes.etiquetasContainer}
                    overflow="scroll"
                    variant="outlined"
                    square
                    children={profesor.cursos
                      .filter((cursos) => cursos.numberNivel == "1")
                      .map((cursos) => (
                        <Chip
                          className={classes.etiqueta1}
                          label={cursos.nombre}
                        />
                      ))}
                  />
                </TabPanel>
                <TabPanel className={classes.TabPanel} value={value} index={2}>
                  <Paper
                    className={classes.etiquetasContainer}
                    overflow="scroll"
                    variant="outlined"
                    square
                    children={profesor.cursos
                      .filter((cursos) => cursos.numberNivel == "2")
                      .map((cursos) => (
                        <Chip
                          className={classes.etiqueta2}
                          label={cursos.nombre}
                        />
                      ))}
                  />
                </TabPanel>
              </div>

              <div className={classes.buttonContainer}>
                {usuarioActual.uid === profesor.loginid ? (
                  <p> </p>
                ) : (
                  <Button
                    disabled
                    variant="contained"
                    color="inherit"
                    size="small"
                    className={classes.buttonPerfil}
                    startIcon={<PeopleIcon />}
                    disableElevation="true"
                  >
                    Contactar
                  </Button>
                )}

                <Button
                  disabled
                  variant="contained"
                  color="inherit"
                  size="small"
                  className={classes.buttonPerfil}
                  startIcon={<PlayArrowIcon />}
                  disableElevation="true"
                >
                  Video
                </Button>

                <Button
                  disabled
                  variant="contained"
                  size="small"
                  color="inherit"
                  className={classes.buttonPerfil}
                  startIcon={<PeopleIcon />}
                  disableElevation="true"
                >
                  Mi Drive
                </Button>
              </div>

              <div className={classes.idiomsContainer}>
                <Typography
                  className={classes.idioms}
                  variant="caption"
                  display="block"
                >
                  <LanguageIcon fontSize="small" /> Español, Portugués.
                </Typography>
              </div>
            </Grid>
          </Grid>

          <div className={classes.seccion2}></div>
        </div>
      )}
      {!profesor && (
        // <div>
        //   <h1>Cargando...</h1>
        // </div>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}

export default Perfil;
