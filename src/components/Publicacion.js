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
import Comentario from "../components/Comentario";
import Problema1 from "../assets/images/problema1.jpeg";




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
    transform: 'red',
  },
  // avatar: {
  //   backgroundColor: red[500],
  // },
  Content: {
    widht:"100px",
    color:"black",
    fontSize:"14px",
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
  comentarioSContainer:{
    padding:"0px",
    margin:"0px",
  },

  comentariosP:{
    marginRight:"20px", 
    "&:hover":{
      textDecoration:"underline",
      cursor:"pointer",
    },
  },

  interesadosP:{
    marginLeft:"20px", 
    "&:hover":{
      cursor:"default",
    },
  },

  
  header:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
  }
  
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
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
      
        {props.tag}

      </div>
      
      <CardContent className={classes.containerContent}>
        <Typography className={classes.Content} 
          variant="body2" color="textSecondary" component="p"
        >
          {props.content}
        </Typography>
      </CardContent>
      {/* <CardMedia
        className={classes.media}
        image={props.imagen}
        title="image"
      /> */}
      <img
          src={props?.imagen}
          className={classes.media}
          alt=""
      />
      <Grid container style={{display:"flex", justifyContent:"space-between",}}>

        <Grid  style={{"&:hover":{cursor:"default"}}} item>
          <p className={classes.interesadosP}>A {props.interesados} personas les interesa esto.</p>
        </Grid>

        <Grid item>
          <p className={classes.comentariosP} onClick={handleExpandClick}>{props.comentarios} comentarios</p>
        </Grid>

      </Grid>

      <div style={{padding:"0px 10px"}}>
        <Divider  />
      </div>


      <CardActions style={{display:"flex", justifyContent:"space-around", padding:"10px",}}>
        <Button aria-label="add to favorites" style={{height:"35px",}}>
          <FavoriteIcon /> <p style={{marginLeft:"10px"}}>Me Interesa</p>
        </Button>
        <Button onClick={handleExpandClick} aria-label="share" style={{height:"35px",}}>
          <ChatBubbleOutlineIcon /> <p style={{marginLeft:"10px"}}>Comentar</p>
        </Button>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
      
      <CrearComentario/>
      
      <Collapse className={classes.comentarioSContainer} in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.comentarioSContainer}>
          
          {props.children}

        </CardContent>
      </Collapse>    


    </Card>
  );
}
