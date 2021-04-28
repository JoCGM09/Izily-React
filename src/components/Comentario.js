import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { db } from "../firebase";
import { useHistory } from "react-router-dom";
import BotonImagen from "../components/BotonImagen";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    border: "0px",
    boxShadow: "0px",
    display: "flex",
    paddingBottom: "0px",
    height: "auto",
  },
  media: {
    // width: "auto",
    // height: "200px",
    maxWidth: "80%",
    maxHeight: "200px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "red",
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },

  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    paddingTop: "10px",
    paddingBottom: "0px",
    paddingRight: "0px",
    // alignContent: "start",
    // justifyItems: "end",
    // alignItems: "end",
    height: "50px",
  },

  nombre: {
    color: "black",
    fontSize: "14px",
    fontWeight: 600,
    "&:hover": {
      textDecoration: "underline",
      cursor: "pointer",
    },
  },
  containerContent: {
    paddingTop: "15px",
    paddingBottom: "10px",
    paddingRight: "10px",
    widht: "100%",
  },
  comentarioSContainer: {
    padding: "0px",
    margin: "0px",
  },
  comentario: {
    color: "black",
    widht: "100%",
  },
  avatar: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [error, setError] = useState("");
  const history = useHistory();

  const [comments, setComments] = useState([]);

  const getComments = () => {
    db.collection("publicaciones")
      .doc(`${props.screamID}`)
      .collection("coments")
      .orderBy("dateNumber")
      .onSnapshot((querySnapshot) => {
        const comments = [];
        querySnapshot.forEach((doc) => {
          // comments.push(doc.data());
          comments.push({ ...doc.data(), id: doc.id });
        });
        // console.log("comments", comments);
        setComments(comments);
      });
  };

  useEffect(() => {
    getComments();
  }, [props]);

  return (
    <div style={{ fontFamily: "Roboto" }}>
      {comments && (
        <div>
          {comments.map((comment) => (
            <div style={{ margin: "0px", padding: "0px" }}>
              <div style={{ padding: "0px 10px" }}>
                <Divider />
              </div>

              <Card className={classes.root} variant="outlined">
                <CardHeader
                  avatar={
                    <Avatar
                      aria-label="recipe"
                      className={classes.avatar}
                      style={{
                        margin: "0px 0px 0px 10px",
                      }}
                      alt={comment.name}
                      src={comment.imageURL}
                      onClick={async function goProfile() {
                        setError("");
                        try {
                          history.push(`/perfil/${comment.idPerfil}`);
                        } catch {
                          setError("Ocurrió un error al salir de la cuenta");
                        }
                      }}
                    />
                  }
                  className={classes.avatarContainer}
                />
                <div className={classes.containerContent}>
                  <div style={{ display: "flex" }}>
                    <Typography
                      className={classes.nombre}
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      onClick={async function goProfile() {
                        setError("");
                        try {
                          history.push(`/perfil/${comment.idPerfil}`);
                        } catch {
                          setError("Ocurrió un error al salir de la cuenta");
                        }
                      }}
                    >
                      {comment.name}
                    </Typography>
                    <p
                      style={{
                        margin: "0px 0px 0px 5px",
                        fontSize: "11.5px",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "300",
                      }}
                    >
                      -
                      {comment.dateNumber &&
                        " " +
                          moment(comment.dateNumber.toDate())
                            .locale("es")
                            .format("D") +
                          " " +
                          moment(comment.dateNumber.toDate())
                            .locale("es")
                            .format("MMMM") +
                          ", " +
                          moment(comment.dateNumber.toDate())
                            .locale("es")
                            .format("h:mm a")}
                    </p>
                  </div>
                  <Typography
                    className={classes.comentario}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {comment.content}
                  </Typography>
                  {comment.photoUrl != "" && (
                    // <img
                    //   src={comment?.photoUrl}
                    //   className={classes.media}
                    //   alt=""
                    // />
                    <BotonImagen photoUrl={comment.photoUrl} />
                  )}
                </div>
                {/* <CardMedia
          className={classes.media}
          src={props.image}
          title="image"
        /> */}
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
