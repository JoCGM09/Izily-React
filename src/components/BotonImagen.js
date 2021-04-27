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

const useStyles = makeStyles((themes) => ({
  media: {
    // float: "left",
    maxWidth: "350px",
    maxHeight: "200px",
    margin: "0px",
    visibility: "hidden",
  },
  media2: {
    maxWidth: "90%",
    maxHeight: "90%",
    // visibility: "hidden",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  containerImage: {
    float: "left",
    // display: "table",
    padding: "0px",
    // maxWidth: "200px",
    // maxHeight: "200px",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "soft-light",
    // backgroundColor: "black",
    "&:hover": {
      backgroundColor: "rgb(0, 0, 0, 0.1)",
      cursor: "zoom-in",
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
      <div
        onClick={handleOpen}
        variant="contained"
        color="inherit"
        size="small"
        style={{ backgroundImage: `url("${props.photoUrl}")` }}
        className={classes.containerImage}
      >
        <img className={classes.media} src={props.photoUrl} />
      </div>
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
        <img className={classes.media2} src={props.photoUrl} />
      </Modal>
    </div>
  );
}
