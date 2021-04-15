import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Paper from "@material-ui/core/Paper";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Container from "@material-ui/core/Container";
import NewMessage from "./NewMessage";

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
}));

const Chat = () => {
  const classes = useStyles();
  return (
    <Container>
      <Paper square className={classes.paper}>
        <Typography className={classes.text} variant="h5" gutterBottom>
          Inbox
        </Typography>
        <List className={classes.list}>
          {/* {messages.map(({ date, user, message }) => (
            <ListItem button key={date}>
              <ListItemAvatar>
                <Avatar alt={user.name} src={user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={user ? user.name : "anonymous"}
                secondary={message}
              />
            </ListItem>
          ))} */}
        </List>
      </Paper>
      <NewMessage />
    </Container>
  );
};

export default Chat;
