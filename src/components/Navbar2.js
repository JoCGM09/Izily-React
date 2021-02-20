import React from "react";
import logo from "../assets/images/logoprincipal.webp";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  makeStyles,
  Grid,
  Button,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "../components/Menu";
import PersonIcon from "@material-ui/icons/Person";
import { Link } from "react-router-dom";

//estilos de la barra de navegacion
const useStyles = makeStyles({
  root: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 0px 4px 0 rgba(0, 0, 0, 0.2)",
  },

  

  searchImput: {
    opacity: "0.9",
    padding: "0px 5px",
    margin: "0px 40px",
    fontSize: "0.8rem",
    //height: "25px",
  },

  logo: {
    width: 64,
    height: 40,
  },

  botones: {
    margin: "0px 5px",
    color: "#3493C2",
    fontWeight: "bold",
  },
});

//componente
function Navbar() {
  const classes = useStyles();

  return (
    
    <AppBar  position="absolute"  className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Button disabled>
              <img src={logo} className={classes.logo} />
            </Button>
          </Grid>
          <TextField
            variant="outlined"
            className={classes.searchImput}
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
          {/* <InputBase>
              placeholder="Buscar" className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            </InputBase> */}

          <Grid item sm></Grid>
          <Grid item>
            <Button className={classes.botones} variant="outlined">
              Inicio
            </Button>
            <Button component={Link} to={"/"} className={classes.botones} variant="outlined">
              Encontrar un maestro
            </Button>
            <Button className={classes.botones} disabled>
              NOMBRE
            </Button>

            <IconButton>
              <Badge badgeContent={4}>
                <MessageIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              <Badge badgeContent={4}>
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
            <IconButton>
              {/*<Link to="/perfil">*/}
                <Badge badgeContent={4}>
                  <PersonIcon fontSize="small" />
                </Badge>
              {/*<Link />*/}
            </IconButton>
          </Grid>
          <Menu item />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
