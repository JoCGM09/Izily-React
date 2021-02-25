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
        fontSize: "13px",
      },

      searchInput: {
        opacity: "0.9",
        padding: "0px 5px",
        margin: "0px",
        fontSize: "11px",
      },

      gridArriba:{
        alignContent:"center",
        width:"100%",
      },

      containerArriba:{
        //flexDirection:"row",
        //width: "800px",
        //display:"flex",
        width:"90%",
        //alignItems:"center",
        //alignContent:"space-between",
        justifyItems:"space-between",
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
        <div className={classes.containerArriba}>
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

        {/* <Grid></Grid> */}

        <Button component={Link} to={"/encontrar-un-maestro"} className={classes.botones} variant="outlined">
            Encontrar un maestro
        </Button>

        </div>
        

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
