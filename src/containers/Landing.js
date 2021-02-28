import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Publicacion from "../components/Publicacion";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import loginimage from "../assets/images/loginimage.png";
import fondolanding from "../assets/images/fondolanding.jpg";
import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";
import FunctionsIcon from '@material-ui/icons/Functions';
import { Icon } from "@material-ui/core";
import CarouselLanding from "../components/CarouselLanding";

const useStyles = makeStyles((theme) => ({
    
    Div1:{
        //backgroundImage: `url(${fondolanding})`,
        backgroundColor: '#E6E7E8', 
        backgroundRepeat:"no-repeat",
        //backgroundAttachment:"fixed",
        backgroundPosition:"right bottom",
        backgroundSize:"cover",
        //height:"300px",
        //height:"500px",
        width:"100%",
        margin: "0px",
        paddingBottom:"15px",
    },
    titulo:{
        paddingLeft:"50px",
        height:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        fontSize:"35px",
    },
    renglon:{
        display: "flex",
        margin:"0px",
    },
    tituloblanco:{
        color: "white",
        margin: "10px 0px",
    },
    tituloazul:{
        color:"#3493C2",
        margin: "10px 0px",
    },
    tituloblancomedio:{
        color: "white",
        margin: "5px 0px",
    },
    tituloazulmedio:{
        color:"#3493C2",
        margin: "5px 25px 5px 0px",
    },
    Div2:{
        padding:"20px",
        display:"flex",
        flexDirection:"column",
        width:"100%",
        
        alignItems:"center",
    },
    Grid2:{
        width:"100%",
        padding:"20px",
        justifyContent:"center",
    },
    Grid2Item:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        width:"30%",
        //height:"40px",
        background:"blue",
    },
}));

function Landing() {

const classes = useStyles();
//const image = require("../assets/images/imagen.jpg");
return (
<>
    <div className={classes.Div1}>
        <Grid className={classes.titulo}>
            <h1 className={classes.tituloblanco}>Aprende para</h1>
            <div className={classes.renglon}>
            <h1 className={classes.tituloazulmedio}>enseñar</h1> <h1 className={classes.tituloblancomedio}>y</h1>
            </div>
            <h1 className={classes.tituloblanco}>enseña para</h1>
            <h1 className={classes.tituloazul}>aprender</h1>

        </Grid>
    </div>
    <div className={classes.Div2}>
        Cursos más buscados
        <Grid className={classes.Grid2} container sm={12} md={6} lg={4}>
            <Grid className={classes.Grid2Item} item>
                <FunctionsIcon fontSize="medium" />
                <div>
                    <p>Matemática</p>
                </div>
            </Grid>
            <Grid className={classes.Grid2Item} item>
                    dasdasdas
            </Grid>
            <Grid className={classes.Grid2Item} item>
                    dasdasdas
            </Grid>
            <Grid className={classes.Grid2Item} item>
                    dasdasdas
            </Grid>
            <Grid className={classes.Grid2Item} item>
                    dasdasdas
            </Grid>
            <Grid className={classes.Grid2Item} item>
                    dasdasdas
            </Grid>
        </Grid>
    </div>
    
</> 
);
}

export default Landing;
