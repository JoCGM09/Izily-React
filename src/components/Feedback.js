import React, { useState, useEffect } from "react";
import FeedbackForm from "../components/FeedbackForm";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../firebase";

const useStyles = makeStyles((theme) => ({
  gridTotal: {
    paddingTop: "10px",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  root: {
    width: "450px",
    border: "0px",
    boxShadow: "0px",
    display: "flex",
    flexDirection:"column",
    paddingBottom: "0px",
    margin:"20px 0px"
  },
  header:{
    paddingRight:"15px",
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    textAlign:"left",
  },
  CardHeader:{
    paddingTop: "15px",
    paddingLeft:"15px",
  },
  containerContent: {
    paddingTop:"0px",
    widht:"100%",
  },
  Content: {
    widht:"100px",
    color:"black",
    fontSize:"14px",
    display:"flex",
    justifyContent:"left",
    padding:"0px 10px 5px 0px",
    // borderRadius:"10px",
    // background:"white",
    textAlign:"left",
    // border: "1px solid #C7C6C6",
  },
}));

function Feedback() {
  const classes = useStyles();
  const [feedback, setFeedback] = useState([]);

  const addFeedback = async (feedbackObject) => {
    await db.collection("opiniones").doc().set(feedbackObject);
  };

  const getFeedback = async () => {
    const feedbackRef = await db.collection("opiniones");
    feedbackRef
      .get()
      .then((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setFeedback(docs);
        console.log(docs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <Grid align="center" className={classes.gridTotal}>
      <Grid xs></Grid>
      <Grid >
      <FeedbackForm addFeedback={addFeedback} />
        {feedback && (
          <div>
            {feedback.map((feedbackElement) => 
              <Card className={classes.root}>
                <div className={classes.header}>
                <CardHeader
                  className={classes.CardHeader}
                  avatar={
                    <Avatar aria-label="recipe" alt={feedbackElement.name} src={feedbackElement.imageURL} />
                  }
                  title={feedbackElement.name}
                  subheader={feedbackElement.date}
                />
                </div>
                
                <CardContent className={classes.containerContent}>
                  <Typography className={classes.Content} 
                    variant="body2" color="textSecondary" component="p"
                  >
                    {feedbackElement.content}
                  </Typography>
                </CardContent>
                
              </Card>
              )}
            </div>
        )}
      </Grid>
      <Grid xs></Grid>
    </Grid>
  );
}

export default Feedback;
