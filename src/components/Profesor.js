
//Este componente es una card sola

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Cosas raras de MUI

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    avatar: {
        height: 80,
        width: 80,
        borderRadius: '50%',
        border: '2px solid #2e2e2e',
    },
    avatarContainer: {
        textAlign: 'center',
        marginBottom: 15,
    }
});

//Devuelve el componente Profesor al cual se le entregarán datos (props) que en este caso sería el estado de PROFESOR

export default function Profesor({ profesor }) {
    const classes = useStyles();
    //imagen random
    const defaultAvatar = 'https://i.pravatar.cc/300';
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <div className={classes.avatarContainer}>
                        <img className={classes.avatar} src={defaultAvatar} />
                    </div>
                    {/* se muestran datos de ese estado PROFESOR que se le pasó al componente, en este caso name y especialidades que contiene los ID según la db */}
                    <Typography gutterBottom variant="h5" component="h2">
                        {profesor.nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {profesor.especialidades}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}