import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import logo from "../assets/images/logoprincipal.webp";
import {
  makeStyles,
  Grid,
  Button,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';

import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "../components/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';


import useMediaQuery from '@material-ui/core/useMediaQuery';



//const matches = useMediaQuery('(min-width:600px)');

// const styles = theme => ({

//   gridPadre: {
//     display: "flex",
//     alignItems: "center",
//     [theme.breackpoints.up('md')]:{
//       height: "56px",
//     },

//   },

// });

const useStyles = makeStyles ((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 4px 0 rgba(0, 0, 0, 0.2)",
    
    // display: "flex",
    // alignItems: "center",
    // flexDirection: "row",
    // width: "100%",
  },

  
  // gridPadre: {
  //   display: "flex",
    
  //   alignItems: "center",
    

  // },
  gridPadre: {
        display: "flex",
        alignItems: "center",
        // [theme.breackpoints.up('md')]:{
        //   minHeight: "56px",
    },
  

  gridHijo: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    //background: "green",
  },


  searchInput: {
    opacity: "0.9",
    padding: "0px 5px",
    margin: "0px 40px",
    fontSize: "11px",
    //height: "25px",
  },

  logo: {
    width: 48,
    height: 30,
  },

  botones: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
    height: "25px",
    fontSize: "11px",
  },

  menu: {
    padding: "0px",
  },

  icon:{
    padding: "0px 5px 0px 5px",
  },



}));

function ElevationScroll(props) {

  
  
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const classes = useStyles();
  const {usuarioActual} = useAuth()
  return (
    <React.Fragment>
      
      <ElevationScroll {...props}>
        <AppBar  className={classes.root}>
        <Toolbar>
          <Grid className={classes.gridPadre} 
                container 
                alignItems="center">
            <Grid className={classes.gridHijo} item>
              <Button disabled>
                <img src={logo} className={classes.logo} />
              </Button>
            </Grid>
            {/* <TextField
              variant="outlined"
              className={classes.searchInput}
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
            /> */}


            {/* <InputBase>
                placeholder="Buscar" className={classes.searchInput}
                startAdornment={<SearchIcon fontSize="small" />}
              </InputBase> */}

            <Grid className={classes.gridHijo} item sm></Grid> 






            <Grid className={classes.gridHijo} item>
              <Button component={Link} to={"/inicio"} className={classes.botones} variant="outlined">
                Inicio
              </Button>
              {/* <Button component={Link} to={"/encontrar-un-maestro"} className={classes.botones} variant="outlined">
                Encontrar un maestro
              </Button> */}
              <Button className={classes.botones} disabled>
              {usuarioActual.email}
              </Button>

              <IconButton className={classes.icon}>
                <Badge badgeContent={4}>
                  <MessageIcon  fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton className={classes.icon}>
                <Badge  badgeContent={4}>
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
              <IconButton className={classes.icon}>
                {/*<Link to="/perfil">*/}
                  <Badge badgeContent={4}>
                    <PersonIcon fontSize="small" />
                  </Badge>
                {/*<Link />*/}
              </IconButton>
            </Grid>
            <Grid className={classes.gridHijo} item>
              <Menu className={classes.menu} item />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </ElevationScroll> 
    </React.Fragment>
  );
}
