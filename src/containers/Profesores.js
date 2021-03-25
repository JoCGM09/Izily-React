import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Profesor from "../components/Profesor";
import { db } from "../firebase";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";



import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';


const drawerWidth = 240;

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display:"flex",
    flexDirection:"column",
    padding: 0,
  },

}))(MuiAccordionDetails);



const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    marginTop: "3rem",
    //paddingTop:"20px",
    overflow: "auto",
  },
  // necessary for content to be below app bar

  root: {
    display: "flex",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    justifyContent: "center",
  },
  Buscar: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "10px",
    width: "200px",
  },

  main: {
    background: "white",
    overflow: "auto",
    height: "100%",
    width: "100%",
    flexGrow: 1,
    padding: "15px, 0, 10px, 15px",
  },
  gridContainer: {
    paddingTop: 15,
  },
}));

export default function Profesores(callback, deps) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const [profesores, guardarProfesores] = useState([]);
  const [especialidades, guardarEspecialidades] = useState([]);
  const [etiquetas, guardarEtiquetas] = useState([0]);
  const [profesoresFiltrados, guardarProfesoresFiltrados] = useState([]);
  const { logout } = useAuth();
  const history = useHistory();

  const [expanded, setExpanded] = React.useState('panel');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };


  async function handleLogOut() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }

  const traerProfesores = () => {
    const usuariosRef = db.collection("usuarios");
    usuariosRef
      .where("esProfesor", "==", true)
      .where("disponible", "==", true)
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        guardarProfesores(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const seleccionarEtiquetas = (EspecialidadId) => () => {
    const currentIndex = etiquetas.indexOf(EspecialidadId);
    const etiquetasSeleccionadas = [...etiquetas];
    if (currentIndex === -1) {
      etiquetasSeleccionadas.push(EspecialidadId);
    } else {
      etiquetasSeleccionadas.splice(currentIndex, 1);
    }
    guardarEtiquetas(etiquetasSeleccionadas);
  };

  const filtrarProfesores = (terminoDeBusqueda) => {
    let etiquetasSeleccionadas = [...etiquetas];
    etiquetasSeleccionadas = etiquetasSeleccionadas.splice(1, etiquetas.length);
    const nuevosProfesoresFiltrados = profesores.filter((profesor) => {
      // Verificar Nombre
      const nombreProfesor = profesor.nombre.toLowerCase();
      const tieneNombreValido = nombreProfesor.includes(terminoDeBusqueda);

      // Verificar Materia
      const idsDeCursos = profesor.cursos.map((curso) => curso.id);
      let tieneCursoValido = false;
      idsDeCursos.forEach((idCurso) => {
        tieneCursoValido =
          tieneCursoValido || etiquetasSeleccionadas.includes(idCurso);
      });

      if (etiquetasSeleccionadas.length > 0)
        return tieneNombreValido && tieneCursoValido;
      return tieneNombreValido;
    });
    guardarProfesoresFiltrados(nuevosProfesoresFiltrados);
  };
  const filtrarProfesoresInput = (e) => {
    const terminoDeBusqueda = e.currentTarget.value.toLowerCase();
    filtrarProfesores(terminoDeBusqueda);
  };

  useEffect(() => {
    traerProfesores();
  }, []);

  useEffect(() => {
    const especialidadesRef = db.collection("especialidades");
    const todasLasEspecialidades = [];
    especialidadesRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        todasLasEspecialidades.push({ ...doc.data(), id: doc.id });
      });
    });
    guardarEspecialidades(todasLasEspecialidades);
  }, []);

  useEffect(() => {
    guardarProfesoresFiltrados(profesores);
  }, [profesores]);

  useEffect(() => {
    filtrarProfesores("");
  }, [etiquetas]);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <FormControl
            size="small"
            //className={clsx(classes.margin, classes.textField)}
            className={classes.Buscar}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Buscar nombre:
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              onChange={filtrarProfesoresInput}
              labelWidth={120}
            />
          </FormControl>
          <Divider />

          <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary style={{background:"rgba(81, 184, 82, 0.2)",}} aria-controls="panel1d-content" id="panel1d-header">
          <Typography style={{ color:"rgba(81, 184, 82, 1)", fontWeight:"bold",}}>Escolar</Typography>
        </AccordionSummary>
        <AccordionDetails>


        {especialidades
          .filter((especialidad) => especialidad.numberNivel == "0")
          .map((especialidad) => (
              <ListItem
                button
                key={especialidad.id}
                onClick={seleccionarEtiquetas(especialidad.id)}
              >
                <Checkbox
                  edge="start"
                  checked={etiquetas.indexOf(especialidad.id) !== -1}
                  style={{ color: "rgba(81, 184, 82, 1)" }}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={especialidad.nombre} />
              </ListItem>
        ))}
          
  

        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary style={{background:"rgba(52, 147, 194, 0.2)",}} aria-controls="panel2d-content" id="panel2d-header">
          <Typography style={{ color:"rgba(52, 147, 194, 1)", fontWeight:"bold",}}>Preuniversitario</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        {especialidades
          .filter((especialidad) => especialidad.numberNivel == "1")
          .map((especialidad) => (
              <ListItem
                button
                key={especialidad.id}
                onClick={seleccionarEtiquetas(especialidad.id)}
              >
                <Checkbox
                  edge="start"
                  checked={etiquetas.indexOf(especialidad.id) !== -1}
                  style={{ color: "rgba(52, 147, 194, 1)" }}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={especialidad.nombre} />
              </ListItem>
        ))}

        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary style={{background:"rgba(143, 85, 160, 0.2)",}} aria-controls="panel3d-content" id="panel3d-header">
          <Typography style={{ color:"rgba(143, 85, 160, 1)", fontWeight:"bold",}} >Universitario</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
        {especialidades
          .filter((especialidad) => especialidad.numberNivel == "2")
          .map((especialidad) => (
              <ListItem
                button
                key={especialidad.id}
                onClick={seleccionarEtiquetas(especialidad.id)}
              >
                <Checkbox
                  
                  edge="start"
                  checked={etiquetas.indexOf(especialidad.id) !== -1}
                  style={{ color: "rgba(143, 85, 160, 1)" }}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={especialidad.nombre} />
              </ListItem>
        ))
        
        }

        </AccordionDetails>
      </Accordion>
          {/* <List>
            {especialidades.map((especialidad, index) => (
              <ListItem
                button
                key={especialidad.id}
                onClick={seleccionarEtiquetas(especialidad.id)}
              >
                <Checkbox
                  edge="start"
                  checked={etiquetas.indexOf(especialidad.id) !== -1}
                  style={{ color: "#3f51b5" }}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={especialidad.nombre} />
              </ListItem>
            ))}
          </List> */}
        </div>
      </Drawer>
      <main className={classes.content}>
        <Grid container clasName={classes.gridContainer} spacing={3}>
          {profesoresFiltrados.map((profesor) => (
            <Grid item align="center" xs={12} sm={12} md={6} lg={3}>
              <Profesor profesor={profesor} />
            </Grid>
          ))}
        </Grid>
      </main>
    </div>
  );
}
