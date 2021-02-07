//Este componente es una card sola

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//Cosas raras de MUI

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
    marginBottom: 5,
  },
  avatarContainer: {
    border: 5,
    marginBottom: 15,
    textAlign: "center",
  },
});

export default function Profesor({ profesor }) {
  const classes = useStyles();
  //imagen random
  const defaultAvatar = "https://i.pravatar.cc/300";
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <div className={classes.avatarContainer}>
            <img className={classes.avatar} src={defaultAvatar} />
            <Typography gutterBottom variant="h5" component="h2">
              {profesor.nombre}
            </Typography>
            {profesor.cursos.map((cursos) => (
              <Typography paragraph variant="body2" component="p">
                {cursos.nombre}
              </Typography>
            ))}
            <Typography gutterBottom variant="body2" component="p">
              {profesor.descripcion}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
