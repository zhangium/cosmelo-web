import React from "react";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Box, Button } from "@material-ui/core";
import { theme } from "./Theme.ts";
import { Colours } from "./utils/Constants";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import { ScoringInfoPanel } from "./ScoringInfoPanel";
import { ProductBarInfoPage } from "./ProductBarInfoPage";
import { CatalogueInfoPage } from "./CatalogueInfoPage";
import { FinishPage } from "./FinishPage";
import { ReactComponent as TopCorner } from "./img/top-corner.svg";
import { ReactComponent as BottomCorner } from "./img/bottom-corner.svg";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    alignItems: "center",
  },
  navContainer: {
    position: "fixed",
    bottom: "150px",
  },
  backButton: {
    display: "inline-block",
    margin: "auto",
    float: "left",
  },
  centred: {
    display: "flex",
    flexDirection: "column",
  },
  nextButton: {
    "&:hover": { backgroundColor: Colours.Skobeloff, color: Colours.White },
    display: "flex",
    margin: "auto",
    backgroundColor: Colours.NaplesYellow,
    width: "148px",
  },
  skipButton: {
    position: "fixed",
    bottom: "10px",
  },
  stepper: {
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  stepperDotActive: {
    background: Colours.Skobeloff,
  },
  topRightImg: {
    zIndex: "-1",
    position: "absolute",
    top: "0px",
    right: "0px",
    overflow: "visible",
  },
  bottomLeftImg: {
    zIndex: "-1",
    position: "absolute",
    bottom: "0px",
    left: "0px",
    overflow: "visible",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
    padding: "50px",
  },
}));

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep(3);
  };

  const handleFinish = () => {
    window.open("http://www.sephora.com");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <TopCorner className={classes.topRightImg} />
        <Box className={classes.page}>
          <Box className={classes.contentContainer}>
            {activeStep === 0 && <ScoringInfoPanel />}
            {activeStep === 1 && <ProductBarInfoPage />}
            {activeStep === 2 && <CatalogueInfoPage />}
            {activeStep === 3 && <FinishPage />}
          </Box>
          <Box className={classes.navContainer}>
            <Box className={classes.backButton}>
              <Button onClick={handleBack} disabled={activeStep === 0}>
                <Typography variant="button">
                  {activeStep === 0 ? "" : "back"}
                </Typography>
              </Button>
            </Box>
            <Box className={classes.centred}>
              <Box>
                <Button
                  variant="contained"
                  className={classes.nextButton}
                  onClick={activeStep === 3 ? handleFinish : handleNext}
                >
                  <Typography variant="button">
                    {activeStep === 3 ? "finish" : "next"}
                  </Typography>
                </Button>
              </Box>
              <MobileStepper
                variant="dots"
                steps={4}
                position="static"
                activeStep={activeStep}
                classes={{
                  root: classes.stepper,
                  dotActive: classes.stepperDotActive,
                }}
              />
            </Box>
          </Box>
          <Button onClick={handleSkip} className={classes.skipButton}>
            <Typography variant="caption">Skip tutorial</Typography>
          </Button>
        </Box>
        <BottomCorner className={classes.bottomLeftImg} />
      </ThemeProvider>
    </div>
  );
}

export default App;
