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
    fontSize: "11px",
    height: "25px",
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

  const middle = () => {
    setOpen(false);
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);

  return (
    <div>
      <Button
        type="button"
        onClick={handleOpen}
        variant="outlined"
        size="small"
        startIcon={<StarIcon />}
        className={classes.PublicarButton}
      >
        Calificar
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeBeforeTransition
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
            title="¿Cómo calificarías esta mentoría?"
          />

          <div className={classes.rootStars}>
            <StyledRating
              className={classes.stars}
              name="customized-color"
              value={value}
              precision={1}
              icon={<StarIcon fontSize="large" />}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {value !== null && (
              <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </div>

          <CardContent align="center" className={classes.containerContent}>
            <p style={{ display: "flex", justify: "start" }}>
              Déjanos un Comentario:
            </p>
            <TextareaAutosize
              className={classes.inputText}
              aria-label="minimum height"
              placeholder="Escribir comentario..."
              widht="500px"
              rowsMin={3}
            />
          </CardContent>
          <Grid container className={classes.IconosContainer}>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Button
                className={classes.PublicarButton}
                onClick={middle}
                variant="outlined"
                size="small"
              >
                Enviar
              </Button>
            </Grid>

            <Grid item style={{ display: "flex", flexDirection: "row" }}>
              <Grid item>
                <IconButton>
                  <AddAPhotoIcon fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card className={classes.root2}>
          <CardHeader
            // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title="Gracias por Ayudarnos a Mejorar"
          />

          <CardContent align="center" className={classes.containerContent2}>
            <p style={{ display: "flex", textAlign: "left" }}>
              Con tu comentario ayudas a mejorar a tu mentor, y ayudas a nuevos
              usuarios a poder elegir mejor a sus mentores :)
            </p>
          </CardContent>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "15px",
            }}
          >
            <Button
              className={classes.PublicarButton}
              onClick={handleClose2}
              variant="outlined"
              size="small"
            >
              Terminar
            </Button>
          </Grid>
        </Card>
      </Modal>
    </div>
  );
}
