import React, { useEffect, useState } from "react";
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

export default function Profesores() {
  const classes = useStyles();

  const [profesores, guardarProfesores] = useState([]);

  const [profesoresFiltradosNombre, guardarProfesoresFiltradosNombre] = useState([]);

  const [especialidades, guardarEspecialidades] = useState([]);

  const [etiquetas, guardarEtiquetas] = useState([0]);

  const [profesoresFiltadosPorEtiquetas, guardarProfesoresFiltradosPorEtiquetas] = useState([]);

  const [profesoresFiltrados, guardarProfesoresFiltrados] = useState([]);

  const TraerProfesores = () => {
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

  const todasEspecialidades = db.collection("especialidades");
  todasEspecialidades.get().then((querySnapshot) => {
    const especialidades = [];
    querySnapshot.forEach((doc) => {
      especialidades.push({ ...doc.data(), id: doc.id });
    });
    guardarEspecialidades(especialidades);
  });

  const SeleccionarEtiquetas = (EspecialidadId) => () => {
    const currentIndex = etiquetas.indexOf(EspecialidadId);
    const etiquetasSeleccionadas = [...etiquetas];
    if (currentIndex === -1) {
      etiquetasSeleccionadas.push(EspecialidadId);
    } else {
      etiquetasSeleccionadas.splice(currentIndex, 1);
    }
    guardarEtiquetas(etiquetasSeleccionadas);
    const profesoresFiltradosEtiquetas = [];
    profesores.forEach((profesor) => {
      const cursosPorProfesor = profesor.cursos.map((curso) => {
        return curso.id;
      });
      cursosPorProfesor.forEach((e) => {
        const estaSeleccionado = etiquetasSeleccionadas.includes(e);
        if (estaSeleccionado && (profesoresFiltradosEtiquetas.indexOf(profesor) === -1)) {
          profesoresFiltradosEtiquetas.push(profesor);
        }
      }); 
    });
    guardarProfesoresFiltradosPorEtiquetas(profesoresFiltradosEtiquetas);
    console.log(profesoresFiltadosPorEtiquetas);
  };

  const filtrarProfesoresNombre = (e) => {
    const terminoDeBusqueda = e.currentTarget.value.toLowerCase();
    const nuevosProfesoresFiltrados = profesores.filter((profesor) => {
      const nombreProfesor = profesor.nombre.toLowerCase();
      return nombreProfesor.includes(terminoDeBusqueda);
    });
    guardarProfesoresFiltradosNombre(nuevosProfesoresFiltrados);
  };

  const TodosLosProfesoresFiltrados = (e) => {
    const todosProfesoresFiltrados = [];
    if (profesoresFiltadosPorEtiquetas.length === 0){
      todosProfesoresFiltrados = profesoresFiltradosNombre;
    } else {
      todosProfesoresFiltrados = [...new Set([...profesoresFiltradosNombre ,...profesoresFiltadosPorEtiquetas])]
    };
    guardarProfesoresFiltrados(todosProfesoresFiltrados);
  };

  useEffect(() => {
    TraerProfesores();
  }, []);

  useEffect(() => {
    guardarProfesoresFiltradosNombre(profesores);
  }, [profesores]);

  useEffect(() => {
    guardarProfesoresFiltradosPorEtiquetas(profesores);
  }, [profesores]);

  useEffect(() => {
    guardarProfesoresFiltrados(profesores);
  }, [profesores]);
  

  // profesores = [
  //   {
  //     nombre: "Juan",
  //     descripción: "Soy Juan",
  //     disponible: True,
  //     email: "soyjuan@gmail.com",
  //     cursos: [
  //       {
  //         nombre:'matemática',
  //         id:'CUR_001',
  //         slug:'mat'
  //       },
  //       {
  //         nombre:'física',
  //         id:'CUR_002',
  //         slug:'fis'
  //       }
  //     ]
  //   }
  // ]

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
                  onChange={filtrarProfesoresNombre}
                  // endAdornment={
                  //   <InputAdornment position="end">
                  //     <IconButton
                  //       aria-label="toggle password visibility"
                  //       onClick={() => {}}
                  //       onMouseDown={() => {}}
                  //       edge="end"
                  //     >
                  //       <Visibility />
                  //     </IconButton>
                  //   </InputAdornment>
                  // }
                  labelWidth={50}
                />
              </FormControl>
            </ListItem>
            {especialidades.map((especialidad, index) => (
              <ListItem
                button
                key={especialidad.id}
                onClick={SeleccionarEtiquetas(especialidad.id)}
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
