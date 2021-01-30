import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function Profesor({ nombre, curso }) {
    const classes = useStyles();
    const defaultAvatar = 'https://via.placeholder.com/150';
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <div className={classes.avatarContainer}>
                        <img className={classes.avatar} src={defaultAvatar} />
                    </div>
                    <Typography gutterBottom variant="h5" component="h2">
                        {nombre}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {curso}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}