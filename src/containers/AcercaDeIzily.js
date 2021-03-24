import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    boton: {
      margin: "0px 5px",
      color: "#3493C2",
      fontWeight: "bold",
      height: "40px",
      fontSize: "12px",
    },
  }));
function AcercaDeIzily() {
    
    const classes = useStyles();
    return (
      <>
        <p>
            Acerca de Izily
        </p>

        <Button
            href="javascript:history.back()"
            className={classes.boton}
            variant="outlined"
            size="small"
          >
            Volver atrás
          </Button>
      </>
    );
  }
  export default AcercaDeIzily;
  