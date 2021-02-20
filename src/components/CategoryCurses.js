// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { db } from "../firebase";
// import PropTypes from 'prop-types';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Chip from '@material-ui/core/Chip';


// function CategoryCurses(props) {
//   const { children, value, index, ...other } = props;

//   const { profesorId } = useParams();
//   const [profesor, setProfesor] = useState(null);

//   const traerProfesor = async () => {
//     const cityRef = db.collection("usuarios").doc(profesorId);
//     const doc = await cityRef.get();
//     if (doc.exists) {
//       setProfesor({ ...doc.data(), id: doc.id });
//     }
//   };
  


//   useEffect(() => {
//     traerProfesor();
//   }, []);


//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// CategoryCurses.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

// export default function SimpleTabs() {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
//           <Tab label="Escolar" {...a11yProps(0)} />
//           <Tab label="Preuniversitario" {...a11yProps(1)} />
//           <Tab label="Universitario" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <CategoryCurses value={value} index={0}>
//         {profesor.cursos.map((cursos) => (
//             <Chip className={classes.etiqueta}
//                 label={cursos.nombre}
//             />
//         ))}
//       </CategoryCurses>
//       <CategoryCurses value={value} index={1}>
//         Item Two
//       </CategoryCurses>
//       <CategoryCurses value={value} index={2}>
//         Item Three
//       </CategoryCurses>
//     </div>
//   );
// }