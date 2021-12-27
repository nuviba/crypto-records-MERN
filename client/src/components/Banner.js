import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import "react-alice-carousel/lib/alice-carousel.css";

import InteractvList from "./InteractvList";

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

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <InteractvList />
      </Container>
    </div>
  );
};
export default Banner;
