//Este componente es una card sola
import React from "react";
import Link from "react-router-dom/Link"
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Brightness1Icon from '@material-ui/icons/Brightness1';

//Cosas raras de MUI

const StyledRating = withStyles({
  iconFilled: {
    color: '#3493C2',
  },
 
})(Rating);



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 3,
    boxShadow: "5px 2px 10px 0 rgba(0, 0, 0, .5)",
  },
  avatar: {
    height: 150,
    width: 150,
    borderRadius: "50%",
    AlignItems: "center",
    marginBottom: 0,
  },
  avatarContainer: {
    border: 5,
    marginBottom: 15,
    textAlign: "center",
  },
  numero: {
    padding: 0,
    margin: 0,
    textAlign: "center",
    color: "#636363"
  },
  calificacion: {
    
    flexDirection: "row",
    textAlign: "center",
  },
  datos: {
    fontWeight: "bold",
  },
  descripcion: {
    padding: 0,
    margin: 0,
  },
  nombre: {
    padding: 0,
    margin: 0,
  },
});

export default function Profesor({ profesor }) {
  const classes = useStyles();
  //imagen random
  const defaultAvatar = "https://i.pravatar.cc/300";


  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/profesores/${profesor.id}`}>
        <CardContent>
          <div className={classes.avatarContainer}>
            <img className={classes.avatar} src={defaultAvatar} />
            <div>
              <Box component="fieldset" margin={0} border={0} padding={0} mb={-1} borderColor="transparent">
              <StyledRating 
              name="customized-color"
              defaultValue={profesor.puntuacion}
              precision={0.1}
              icon={<StarIcon fontSize="large" />}
              readOnly
              /></Box>
              <span className={classes.numero}>{profesor.puntuacion}</span>
            </div>
            <Typography className={classes.nombre} gutterBottom variant="h5" component="h2">
              {profesor.nombre}
            </Typography>
            
            {/*
                {profesor.cursos.map((cursos) => (
                <Typography paragraph variant="body2" component="p">
                    {cursos.nombre}
                </Typography>
                ))}
             */},
            <Typography className={classes.descripcion} gutterBottom variant="body2" component="p">
              {profesor.descripcion}
            </Typography>
            <Typography className={classes.datos} gutterBottom variant="body2" component="p">
              {profesor.calificaciones} calificaciones | {profesor.horas} horas dictadas
            </Typography>            
            
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
