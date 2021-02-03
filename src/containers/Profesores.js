/////// COMPONENTE PROFESORES: Genera todos los componentes independientes (cartas)

// Se debe importar tanto react como los hooks useEffect y useState
// También componentes de Material UI
// Y la constante db que tiene la data de la base de datos de firestore

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import { Grid, IconButton, Toolbar } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Profesor from "../components/Profesor";
import { db } from "../firebase";

import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";

// Constantes y estilos de Material UI

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    background: "gray",
    overflow: "auto",
    height: "100%",
    flexGrow: 1,
    padding: 25,
  },
}));

// Componente Profesores

export default function Profesores() {
  // Cargar los estilos de Material UI como clase

  const classes = useStyles();

  // se definen los estados con el hook useState
  // useState sirve para hacer que un componente cambie a lo largo del tiempo

  // se define el estado de toda la información de los profesores en un arreglo
  //profesores indica el estado, guardarProfesores indica el cambio de estado

  const [profesores, guardarProfesores] = useState([]);

  //se define el estado de profesoresFiltrados que es un arreglo con los profesores después de pasar una función que los filtre según lo que escribimos, profesoresFitrados es el estado inicial, guardarProfesoresFiltrados indica el cambio de estado

  const [profesoresFiltrados, guardarProfesoresFiltrados] = useState([]);

  // Función para obtener los datos de la db

  const [especialidades, guardarEspecialidades] = useState([]);

  const getData = () => {
    //se define una constante usuariosref que almacena los datos de la db
    const usuariosRef = db.collection("usuarios");

    //En la db de la colección "usuarios" existe un booleano que indica si son profesores o no, primero se usa el método where para filtrar si esProfesor está activado como true, si es así pide los datos (get()), LUEGO hace una función a la que le pasa un parámetro llamado querySnapshot que es como una "foto" de los datos de la db (cosas de Firebase), la función genera un arreglo vacío llamado docs y con un bucle almacena los datos completos solo de los que pasaron el filtro y les suma su id (por defecto Firebase no trae el id pero es necesario por eso los incluímos), luego ejecuta la función de guardarProfesores guardando el arreglo docs

    //esa nomenclatura es equivalente a colocar usuariosRef.where(...).get().then(...)

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
      })
      // al trabajar con promesas (then) es buena práctica colocar un .catch que te muestra un error si es que lo hubiera, se coloca de esta forma:
  };

  const todasEspecialidades = db.collection("especialidades");
  todasEspecialidades.get().then((querySnapshot) => {
    const especialidades = [];
    querySnapshot.forEach((doc) => {
      especialidades.push({ ...doc.data(), id: doc.id });
    });
    guardarEspecialidades(especialidades);
  });

  //useEffect es otro hook de React igual que useState, pero este sirve para hacer algo cuando algo sucede, en este caso usamos el hook para que ocurra la función getData() cada vez que se actualice la página, eso permite que al agregar más usuarios a la db, se puedan ver al actualizar

  //el devolver ese arreglo vacío [] indica que el suceso esperado es la carga de la Página

  useEffect(() => {
    getData();
  }, []);

  //Similar al caso anterior, este hook espera que el ESTADO PROFESORES (que definimos arriba en useState) CAMBIE, por eso está dentro del [], en el [] va lo que se espera que suceda, en este caso es el cambio del estado. Lo que ocurre al cambiar el estado es que se agregan los nuevos datos a PROFESORES

  useEffect(() => {
    guardarProfesoresFiltrados(profesores);
  }, [profesores]);

  //Se define filtrarProfesores como función de envento (recibe una "e" de evento). Esta función devento ocurre cuando el input (búsqueda), vaya cambiando. lo que hace esta función es que genera una constante llamada terminoDeBusqueda que toma el valor del evento que sería el llenado de datos (e.currentTarget.value significa que está tomando el valor de lo que se va escribiendo en el input) y lo convierte a minúsculas, por si escribes algún nombre en mayúsculas (JS puro y duro). Luego genera un arreglo nuevo arreglo nuevosProfesoresFiltrados que toma una copia del ESTADO de PROFESORES (recordar que el estado ya cambió y tiene toda la data) y los filtra con el método filter, el cual recibe una función que convierte todos los NOMBRES de los profesores también a minúscula, devolviendo solo los que contengan terminoDeBusqueda que sería lo que están escribiendo en el input. Finalmente cambia el estado de profesores colocando solo los nuevos profesores filtrados

  const filtrarProfesores = (e) => {
    const terminoDeBusqueda = e.currentTarget.value.toLowerCase();
    const nuevosProfesoresFiltrados = profesores.filter((profesor) => {
      const nombreProfesor = profesor.nombre.toLowerCase();
      return nombreProfesor.includes(terminoDeBusqueda);
    });
    guardarProfesoresFiltrados(nuevosProfesoresFiltrados);
  };

  //Filtrado por etiquetas

  const filtrarEtiquetas = (e) => {
    const cursosDelProfesor = profesores.map((profesor) => {
      if (profesor.cursos.map((curso) => {
        return curso.nombre;
      }).includes('matemática')){return profesor.nombre};
    });
    console.log(cursosDelProfesor)
    // if (cursosDelProfesor.some(e => e.nombre === cursoBoton)){
    //   console.log(cursoBoton); //espero el nombre del curso que sale en la etiqueta
    //   console.log('existe'); //espero arreglo con los cursos del profesor
    // }

    // const filtradosPorEtiquetas = cursosDelProfesor.includes(cursoBoton);
    // guardarProfesoresFiltrados(filtradosPorEtiquetas);
  }

  //Se definen las materias solo para colocar a la izquierda, aún no son las existentes

  // const materias = [
  //   {
  //     id: "MAT-125",
  //     nombre: "Aritmetica",
  //   },
  //   {
  //     id: "MAT-126",
  //     nombre: "Algebra",
  //   },
  //   {
  //     id: "MAT-126",
  //     nombre: "Geometria",
  //   },
  // ];

  //Finalmente se muestra el JSX que devuelve nuestro componente Profesores
  //Devuelve el header, las etiquetas y las cards de los profesores, que a su vez son componentes (Profesor.js)
  
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
    //Header con cosas raras de MaterialUI

    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Typography variant="h6" className={classes.title}>
            Profesores
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <div className={classes.drawer}>
          <List>
            <ListItem>
              <FormControl
                className={clsx(classes.margin, classes.textField)}
                variant="outlined"
              >
                {/* El input donde el evento onChange llamará a la función de evento filtrarProfesores */}
                <InputLabel htmlFor="outlined-adornment-password">
                  Buscar profesores
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="text"
                  onChange={filtrarProfesores}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {}}
                        onMouseDown={() => {}}
                        edge="end"
                      >
                        <Visibility />
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={130}
                />
              </FormControl>
            </ListItem>
            {/* Se coloca un bucle que devuelve los elementos de la lista izquierda y va generando uno por uno */}
            {especialidades.map((especialidad, index) => (
              <ListItem tItem button onClick={filtrarEtiquetas} key={especialidad.id}>
                <ListItemText primary={especialidad.nombre} />
              </ListItem>
            ))}
          </List>
        </div>
        <main className={classes.main}>
          <Grid container spacing={3}>
            {/* Se coloca un bucle que regresa el componente Profesor todas las veces que diga nuestro ESTADO profesor, recordar que ya pasó por el filtro */}
            {profesoresFiltrados.map((profesor) => (
              <Grid item xs={12} md={4} lg={3}>
                <Profesor profesor={profesor} />
              </Grid>
            ))}
          </Grid>
        </main>
      </div>
    </div>
  );
}
