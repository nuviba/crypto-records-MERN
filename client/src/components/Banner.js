//------------IMPORT EXTERNAL MODULES---------------
import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import "react-alice-carousel/lib/alice-carousel.css";

//------------IMPORT INTERNAL COMPONENTS------------
import InteractvList from "./InteractvList";

//-------------STYLES------------------------------
const useStyles = makeStyles((theme) => ({
  banner: {
    width: "100%",
    height: "50px",
    justifyContent: "center",
  },
  bannerContent: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "170px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "100px",
    },
  },
}));
//componente para mostrar el carrousel de monedas trending
const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container key='containerBanner' className={classes.bannerContent}>
        <InteractvList key='interactivList'  />
      </Container>
    </div>
  );
};
export default Banner;
