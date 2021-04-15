import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { IconButton } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {useState } from "react";
import InfoIcon from '@material-ui/icons/Info';
import Divider from "@material-ui/core/Divider";
// import MenuBookIcon from '@material-ui/icons/MenuBook';

const useStyles = makeStyles((theme) => ({
  item: {
    "&:onClick": {
      backgroundColor: "black",
    },
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    marginLeft: "-10px",
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
    "&:focus": {
      backgroundColor: "",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "",
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [error, setError] = useState("");
  const { usuarioActual, logout } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  async function handleLogOut() {
    setError("");

    try {
      handleClose();
      await logout();
      history.push("/login");
      window.location.reload();
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }

  async function editProfile() {
    setError("");

    try {
      handleClose()
      history.push('/editar-perfil')
    } catch {
      setError('Ocurrió un error al salir de la cuenta')
    }

  }

  // async function misCursos(){
  //   setError('')

  //   try {
  //     handleClose()
  //     history.push('/mis-cursos')
  //   } catch {
  //     setError("Ocurrió un error al salir de la cuenta");
  //   }
  // }

  async function goProfile() {
    setError("");

    try {
      handleClose();
      history.push(`/perfil/${props.perfil}`);
      window.location.reload();
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }

  async function acercaDeIzily() {
    setError("");

    try {
      handleClose();
      history.push(`/califica-a-izily`);
      window.location.reload();
    } catch {
      setError("Ocurrió un error al salir de la cuenta");
    }
  }

  return (
    <div>
      <IconButton
        padding="0px"
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
        <StyledMenuItem
          variante="link"
          onClick={goProfile}
          className={classes.item}
        >
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
        {/* {props.esProfesor === true ? (
          <StyledMenuItem disabled variant="link" onClick={misCursos}>
            <ListItemIcon>
              <MenuBookIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Mis Cursos" />
          </StyledMenuItem>
        ) : (
          <>
          </>
        )} */}
        <StyledMenuItem variant="link" onClick={handleLogOut}>
          <ListItemIcon>
            <ExitToAppTwoToneIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Cerrar Sesión" />
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem variant="link" onClick={acercaDeIzily}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Califica a Izily" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
