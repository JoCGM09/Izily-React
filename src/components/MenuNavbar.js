import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {useState } from "react";

const useStyles = makeStyles((theme) => ({
  item:{
    
    "&:onClick":{
      // backgroundColor:"rgba(255, 255, 255, 0)",
      backgroundColor:"black",
    },
  }
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    marginLeft:"-10px",
  },

})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    //marginLeft:"40px",
    "&:focus": {
      backgroundColor: "",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "",
      },
    },
  },
}))(MenuItem);


export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [error, setError] = useState("");
  const { usuarioActual, logout } = useAuth()
  const history = useHistory()
  const classes = useStyles();



  async function handleLogOut(){
    setError('')

    try {
      handleClose()
      await logout()
      history.push('/login')
    } catch {
      setError('Ocurrió un error al salir de la cuenta')
    }

  }

  async function editProfile(){
    setError('')

    try {
      handleClose()
      history.push('/editar-perfil')
    } catch {
      setError('Ocurrió un error al salir de la cuenta')
    }

  }





  return (
    <div>
      <IconButton
        padding= "0px"
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <KeyboardArrowDownIcon fontSize="medium" />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose} className={classes.item}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Perfil" />
        </StyledMenuItem>
        <StyledMenuItem variant="link" onClick={editProfile}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Editar Perfil" />
        </StyledMenuItem>
        <StyledMenuItem variant="link" onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppTwoToneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
