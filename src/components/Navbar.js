import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  makeStyles,
  Grid,
  ButtonBase,
  InputBase,
  Button,
  IconButton,
  Badge,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import MessageIcon from "@material-ui/icons/Message";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "../components/Menu";
import PersonIcon from "@material-ui/icons/Person";

//estilos de la barra de navegacion
const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
  },

  searchImput: {
    opacity: "0.6",
    padding: "0px 5px",
    margin: "0px 80px",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: "50px",
    },
  },
});

//componente
function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="absolute" className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Button>
              <img src="" />
            </Button>
            <InputBase
              placeholder="Buscar"
              className={classes.searchInput}
              startAdornment={<SearchIcon fontSize="small" />}
            />
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Button>Inicio</Button>
            <Button>Encontrar un maestro</Button>

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
              <Badge>
                <PersonIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Grid>
          <Menu item />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
