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
    },
    preguntaContainer: {
      margin:"10px",
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
      pregunta: "¿Tienes algún tipo de pizarra virtual?",
      respuestas: [
        {respuestaText: "si", esCorrecto: true},
        {respuestaText: "no", esCorrecto: false},
        {respuestaText: "tal vez", esCorrecto: false},
        {respuestaText: "no se", esCorrecto: false},
      ],
    },
    {
      pregunta: "¿Tienes más de 18 años?",
      respuestas: [
        {respuestaText: "si", esCorrecto: true},
        {respuestaText: "no", esCorrecto: false},
        {respuestaText: "tal vez", esCorrecto: false},
        {respuestaText: "no se", esCorrecto: false},
      ],
    },
    {
      pregunta: "¿Tienes experiencia enseñando virtualmente?",
      respuestas: [
        {respuestaText: "si", esCorrecto: true},
        {respuestaText: "no", esCorrecto: false},
        {respuestaText: "tal vez", esCorrecto: false},
        {respuestaText: "no se", esCorrecto: false},
      ],
    },
    {
      pregunta: "¿Estudias o trabajas actualemnte?",
      respuestas: [
        {respuestaText: "si", esCorrecto: true},
        {respuestaText: "no", esCorrecto: false},
        {respuestaText: "tal vez", esCorrecto: false},
        {respuestaText: "no se", esCorrecto: false},
      ],
    },



  ]



  return (
    <div className={classes.root}>
      <h1 className={classes.title}>
        Convertirme en Mentor
      </h1>
      <div className={classes.preguntaContainer}>
        <div>
          <span>Pregunta 1</span>/{preguntas.length}: {preguntas[0].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[0].respuestas.map((respuesta)=> 
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
        <div>
          <span>Pregunta 2</span>/{preguntas.length}: {preguntas[1].pregunta}
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
        <div>
          <span>Pregunta 3</span>/{preguntas.length}: {preguntas[2].pregunta}
        </div>
        <div>
          <FormControl component="fieldset">
            <RadioGroup row aria-label="gender" value={value} onChange={handleChange}>
              {preguntas[2].respuestas.map((respuesta)=> 
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
        <div>
          <span>Pregunta 4</span>/{preguntas.length}: {preguntas[3].pregunta}
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







      <Button
        href="javascript:history.back()"
        className={classes.boton}
        variant="outlined"
        size="small"
      >
        Volver atrás
      </Button>
    </div>
  );
}


  