import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import {Button, Grid, IconButton, Toolbar} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Profesor from '../components/Profesor'
import {db} from "../firebase";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        paddingTop: 64,
        display: 'flex',
        position: 'absolute',
        height: '100%',
        width: '100%',
        flexDirection: 'row',
    },
    drawer: {
        width: drawerWidth,
    },
    main: {
        background: 'gray',
        overflow: 'auto',
        height: '100%',
        flexGrow: 1,
        padding: 25,
    }
}));

export default function Profesores() {
    const classes = useStyles();

    const [profesores, guardarProfesores] = useState([]);

    const getData = () => {
        db.collection('profesores').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            guardarProfesores(docs);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const materias = [
        {
            id: 'MAT-125',
            nombre: 'Aritmetica'
        },
        {
            id: 'MAT-126',
            nombre: 'Algebra'
        },
        {
            id: 'MAT-126',
            nombre: 'Geometria'
        }
    ];

    return (
        <div className={classes.root}>
            <AppBar position="absolute" className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Profesores
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                <div className={classes.drawer}>
                    <List>
                        {materias.map((materia, index) => (
                            <ListItem button key={materia.id}>
                                <ListItemText primary={materia.nombre} />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <main className={classes.main}>
                    <Grid container spacing={3}>
                        {profesores.map((profesor) => (
                            <Grid item xs={12} md={4} lg={3}>
                                <Profesor nombre={profesor.nombre} curso={profesor.curso} />
                            </Grid>
                        ))}
                    </Grid>
                </main>
            </div>
        </div>
    );
}