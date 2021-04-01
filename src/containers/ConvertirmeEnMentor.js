import React from "react";
import { useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  boton: {
    margin: "0px 0px 40px 0px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "40px",
    fontSize: "12px",
  },
  root: {
    padding: "20px",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    justifyItems: "center",
    alignContent: "center",
  },
  title: {
    marginTop: 0,
    marginLeft: "20px",
  },
  subTitle: {
    fontSize: "18px",
    marginLeft: "20px",
  },
  preguntaContainer: {
    margin: "30px 20px 30px 20px",
  },
  numeroPregunta: {
    fontWeight: "bold",
  },
  check: {
    color: "rgba(52, 147, 194, 1)",
  },
  TextField: {
    marginTop: "10px",
    width: "350px",
  },
}));

export default function AcercaDeIzily() {
  const defaultTextAnswers = {
    answer6: "",
    answer7: "",
    answer8: "",
    answer9: "",
    answer10: "",
    answer11: "",
    answer12: "",
  };

  const classes = useStyles();
  const [value, setValue] = React.useState();
  const history = useHistory();
  const [textAnswers, setTextAnswers] = useState(defaultTextAnswers);
  const [profesor, setProfesor] = useState(null);
  const { usuarioActual } = useAuth();
  const [carga, guardarCarga] = useState(false);

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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleInputChange = (text) => {
    if (text && profesor) {
      const { name, value } = text.target;

      setTextAnswers({
        ...textAnswers,
        [name]: value,
      });
    } else {
      console.log("error");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(textAnswers);
    if (profesor.esProfesor === false) {
        updateEsProfesor(true);
        history.push(`/perfil/${profesor.id}`);
        window.location.reload();
      }
  };

  useEffect(() => {
    traerPerfil();
  }, []);

  const preguntas = [
    {
      pregunta: "Marca la habilidad que más te define:",
      respuestas: [
        { respuestaText: "Liderazgo", puntaje: 1 },
        { respuestaText: "Empatía", puntaje: 1 },
        { respuestaText: "Trabajo en equipo", puntaje: 1 },
        { respuestaText: "Creatividad", puntaje: 1 },
        { respuestaText: "Resolución de conflictos", puntaje: 1 },
        { respuestaText: "Comunicación acertiva", puntaje: 1 },
        { respuestaText: "Planificación y gestion del tiempo", puntaje: 1 },
      ],
    },
    {
      pregunta: "Consideras que un(a) mentor(a):",
      respuestas: [
        {
          respuestaText:
            "Propone y facilita el aprendizaje en el desarrollo de la clase",
          puntaje: 1,
        },
        { respuestaText: "Brinda conocimiento y teorías", puntaje: 1 },
        {
          respuestaText: "Despierta el interés en los estudiantes",
          puntaje: 1,
        },
      ],
    },
    {
      pregunta: "¿En qué idiomas podrías brindar una mentoría?",
      respuestas: [
        { respuestaText: "Español", puntaje: 1 },
        { respuestaText: "Inglés", puntaje: 1 },
        { respuestaText: "Portugués", puntaje: 1 },
        { respuestaText: "Francés", puntaje: 1 },
        { respuestaText: "Otro", puntaje: 1 },
      ],
    },
    {
      pregunta: "¿Manejas el Lenguaje de Señas?",
      respuestas: [
        { respuestaText: "No", puntaje: 1 },
        { respuestaText: "Un poco", puntaje: 1 },
        { respuestaText: "A la perfección", puntaje: 1 },
      ],
    },
    {
      pregunta: "¿Qué es más importante para ti?",
      respuestas: [
        {
          respuestaText: "Terminar con el contenido de tu mentoría programada",
          puntaje: 1,
        },
        {
          respuestaText:
            "Gestionar y promover el aprenizaje en tus estudiantes",
          puntaje: 1,
        },
      ],
    },
    {
      pregunta: "¿Qué amas hacer?",
      respuestas: [],
    },
    {
      pregunta: "¿De qué estás orgulloso(a)?",
      respuestas: [],
    },
    {
      pregunta: "¿Qué expectativas tienes en esta propuesta educativa?",
      respuestas: [],
    },
    {
      pregunta:
        "Basándose en su experiencia ¿Qué puede aportar a sus estudiantes?",
      respuestas: [],
    },
    {
      pregunta: "¿Qué expectativas tienes en esta propuesta educativa?",
      respuestas: [],
    },
    {
      pregunta:
        "Sabemos que el mundo globalizado cambia constantemente ¿Qué opina al respecto?",
      respuestas: [],
    },
    {
      pregunta:
        "En la actualidad muchos temas han pasado a formar parte de la normalidad ¿Eres capaz de compartir y debatir, sin ser invasivos en las creencias ideológicas de los estudiantes?",
      respuestas: [],
    },
  ];

  function updateEsProfesor(value) {
    db.collection("usuarios").doc(`${profesor.id}`).update({
      esProfesor: value,
    });
  }

  return (
    <>
      {profesor && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {profesor.esProfesor == false ? (
            <Grid className={classes.root}>
              <h1 className={classes.title}>
                ¡Genial! Estás a punto de convertirte en un(a) mentor(a) de
                Izily :D
              </h1>
              <p className={classes.subTitle}>
                Antes de dar esta importante paso para ti y para Izily, tenemos
                algunas preguntas para ti:
              </p>

              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 1:</span>
                  {preguntas[0].pregunta}
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      value={value}
                      onChange={handleChange}
                    >
                      {preguntas[0].respuestas.map((respuesta) => (
                        <FormControlLabel
                          control={
                            <Radio color="none" className={classes.check} />
                          }
                          value={respuesta.respuestaText}
                          label={respuesta.respuestaText}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>

              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 2:</span>
                  {preguntas[1].pregunta}
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      value={value}
                      onChange={handleChange}
                    >
                      {preguntas[1].respuestas.map((respuesta) => (
                        <FormControlLabel
                          control={
                            <Radio color="none" className={classes.check} />
                          }
                          value={respuesta.respuestaText}
                          label={respuesta.respuestaText}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 3:</span>
                  {preguntas[2].pregunta}
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      value={value}
                      onChange={handleChange}
                    >
                      {preguntas[2].respuestas.map((respuesta) => (
                        <FormControlLabel
                          control={
                            <Checkbox color="none" className={classes.check} />
                          }
                          value={respuesta.respuestaText}
                          label={respuesta.respuestaText}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 4:</span>
                  {preguntas[3].pregunta}
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      value={value}
                      onChange={handleChange}
                    >
                      {preguntas[3].respuestas.map((respuesta) => (
                        <FormControlLabel
                          control={
                            <Radio color="none" className={classes.check} />
                          }
                          value={respuesta.respuestaText}
                          label={respuesta.respuestaText}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 5:</span>
                  {preguntas[4].pregunta}
                </div>
                <div>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="gender"
                      value={value}
                      onChange={handleChange}
                    >
                      {preguntas[4].respuestas.map((respuesta) => (
                        <FormControlLabel
                          control={
                            <Radio color="none" className={classes.check} />
                          }
                          value={respuesta.respuestaText}
                          label={respuesta.respuestaText}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </div>
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 6:</span>
                  {preguntas[5].pregunta}
                </div>
                <TextField
                  className={classes.TextField} 
                  placeholder="Responder brevemente"
                  multiline
                  name="answer6"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 7:</span>
                  {preguntas[6].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                  placeholder="Responder brevemente"
                  multiline
                  name="answer7"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 8:</span>
                  {preguntas[7].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                  placeholder="Responder brevemente"
                  multiline
                  name="answer8"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 9:</span>
                  {preguntas[8].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                  placeholder="Responder brevemente"
                  multiline
                  name="answer9"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 10:</span>
                  {preguntas[9].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                  placeholder="Responder brevemente"
                  multiline
                  name="answer10"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 11:</span>
                  {preguntas[10].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                  placeholder="Responder brevemente"
                  multiline
                  name="answer11"
                  onChange={handleInputChange}
                />
              </Grid>
              <Divider />
              <Grid className={classes.preguntaContainer}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span className={classes.numeroPregunta}>Pregunta 12:</span>
                  {preguntas[11].pregunta}
                </div>
                <TextField
                  className={classes.TextField}
                   
                  placeholder="Responder brevemente"
                  multiline
                  name="answer12"
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  onClick={handleClick}
                  className={classes.boton}
                  variant="outlined"
                  size="small"
                >
                  Convertirme en Mentor
                </Button>
              </Grid>
            </Grid>
          ) : (
            <p>Felicidades</p>
          )}
        </div>
      )}
    </>
  );
}
