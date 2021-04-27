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
import WhatsAppIcon from "@material-ui/icons/WhatsApp";

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
    maxWidth: "650px",
    marginRight: "20px",
    padding: "15px",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "0px",
    paddingBottom: "10px",
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
  buttonWhy: {
    color: "black",
    fontSize: "14px",
    margin: "0px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  correo: {
    color: "#3493C2",
    fontWeight: "bold",
    "&:hover": {
      fontWeight: "bold",
      color: "#3493C2",
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  buttonWhatsApp: {
    background: "white",
    color: "#757575",
    border: "1px solid #25D366",
    fontSize: "11px",
    height: "25px",
    fontWeight: "bold",
    "&:hover": {
      // backgroundColor: "#DAF1FC",
    },
  },
}));

export default function RecipeReviewCard(props) {
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
    <div style={{ fontFamily: "Roboto" }}>
      <p onClick={handleOpen} className={classes.buttonWhy}>
        ¿Por qué debo brindar mi número de WhatsApp?
      </p>
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
            title="¿Por qué debo brindar mi número de WhatsApp?"
          />
          <Divider />
          <CardContent className={classes.containerContent}>
            <p>
              Tu número de WhatsApp es necesario para que tus futuros alumnos
              puedan contactarte con un solo click. Recuerda escribir tu número
              de teléfono en formato internacional. No incluyas los ceros,
              espacios, paréntesis ni guiones cuando añadas el número de
              teléfono en este formato.
              <br />
              Puedes verificar si pusiste correctamente tu número dando click
              aquí:
            </p>
            <Button
              variant="contained"
              size="medium"
              target="_blank"
              href={"https://wa.me/" + `${props.numero}`}
              color="inherit"
              className={classes.buttonWhatsApp}
              startIcon={<WhatsAppIcon style={{ color: "#25D366" }} />}
              disableElevation="true"
            >
              Verificar mi número de WhatsApp
            </Button>
          </CardContent>
          <Divider />
          <Grid className={classes.IconosContainer}>
            <Grid item style={{ display: "flex", justifyContent: "flex-end" }}>
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
