//Este componente es una card sola
import React from 'react'
import Link from "react-router-dom/Link"
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import StarIcon from '@material-ui/icons/Star';

const StyledRating = withStyles({
  iconFilled: {
    color: '#3493C2',
  },
 
})(Rating);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: 3,
  },
  cardContent: {
    margin: "0px",
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
    marginBottom: 3,
    marginTop: 2,
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
    margin: "0px",
  },
  descripcion: {
    padding: 0,
    margin: 0,
  },
  nombre: {
    padding: 0,
    margin: 0,
    width: "100%",
    whiteSpace: "nowrap",
    textAlign: "center",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  paperPresentacion: {
    height: "85px",
    overflow: "auto",
    textAlign: "justify",
    padding: "3px 8px 8px 0px",
    marginLeft: "10px",
    marginTop: "5px",
    marginBottom: "15px",
  },
}));

export default function Profesor({ profesor }) {
  const classes = useStyles();
  // const defaultAvatar = "https://i.pravatar.cc/300";

  // const profileRef = storage.ref('users/'+profesor.loginid+'/fotodeperfil.jpeg');
  // profileRef.getDownloadURL()
  // .then((url)=>{
  //   var img = document.getElementById(`myimg-${profesor.id}`);
  //   img.src = url;
  // }).catch(()=>{
  //   var img = document.getElementById(`myimg-${profesor.id}`);
  //   img.src = 'https://i.pravatar.cc/300';
  // });

  return (
    <Card className={classes.root}>
      <CardActionArea component={Link} to={`/profesores/${profesor.id}`}>
        <CardContent >
          <div className={classes.avatarContainer}>
            <img className={classes.avatar} src={profesor.imageURL}/>
          {/* id={`myimg-${profesor.id} */}
            <div>
              <Box component="fieldset" margin={0} border={0} padding={0} mb={-1} borderColor="transparent">
              <StyledRating 
              name="customized-color"
              defaultValue= {5}
              //defaultValue= {profesor.puntuacion}
              precision={0.1}
              icon={<StarIcon fontSize="large" />}
              readOnly
              /></Box>
              <span className={classes.numero}>{/*profesor.puntuacion*/}</span>
            </div>
            <Typography className={classes.nombre} gutterBottom variant="h5" component="h2">
              {profesor.nombre}
            </Typography>

            <Paper className={classes.paperPresentacion}
                  overflow= "scroll"
                  elevation={0}
                  children={profesor.descripcion}
                />
            <Typography className={classes.datos} gutterBottom variant="body2" component="p">
              {/* X calificaciones*/}{ profesor.calificaciones} calificaciones | {/* X horas dictadas*/} {profesor.horas} horas dictadas
            </Typography>            
            
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}