import React from 'react';
import UsersSearchBar from '../components/UsersSearchBar';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

const useStyles = makeStyles((theme) => ({
    gridTotal: {
      paddingTop: "10px",
      display: "flex",
      alignContent: "center",
      flexDirection: "row",
      width: "100%",
    },
    gridArriba: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
    },
    Buscar: {
        width: "200px",
    },
    root: {
        width: "500px",
        border: "0px",
        boxShadow: "0px",
        display: "flex",
        paddingRight:"10px",
        paddingBottom: "0px",
        marginTop:"20px",
        alignItems:"center",
        justifyContent: "space-between",
    },
    subRoot: {
        display: "flex",
        flexDirection:"row",
        alignItems:"center",
        margin:"0px",
        padding: "0px",
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignContent: "start",
        justifyItems: "end",
        alignItems: "end",
        paddingRight:"0px",
    },
    
    nombre: {
        color: "black",
        textAlign:"left",
        fontSize: "16px",
        paddingBottom: "5px",
        paddingTop:"10px",
        "&:hover":{
            textDecoration:"underline",
            cursor:"pointer",
        },
    },
    Mentor: {
        color: "#615A5C",
        fontSize: "14px",
        textAlign:"left",
    },
    containerContent: {
        paddingTop: "15px",
        paddingBottom: "15px",
        paddingLeft: "0px",
        widht: "100%",
    },
    avatar: {
        width:"60px",
        height:"60px",
        "&:hover":{
            cursor:"pointer",
        },
    },
    boton: {
        margin: "0px 5px",
        color: "#3493C2",
        fontWeight: "bold",
        height: "30px",
        fontSize: "12px",
      },
  }));

function BuscarUsuarios() {
    const classes = useStyles();

    return (
    <>
        <Grid align="center" className={classes.gridTotal}>
            <Grid xs></Grid>
            <Grid>
                <Grid className={classes.gridArriba}>
                <FormControl
                    size="small"
                    className={classes.Buscar}
                    variant="outlined"
                >
                    <InputLabel htmlFor="outlined-adornment-password">
                    Buscar nombre:
                    </InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type="text"
                    // onChange={filtrarProfesoresInput}
                    labelWidth={120}
                    />
                </FormControl>
                </Grid>
                <Grid>
                    <Card className={classes.root}>
                        <div className={classes.subRoot}>
                            <CardHeader
                            avatar={
                                <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                                alt="nombre"
                                // src={props.imageURLComent}
                                />
                            }
                            className={classes.avatarContainer}
                            />
                            <CardContent className={classes.containerContent}>
                                <Typography
                                    className={classes.nombre}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Nombre de Usuario
                                </Typography>
                                <Typography
                                    className={classes.Mentor}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Mentor
                                </Typography>
                            </CardContent>
                        </div>
                        <Button 
                            variant="outlined"
                            size="small"
                            className={classes.boton}
                            startIcon={<QuestionAnswerIcon />}
                            disableElevation="true"
                            >
                            Contactar
                        </Button>
                    </Card>
                    <Card className={classes.root}>
                        <div className={classes.subRoot}>
                            <CardHeader
                            avatar={
                                <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                                alt="nombre"
                                // src={props.imageURLComent}
                                />
                            }
                            className={classes.avatarContainer}
                            />
                            <CardContent className={classes.containerContent}>
                                <Typography
                                    className={classes.nombre}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Nombre de Usuario
                                </Typography>
                                <div style={{margin:"0px", height:"20px"}}>

                                </div>
                            </CardContent>
                        </div>
                        <Button 
                            variant="outlined"
                            size="small"
                            className={classes.boton}
                            startIcon={<QuestionAnswerIcon />}
                            disableElevation="true"
                            >
                            Contactar
                        </Button>
                    </Card>
                    <Card className={classes.root}>
                        <div className={classes.subRoot}>
                            <CardHeader
                            avatar={
                                <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                                alt="nombre"
                                // src={props.imageURLComent}
                                />
                            }
                            className={classes.avatarContainer}
                            />
                            <CardContent className={classes.containerContent}>
                                <Typography
                                    className={classes.nombre}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Nombre de Usuario
                                </Typography>
                                <div style={{margin:"0px", height:"20px"}}>

                                </div>
                            </CardContent>
                        </div>
                        <Button 
                            variant="outlined"
                            size="small"
                            className={classes.boton}
                            startIcon={<QuestionAnswerIcon />}
                            disableElevation="true"
                            >
                            Contactar
                        </Button>
                    </Card>
                    <Card className={classes.root}>
                        <div className={classes.subRoot}>
                            <CardHeader
                            avatar={
                                <Avatar
                                aria-label="recipe"
                                className={classes.avatar}
                                alt="nombre"
                                // src={props.imageURLComent}
                                />
                            }
                            className={classes.avatarContainer}
                            />
                            <CardContent className={classes.containerContent}>
                                <Typography
                                    className={classes.nombre}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Nombre de Usuario
                                </Typography>
                                <Typography
                                    className={classes.Mentor}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    Mentor
                                </Typography>
                            </CardContent>
                        </div>
                        <Button 
                            variant="outlined"
                            size="small"
                            className={classes.boton}
                            startIcon={<QuestionAnswerIcon />}
                            disableElevation="true"
                            >
                            Contactar
                        </Button>
                    </Card>
                    
                </Grid>
            </Grid>
            <Grid xs></Grid>
        </Grid>
    </>
    )
}

export default BuscarUsuarios
