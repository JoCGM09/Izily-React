import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from "@material-ui/core/Grid";


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: 'Resuelve tus dudas y ayuda a resolver las de los demás',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/carousel%2FIMAGEN1.png?alt=media&token=125f68df-9372-4edb-a3ee-f8311e434214',
  },
  {
    label: 'Encuentra un mentor de acuerdo al área que necesites y contáctalo',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/carousel%2FIMAGEN2.png?alt=media&token=00c97343-9ee9-4c95-aa20-37bae1d5cdbe',
  },
  {
    label: 'Agenda una mentoría y recibe una clase personalizada',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/carousel%2FIMAGEN3.png?alt=media&token=12dc1405-979e-4918-a11b-fa1abf7b7dae',
  },
  {
    label: 'Califica a tu mentor, así ayudarás a que mejore y a que otros usuarios tengan una mejor experiencia.',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/izily-test.appspot.com/o/carousel%2FIMAGEN4.png?alt=media&token=f93fe3ca-aa40-496b-a8ea-e43163b19722',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    padding:"20px",
    alignItems: 'center',
    minHeight: 400,
    minWidth: 600,
    paddingLeft: theme.spacing(4),
    backgroundColor:"rgba(0, 0, 0, 0.0)",
  },
  textHeader:{
    backgroundColor:"rgba(0, 0, 0, 0.0)",
    fontSize:"50px",
  },
  img: {
    height: "auto",
    display: 'block',
    maxWidth: 600,
    overflow: 'hidden',
    width: '100%',
  },
}));

function SwipeableTextMobileStepper() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid container style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <Grid lg={6} md={12} item className={classes.header}>
        <Paper style={{padding:"0px 30px", backgroundColor:"rgba(0, 0, 0, 0.0)",}} square elevation={0} >
          <Typography className={classes.textHeader}>{tutorialSteps[activeStep].label}</Typography>
        </Paper>
      </Grid>
      <Grid lg={6} md={12} item style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center",}}>
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </Button>
        <div className={classes.root}>
            
            <AutoPlaySwipeableViews
            interval={5000}
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                
            >
                {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                    {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                    ) : null}
                </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                style={{display:"flex", justifyContent:"center", backgroundColor:"rgba(0, 0, 0, 0.0)",}}
                steps={maxSteps}
                position="static"
                variant="dots"
                activeStep={activeStep}
                // nextButton={
                //   <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                //     Next
                //     {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                //   </Button>
                // }
                // backButton={
                //   <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                //     {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                //     Back
                //   </Button>
                // }
            />
        </div>
        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      </Grid>
    </Grid>
    
    
  );
}

export default SwipeableTextMobileStepper;
