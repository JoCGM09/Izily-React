import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Publicacion from "../components/Publicacion";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import SearchIcon from "@material-ui/icons/Search";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({

    botones: {
        margin: "0px 5px",
        color: "#3493C2",
        fontWeight: "bold",
        height: "40px",
        fontSize: "12px",
      },

      searchInput: {
        opacity: "0.9",
        padding: "0px 5px",
        margin: "0px",
        fontSize: "11px",
        width:"200px",
      },

      gridArriba:{
        paddingTop:"10px",
        display:"flex",
        alignContent:"center",
        flexDirection:"row",
        width:"100%",
      },

      publicacionesContainer:{
          display:"flex",
          flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
      },
}));

function Home() {

const classes = useStyles();

return (
<>

    <Grid align="center" className={classes.gridArriba}
    >
        
        <Grid xs></Grid>
        <Grid xs></Grid>
        <Grid xs></Grid>
        <Grid>
        <TextField
            className={classes.searchInput}
            variant="outlined"
            item
            id="buscador"
            placeholder="Buscar"
            size="small"
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                </InputAdornment>
                ),
            }}
        />
        </Grid>
        

        <Grid xs></Grid>

        <Grid>
        <Button component={Link} 
                to={"/encontrar-un-maestro"} 
                className={classes.botones} 
                variant="outlined"
                size="small"
                >
            Encontrar un maestro
        </Button>
        </Grid>
        

        
        <Grid xs></Grid>
        <Grid xs></Grid>
        <Grid xs></Grid>

    </Grid>
    


    <div className={classes.publicacionesContainer}>
                <Publicacion />
                <Publicacion />
                <Publicacion />

    </div>

</>
);
}

export default Home;
