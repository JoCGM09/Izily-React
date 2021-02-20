import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import Profesor from "../components/Profesor";
import CategoryCurses from "../components/CategoryCurses";
import Grid from "@material-ui/core/Grid";
import Link from "react-router-dom/Link"
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import PeopleIcon from '@material-ui/icons/People';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import LanguageIcon from '@material-ui/icons/Language';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';




const useStyles = makeStyles((theme) => ({



gridcontainer: {
  width: "100%",
},

gridprofesor: {
  minWidth: "377px",
},
griddatos: {
  minWidth: "390px",
},

titlePresentacion: {
  display:"flex",
  justifyContent:"space-between",
  alignItems: "center",
  marginTop: "0px",
  marginBottom: "-5px",
  width: "377px",
  
},

titlePresentacion_text: {
  margin: "0px",
},

paperPresentacion: {
  margin: theme.spacing(2),
  width: "360px",
  height: "90px",
  overflow: "auto",
  borderRadius: "10px",
  padding: "3px 8px 8px 8px",
  marginLeft: "0px",
},

etiquetasContainer: {
  display: "flex",
  flexWrap: "wrap",
  width: "380px",
  height: "120px",
  paddingBottom: "0px",
  //height: theme.spacing(15),
  overflow: "auto",
  marginLeft: "-25px",
  marginTop: "-10px",
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


etiqueta0: {
  margin: "4px",
  background: "#AADB55",
  color:"white",
  fontWeight:"bold",
},

etiqueta1: {
  margin: "4px",
  background: "#3493C2",
  color:"white",
  fontWeight:"bold",
},

etiqueta2: {
  margin: "4px",
  background: "#8F55A0",
  color:"white",
  fontWeight:"bold",
},

root: {
  flexGrow: 1,
  backgroundColor: theme.palette.background.paper,
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
  '&:hover': {
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

}));

//Cosas de la tabla

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

//termina cosas de la tabla

function Perfil() {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);};


  const { profesorId } = useParams();
  const [profesor, setProfesor] = useState(null);

  const traerProfesor = async () => {
    const cityRef = db.collection("usuarios").doc(profesorId);
    const doc = await cityRef.get();
    if (doc.exists) {
      setProfesor({ ...doc.data(), id: doc.id });
    }
  };

  
  
  




  useEffect(() => {
    traerProfesor();
  }, []);

  return (
    <>
      
      {profesor && (
        <div className={classes.seccion1}>
          
            <Grid container
                className={classes.gridcontainer}
                direction="row"
                justify="center"
                alignItems="flex-start" 
                alignContent="center"
                spacing={4}
                >
              <Grid item xs={12} md={3} 
                    className={classes.gridprofesor}
                    alignContent="center"
                    justify="center"
                    align="center"
                    
                    >
                <Profesor profesor={profesor} />
              </Grid>
              
              <Grid item xs={12} md={3} 
                    alignItems="start"
                    justify="center"
                    className={classes.griddatos}
                    >
                <div className={classes.titlePresentacion}>
                <p className={classes.titlePresentacion_text}>Presentación:</p>

                <Button 
                  variant="contained"
                  size="small"
                  color="inherit"
                  className={classes.buttonPerfil}
                  startIcon={<EventAvailableIcon />}
                  disableElevation="true"
                >
                  Agendar Reunión
                </Button>





                </div>
                
                <Paper className={classes.paperPresentacion}
                  overflow= "scroll"
                  variant="outlined" square
                  children={profesor.presentacion}
                />


                <div className={classes.root}>
                  <AppBar position="static">
                    <Tabs  className={classes.categories} variant="fullWidth" value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab disableRipple="true" label="Escolar" {...a11yProps(0)} />
                      <Tab disableRipple="true" label="Preuniv." {...a11yProps(1)} />
                      <Tab disableRipple="true" label="Universitario" {...a11yProps(2)} />
                    </Tabs>
                  </AppBar>
                  <TabPanel className={classes.TabPanel} value={value} index={0}>
                  <Paper className={classes.etiquetasContainer}
                    overflow="scroll"
                    elevation={0}
                    children= 
                    {profesor.cursos.map((cursos) => (
                      <Chip className={classes.etiqueta0}
                          label={cursos.nombre}
                      />
                    ))}
                  />
                  </TabPanel>
                  <TabPanel className={classes.TabPanel} value={value} index={1}>
                  <Paper className={classes.etiquetasContainer}
                    overflow="scroll"
                    elevation={0}
                    children= 
                    {profesor.cursos.map((cursos) => (
                      <Chip className={classes.etiqueta1}
                          label={cursos.nombre}
                      />
                    ))}
                  />
                  </TabPanel>
                  <TabPanel className={classes.TabPanel} value={value} index={2}>
                    <Paper className={classes.etiquetasContainer}
                    overflow="scroll"
                    elevation={0}
                    children= 
                    {profesor.cursos.map((cursos) => (
                      <Chip className={classes.etiqueta2}
                          label={cursos.nombre}
                      />
                    ))}
                  />
                  </TabPanel>
                </div>

                <div className={classes.buttonContainer}>
                <Button 
                  variant="contained"
                  color="inherit"
                  size="small"
                  
                  className={classes.buttonPerfil}
                  startIcon={<PeopleIcon />}
                  disableElevation="true"
                >
                  Contactar
                </Button>
                
                <Button 
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

                <Typography className={classes.idioms} variant="caption" display="block" >
                <LanguageIcon fontSize="small" />  Español, Portugués.
                </Typography>
              


                {/* <Paper className={classes.etiquetasContainer}
                  overflow="scroll"
                  elevation={0}
                  children= 
                  {profesor.cursos.map((cursos) => (
                    <Chip className={classes.etiqueta}
                        label={cursos.nombre}
                    />
                  ))}
                />*/}
                
              </Grid>
            </Grid>
          
        </div>
        
        

      
        
      )}
      {!profesor && (
        <div>
          <h1>Cargando...</h1>
        </div>
      )}
    </>
  );
}

export default Perfil;
