import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import Chat from "../containers/Chat";
import Grid from "@material-ui/core/Grid";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import SendIcon from '@material-ui/icons/Send';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  nombrecontainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "black",
    padding: "5px 10px 5px 10px",
    "&:hover": { cursor: "pointer" },
  },
  rootAvatar: {
    marginRight: "10px",
    width: "33px",
    height: "33px",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  nombre: {
    margin: "0px",
    padding: "0px", 
    maxWidth: "160px",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",  
  },
  gridTotal: {
    paddingTop: "0px",
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  gridContainer: {
    border: "1px solid #C7C6C6",
    borderRadius:"15px",
    padding:"10px",
    // width:600,
  },
  nombreTitulo: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "black",
    padding: "5px 10px 5px 10px",
    "&:hover": { cursor: "pointer" },
  },
  chatRoot: {
    // background:"grey",
    height:"calc(100vh - 190px)",
    overflow: "auto",
    display:"flex",
    flexDirection:"column",
    padding:" opx 5px 5px 5px",
  },
  inputText: {
    outline: "none",
    resize: "inherit",
    fontSize: "14px",
    fontFamily: "arial",
    border: "1px solid #C7C6C6",
    borderRadius: "10px",
    // width: "100%",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 1)",
    minWidth:"500px",
  },
  chatYo: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-end",
    width:"100%",
  },
  chatOtro: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    width:"100%",
  },
  chatText: {
    margin:"10px 0px 0px 0px",
    outline: "none",
    fontSize: "14px",
    fontFamily: "arial",
    border: "1px solid #C7C6C6",
    borderRadius: "10px",
    padding: "5px 7px 5px 7px",
    boxShadow: "rgba(0, 0, 0, 1)",
    maxWidth:"350px",
    textAlign:"left",

  }
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div style={{paddingTop:"50px"}}>
        <p style={{margin:0, padding: 10, fontSize:17, fontWeight: "bold"}}>Contactos</p>
        <Divider />
        <Grid className={classes.nombrecontainer} >
            <Avatar className={classes.rootAvatar} alt="Usuario" src="foto" />
            <div className={classes.nombre}>
            Nombre
            </div>
        </Grid>
        <Divider />
        <Grid className={classes.nombrecontainer} >
            <Avatar className={classes.rootAvatar} alt="Usuario" src="foto" />
            <div className={classes.nombre}>
            Nombre
            </div>
        </Grid>
        <Divider />
        <Grid className={classes.nombrecontainer} >
            <Avatar className={classes.rootAvatar} alt="Usuario" src="foto" />
            <div className={classes.nombre}>
            fasfasdasasasdas dasdas asdas 
            </div>
        </Grid>
        <Divider />
        
      
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Grid align="center" className={classes.gridTotal}>
            <Grid xs></Grid>
            <Grid className={classes.gridContainer}>
                <Grid className={classes.nombreTitulo} >
                    <Avatar className={classes.rootAvatar} alt="Usuario" src="foto" />
                    <div className={classes.nombre}>
                    Nombre
                    </div>
                </Grid>
                <Divider />
                <Grid className={classes.chatRoot}>
                    <Grid className={classes.chatYo}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as hdbabshjb dasjb djkasb jkdasbk djbasj dbasb  as das dasd  as d
                        </p>
                    </Grid>
                    <Grid className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </Grid>
                    <div className={classes.chatYo}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as das das 
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as adsddddddddddddddddddddddddddddddddddd
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as dasda s das
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as das dasd asdasd as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as das dasd asd as d
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>
                    <div className={classes.chatOtro}>
                        <p className={classes.chatText}>
                            Hola como estas y tu dasd as as
                        </p>
                    </div>

                    
                </Grid>
                <Divider />
                <Grid className={classes.nombreTitulo} >
                    <input className={classes.inputText} type="text"/>
                    <IconButton style={{ padding: "10px" }}>
                        <AddAPhotoIcon fontSize="medium" />
                    </IconButton>
                    <IconButton style={{ padding: "10px" }}>
                        <SendIcon fontSize="medium" />
                    </IconButton>
                </Grid>
            </Grid>
            <Grid xs></Grid>
        </Grid>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
