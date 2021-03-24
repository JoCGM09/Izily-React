import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import clsx from 'clsx';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from "@material-ui/core/Divider";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CrearComentario from "../components/CrearComentario";

const useStyles = makeStyles((theme) => ({
  root: {
    width:"100%",
    border:"0px",
    boxShadow:"0px",
    display:"flex",
    paddingBottom:"0px",
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
    transform: 'red',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },

  avatarContainer:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"start",
    paddingTop:"10px",
    paddingBottom:"0px",
    paddingRight:"0px",
    alignContent:"start",
    justifyItems:"end",
    alignItems:"end"

  },

  nombre: {
    color:"black",
    paddingLeft:"10px",
    fontSize:"14px",
    paddingBottom:"10px",
    // display: "flex",
    // alignContent:"start",
    //flexWrap: "wrap",
    //hyphens: "auto",
    //wordBreak:"break-all",
    
    
  },
  containerContent: {
    paddingTop:"20px",
    paddingBottom:"0px",
    paddingLeft:"0px",
    widht:"100%",
  },
  comentarioSContainer:{
    padding:"0px",
    margin:"0px",
  },
  comentario:{
    padding:"5px 10px",
    borderRadius:"15px",
    color:"black",
    border:"1px solid #C7C6C6",
    widht:"100%",
  }
  
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <div style={{padding:"0px 10px"}}>
          <Divider  />
      </div>

      <Card className={classes.root} variant="outlined">

        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar} style={{backgroundColor:props.color, margin:"0px 0px 0px 10px",}}>
              {props.letter}
            </Avatar>
          }
          className={classes.avatarContainer}
        />
        <CardContent className={classes.containerContent}>
          <Typography className={classes.nombre} 
            variant="body2" color="textSecondary" component="p"
          >
            {props.name}
          </Typography>
          <div style={{padding:"0px 10px"}}>
          <Divider  />
          </div>
          <div style={{width:"100%"}}>
            <Typography className={classes.comentario} 
              variant="body2" color="textSecondary" component="p"
            >
              {props.comentario}
            </Typography>
          </div>
          
        </CardContent>
        {/* <CardMedia
          className={classes.media}
          src={props.image}
          title="image"
        /> */}
      </Card>

    </div>

    
  );
}
