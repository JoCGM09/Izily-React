import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 550,
    minWidth:"100%",
    margin: "10px 0px",
  },
  media: {
    width:"100%",
    height: "auto",
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  Content: {
    widht:"100px",
    color:"black",
    // display: "flex",
    // alignContent:"start",
    //flexWrap: "wrap",
    //hyphens: "auto",
    //wordBreak:"break-all",
    
    
  },
  containerContent: {
    paddingTop:"0px",
    widht:"100%",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor:props.color}}>
            {props.letter}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.name}
        subheader={props.date}
      />
      <CardContent className={classes.containerContent}>
        <Typography className={classes.Content} 
          variant="body2" color="textSecondary" component="p"
        >
          {props.content}
        </Typography>
      </CardContent>
      {/* <CardMedia
        className={classes.media}
        src={props.image}
        title="image"
      /> */}
      <img
          src={props.imagen}
          className={classes.media}
          alt=""
      />
      
    </Card>
  );
}
