import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';






const useStyles = makeStyles((theme) => ({
    boton: {
      margin: "0px 5px",
      color: "#3493C2",
      fontWeight: "bold",
      height: "40px",
      fontSize: "12px",
    },
    root: {
      padding:"20px",
    },
    title: {
      marginTop: 0,
      marginLeft:"20px",
    },
    subTitle: {
      fontSize:"18px",
      marginLeft:"20px",
    },
    preguntaContainer: {
      margin:"20px",
    },
    numeroPregunta: {
      fontWeight:"bold",
    },
    check: {
      color: "rgba(52, 147, 194, 1)",
    },
  }));

export default function AcercaDeIzily() {
    
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  const preguntas = [
    {
      pregunta: "Marca la habilidad que más te define:",
      respuestas: [
        {respuestaText: "Liderazgo", puntaje: 1},
        {respuestaText: "Empatía", puntaje: 1},
        {respuestaText: "Trabajo en equipo", puntaje: 1},
        {respuestaText: "Creatividad", puntaje: 1},
        {respuestaText: "Resolución de conflictos", puntaje: 1},
        {respuestaText: "Comunicación acertiva", puntaje: 1},   
        {respuestaText: "Planificación y gestion del tiempo", puntaje: 1}, 
      ],
    },
    {
      pregunta: "Consideras que un(a) mentor(a):",
      respuestas: [
        {respuestaText: "Propone y facilita el aprendizaje en el desarrollo de la clase", puntaje: 1},
        {respuestaText: "Brinda conocimiento y teorías", puntaje: 1}, 
        {respuestaText: "Despierta el interés en los estudiantes", puntaje: 1},  
      ],
    },
    {
      pregunta: "¿En qué idiomas podrías brindar una mentoría?",
      respuestas: [
        {respuestaText: "Español", puntaje: 1},
        {respuestaText: "Inglés", puntaje: 1},
        {respuestaText: "Portugués", puntaje: 1},
        {respuestaText: "Francés", puntaje: 1},
        {respuestaText: "Otro", puntaje: 1},
          
      ],
    },
    {
      pregunta: "¿Manejas el Lenguaje de Señas?",
      respuestas: [
        {respuestaText: "No", puntaje: 1},
        {respuestaText: "Un poco", puntaje: 1},
        {respuestaText: "A la perfección", puntaje: 1}, 
      ],
    },
    {
      pregunta: "¿Qué es más importante para ti?",
      respuestas: [
        {respuestaText: "Terminar con el contenido de tu mentoría programada", puntaje: 1},
        {respuestaText: "Gestionar y promover el aprenizaje en tus estudiantes", puntaje: 1},
      ],
    },
    {
      pregunta: "",
      respuestas: [
        {respuestaText: "No", puntaje: 1},
        {respuestaText: "Un poco", puntaje: 1},
        {respuestaText: "A la perfección", puntaje: 1}, 
      ],
    },
    {
      pregunta: "¿Qué amas hacer?",
      respuestas: {},
    },
    {
      pregunta: "¿De qué estás orgulloso(a)?",
      respuestas: {},
    },
    {
      pregunta: "¿Qué expectativas tienes en esta propuesta educativa?",
      respuestas: {},
    },
    {
      pregunta: "Basándose en su experiencia ¿Qué puede aportar a sus estudiantes?",
      respuestas: {},
    },
    {
      pregunta: "¿Qué expectativas tienes en esta propuesta educativa?",
      respuestas: {},
    },
    {
      pregunta: "¿Qué expectativas tienes en esta propuesta educativa?",
      respuestas: {},
    },
    



  ]



  return (
    <form className={classes.root}>
      <h1 className={classes.title}>
        ¡Genial! Estás a punto de convertirte en un(a) mentor(a) de Izily :D
      </h1>
      <p className={classes.subTitle}> 
        Antes de dar esta importante paso para ti y para Izily, tenemos algunas preguntas para ti:
      </p>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 1:</span> 
          {preguntas[0].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[0].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio className={classes.check}/>}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 2:</span> 
          {preguntas[1].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[1].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio />}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 3:</span> 
          {preguntas[2].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[2].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Checkbox className={classes.check}/>}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 4:</span> 
          {preguntas[3].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[3].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio />}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 5:</span> 
          {preguntas[4].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[4].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio />}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 6:</span> 
          {preguntas[5].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[5].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio />}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className={classes.preguntaContainer}>
        <div style={{display:"flex", flexDirection:"column"}}>
          <span className={classes.numeroPregunta}>Pregunta 6:</span> 
          {preguntas[5].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[5].respuestas.map((respuesta)=> 
                <FormControlLabel
                  control={<Radio />}
                  value={respuesta.respuestaText}
                  label={respuesta.respuestaText}
                />
              )}
            </RadioGroup>
          </FormControl>
        </div>
      </div>







      <Button
        href="javascript:history.back()"
        className={classes.boton}
        variant="outlined"
        size="small"
      >
        Volver atrás
      </Button>
    </form>
  );
}


  