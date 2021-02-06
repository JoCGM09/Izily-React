import React, {useCallback, useEffect, useState} from "react";
import clsx from "clsx";
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

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: 0,
    padding: 0,
  },
  content: {
    paddingTop: 64,
    display: "flex",
    position: "absolute",
    height: "100%",
    width: "100%",
    flexDirection: "row",
  },
  drawer: {
    width: drawerWidth,
  },
  main: {
    background: "white",
    overflow: "auto",
    height: "100%",
    width: "100%",
    flexGrow: 1,
    padding: 10,
  },
}));

export default function Profesores(callback, deps) {
  const classes = useStyles();

  const [profesores, guardarProfesores] = useState([]);
  const [especialidades, guardarEspecialidades] = useState([]);
  const [etiquetas, guardarEtiquetas] = useState([0]);
  const [profesoresFiltrados, guardarProfesoresFiltrados] = useState([]);

  const traerProfesores = () => {
    const usuariosRef = db.collection("usuarios");
    usuariosRef
      .where("esProfesor", "==", true)
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
      const tieneNombreValido = nombreProfesor.includes(terminoDeBusqueda)

      // Verificar Materia
      const idsDeCursos = profesor.cursos.map((curso) => curso.id);
      let tieneCursoValido = false;
      idsDeCursos.forEach((idCurso) => {
        tieneCursoValido = tieneCursoValido || etiquetasSeleccionadas.includes(idCurso);
      });

      if(etiquetasSeleccionadas.length > 0)
        return tieneNombreValido && tieneCursoValido;
      return tieneNombreValido
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
    const especialidadesRef = db.collection('especialidades');
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
    filtrarProfesores('');
  }, [etiquetas]);

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <div className={classes.drawer}>
          <List>
            <ListItem>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Buscar
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  onChange={filtrarProfesoresInput}
                  labelWidth={50}
                />
              </FormControl>
            </ListItem>
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
          </List>
        </div>
        <main className={classes.main}>
          <Grid container spacing={3}>
            {profesoresFiltrados.map((profesor) => (
              <Grid item xs={12} md={4}>
                <Profesor profesor={profesor} />
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </div>
  );
}
