import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import StarIcon from "@material-ui/icons/Star";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Divider from "@material-ui/core/Divider";


const labels = {
  0.5: "Useless",
  1: "Muy Mala",
  1.5: "Poor",
  2: "Mala",
  2.5: "Ok",
  3: "Regular",
  3.5: "Good",
  4: "Buena",
  4.5: "Excellent",
  5: "Excelente",
};

const StyledRating = withStyles({
  iconFilled: {
    color: "#3493C2",
  },
})(Rating);

const useStyles = makeStyles((theme) => ({
  rootStars: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  stars: {
    fontSize: "35px",
  },

  root: {
    minWidth: "550px",
    marginRight: "20px",
    padding:"15px",
  },
  root2: {
    maxWidth: "550px",
    marginRight: "20px",
  },
  media: {
    width: "100%",
    height: "auto",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  Content: {
    widht: "100px",
    color: "black",
  },
  containerContent: {
    paddingTop: "0px",
    paddingBottom: "0px",
    widht: "100%",
  },
  containerContent2: {
    display: "flex",
    justifyContent: "start",
    paddingTop: "0px",
    paddingBottom: "0px",
    widht: "100%",
  },
  IconosContainer: {
    padding: "10px",
    justifyContent: "space-between",
  },
  PublicarButton: {
    background: "white",
    color: "#3493C2",
    border: "1px solid #3493C2",
    fontSize: "14px",
    height: "30px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#DAF1FC",
    },
  },

  inputText: {
    outline: "none",
    resize: "inherit",
    fontSize: "14px",
    fontFamily: "arial",
    border: "1px solid #C7C6C6",
    borderRadius: "10px",
    width: "95%",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 1)",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  buttonConvertirmeMentor: {
    background: "white",
    color: "#3493C2",
    marginTop: "10px",
    border: "1px solid #3493C2",
    fontSize: "15px",
    height: "70px",
    width: "220px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#DAF1FC",
    },
  },
  correo: {
    color:"#3493C2",
    fontWeight:"bold",
    "&:hover":{
      fontWeight:"bold",
      color:"#3493C2",
      textDecoration:"underline",
      cursor:"pointer",
    },
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        size="small"
        className={classes.buttonConvertirmeMentor}
        startIcon={
            <img
            style={{
            marginLeft: "5px",
            height: "45px",
            width: "auto",
            }}
            src="https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/icons%2FConvertirmeEnProfesor.png?alt=media&token=a45096cb-1a3b-4134-811c-aaba4103528f"
            />
            }
            disableElevation="true"
        >
        Convertirme en Mentor
    </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card className={classes.root}>
          <CardHeader
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title="Gracias por formar parte de Izily"
          />
          <Divider/>
          <CardContent className={classes.containerContent}>
            <p>
              Para convertirte en un mentor de Izily contáctanos a nuestro correo institucional haciendo click aquí:
            </p>
            <a target="_blank" className={classes.correo} href="https://mail.google.com/mail/u/0/?fs=1&to=aprendeizily@gmail.com%20&su=QUIERO%20CONVERTIRME%20EN%20MENTOR&body=(Ingrese%20aqu%C3%AD%20sus%20nombres%20y%20apellidos,%20n%C3%BAmero%20de%20celular(WhatsApp),%20cursos%20que%20desea%20enseñar%20y%20el%20respectivo%20nivel%20(escolar,%20preuniversitario%20y%20universitario),%20y%20el%20link%20de%20su%20perfil%20en%20Izily.%20Este%20%C3%BAltimo%20puede%20obtenerlo%20yendo%20a%20su%20perfil%20dentro%20de%20la%20plataforma%20de%20Izily%20y%20copiando%20el%20URL)&tf=cm">
              aprendeizily@gmail.com
            </a>
          </CardContent>
          <Grid className={classes.IconosContainer}>
            <Grid item style={{ display: "flex", justifyContent: "center" }}>
              <Button
                className={classes.PublicarButton}
                onClick={handleClose}
                variant="outlined"
                size="medium"
              >
                Cerrar
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>

    </div>
  );
}
