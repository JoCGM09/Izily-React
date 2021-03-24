//Este componente es una card sola de profesor
import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import StarIcon from "@material-ui/icons/Star";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";

const StyledRating = withStyles({
  iconFilled: {
    color: "#3493C2",
  },
})(Rating);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderRadius: 3,
    "&:hover": {
      backgroundColor: "#FAFAFA",
    },
  },
  cardContent: {
    paddingBottom: "10px",
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
    color: "white",
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
    backgroundColor: "rgba(0,0,0,0)",
    height: "75px",
    overflow: "auto",
    textAlign: "justify",
    padding: "3px 8px 8px 0px",
    marginLeft: "10px",
    marginTop: "5px",
    marginBottom: "5px",
  },
  boton: {
    marginTop: "10px",
    border: "1px solid grey",
    "&:hover": {
      backgroundColor: "none",
    },
  },
  popover: {
    pointerEvents: "none",
    boxShadow: "0px",
    textShadow: "0px",
  },
  paper: {
    padding: "5px",
    boxShadow: "0px",
    textShadow: "0px",
    width: "30px",
    display: "flex",
    justifyContent: "center",
    background: "#A8A8A8",
  },
}));

export default function Profesor({ profesor }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
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
      {/* <CardActionArea component={Link} to={`/perfil/${profesor.id}`}> */}
      <CardContent style={{ paddingBottom: "10px" }}>
        <div className={classes.avatarContainer}>
          <img className={classes.avatar} src={profesor.imageURL} />
          {/* id={`myimg-${profesor.id} */}
          <div
            style={{
              width: "100%",
              marginBottom: "5px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
              component="fieldset"
              margin={0}
              border={0}
              padding={0}
              mb={-1}
              borderColor="transparent"
            >
              <StyledRating
                name="customized-color"
                //defaultValue= {5}
                defaultValue={profesor.puntuacion}
                precision={0.1}
                icon={<StarIcon fontSize="large" />}
                readOnly
              />
            </Box>
            <Popover
              variant="outlined"
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <span className={classes.numero}>{profesor.puntuacion}</span>
            </Popover>
          </div>
          <Typography
            className={classes.nombre}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {profesor.nombre}
          </Typography>

          <Paper
            className={classes.paperPresentacion}
            overflow="scroll"
            elevation={0}
            children={profesor.descripcion}
          />
          <Typography
            className={classes.datos}
            gutterBottom
            variant="body2"
            component="p"
          >
            {/* X calificaciones*/}
            {profesor.calificaciones} calificaciones | {/* X horas dictadas*/}{" "}
            {profesor.horas} horas dictadas
          </Typography>
          <Button
            component={Link}
            to={`/perfil/${profesor.id}`}
            className={classes.boton}
          >
            Conectar
          </Button>
        </div>
      </CardContent>
      {/* </CardActionArea> */}
    </Card>
  );
}
