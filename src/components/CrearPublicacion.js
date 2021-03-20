import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import {IconButton} from "@material-ui/core";
import TheatersIcon from '@material-ui/icons/Theaters';


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
    padding:"0px 10px",
    widht:"100%",
    display:"flex",
    justifyContent:"center",
    
  },
  IconosContainer: {
    padding:"10px",
    justifyContent:"space-between"
  },
  PublicarButton: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "30px",
    fontSize: "12px",
  },

  inputText: {
    outline:"none",
    resize: "inherit",
    fontSize:"14px",
    fontFamily:"arial",
    border:"1px solid #C7C6C6",
    borderRadius:"10px",
    width:"100%",
    padding:"10px",
    boxShadow: "rgba(0, 0, 0, 1)",
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
        
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title="Crear una Publicación"
      />
      
      <CardContent align="center" className={classes.containerContent}>

      <TextareaAutosize className={classes.inputText}
          aria-label="minimum height" placeholder="Escribir publicación..." widht="500px" rowsMin={3}/>
      </CardContent>
      <Grid container className={classes.IconosContainer}>
        <Grid item style={{display:"flex", alignItems:"center"}}>
            <Button className={classes.PublicarButton} variant="outlined" size="small">
              Publicar
            </Button>
        </Grid>

        <Grid item style={{display: "flex", flexDirection: "row",}}>
        <Grid item>
        <IconButton>  
                  <AddAPhotoIcon  fontSize="medium" />     
        </IconButton>
        </Grid>
        <Grid item>
        <IconButton>  
                  <TheatersIcon  fontSize="medium" />     
        </IconButton>
        </Grid>
        </Grid>

        
        
      </Grid>
      
    </Card>
  );
}
