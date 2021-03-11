import React, { useEffect, useState } from "react";
import notfound from "../assets/images/NotFound.png";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import NavBar from "../components/Navbar"




const useStyles = makeStyles((theme) => ({
    root:{
        padding:20,
        display:"flex",
        justifyItems:"center",

        //paddingTop:"50px",
        //backgroundColor:"red",
    },
    gridcontainer:{
        display:"flex",
        flexDirection:"row",
    },
    gridimagen1:{
        display:"flex",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
    },
    imagen1:{
        width:"50%",
        height:"auto",
        //margin:"40px"
    },
    botones: {
        margin: "0px 5px",
        color: "#3493C2",
        fontWeight: "bold",
        height: "40px",
        fontSize: "12px",
    },
    gridtexto:{
        display:"flex",
        flexDirection:"column",
        alignItems:"start",
        justifyContent:"center",
    },
    h1:{
        color: "#3493C2",
        justify:"center",
    }
}));



export default function NotFound (){

    const classes = useStyles();

    return(
    <div className={classes.root}>
    
    <Grid container align="" className={classes.gridcontainer}>
    <Grid sm></Grid>
    <Grid sm></Grid>

    
        <Grid item xs={12} sm={4} md={4} lg={4} className={classes.gridimagen1}>
            <img src={notfound} className={classes.imagen1} alt="NotFound"/>
        </Grid>
    
        <Grid item xs={12} sm={5} md={5} lg={5} className={classes.gridtexto}>
            <h1 className={classes.h1}>¡Uy, problemas en el paraiso!</h1>
            <h2>No hemos podido encontrar la página que buscabas :(</h2>
            <h3>Incluso en Izily, estos casos son muy raros, tanto como que tu Crush te haga caso.</h3>
            <h3>Mejor sigue estudiando :D</h3>
            <Button 
                href="javascript:history.back()"
                className={classes.botones} 
                variant="outlined"
                size="small"
            >
                            Volver atrás
            </Button>
        </Grid>
        <Grid sm></Grid>
        <Grid sm></Grid>
        
        
    </Grid>
    
    </div>
    
    );
}

