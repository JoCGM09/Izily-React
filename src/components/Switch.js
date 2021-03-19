import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


const GreenSwitch = withStyles({
  switchBase: {
    color: "grey",
    '&$checked': {
      color: "#99CC42",
    },
    '&$checked + $track': {
      backgroundColor: "#99CC42",
    },
  },
  checked: {},
  track: {},
})(Switch);


export default function CustomizedSwitches() {
  const [state, setState] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
      <FormControlLabel
        control={<GreenSwitch checked={state.checked} onChange={handleChange} name="checked" />}
        label="Disponible"
      />
  );
}
