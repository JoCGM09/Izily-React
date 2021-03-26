import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from "@material-ui/core/Divider";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CrearComentario from "../components/CrearComentario";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 550,
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
    marginTop:"10px",
    marginBottom:"10px",
    "&:hover":{
      textDecoration:"underline",
      cursor:"pointer",
    },
  },

  interesadosP:{
    marginLeft:"20px", 
    marginTop:"10px",
    marginBottom:"10px",
    "&:hover":{
      cursor:"default",
    },
  },

  CardHeader:{
    paddingTop: "15px",
    paddingLeft:"15px",
  },

  header:{
    paddingRight:"15px",
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

  const handleClick = () => {
    
  }

  return (
    <Card className={classes.root}>
      <div className={classes.header}>
      <CardHeader
        className={classes.CardHeader}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} alt={props.name} src={props.imgeURL} />
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={props.name}
        subheader={props.date}
      />
      
        {/* {props.tag} */}

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
      {/* <img
          src={props?.imagen}
          className={classes.media}
          alt=" "
      /> */}
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


      <CardActions style={{display:"flex", justifyContent:"space-around", padding:"5px",}}>
        <Button aria-label="add to favorites" style={{height:"35px",}}>
          {/*<FavoriteIcon /> <p style={{marginLeft:"10px"}}>Me Interesa</p>*/}
          <FormControlLabel
          control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
          label="Me interesa"
          onClick={handleClick}
        />
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
