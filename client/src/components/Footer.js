import React from "react";
import { makeStyles } from "@material-ui/core";
import { MDBContainer, MDBFooter } from "mdbreact";

const useStyles = makeStyles((theme) => ({
  footer: {
    height: "50px",
    backgroundColor: "rgba(245,245,248,255)",
    color: "rgb(52,52,52)",
    borderTop: "1px solid rgba(0, 0, 0, 0.25)",
    textAlign: "center",
    display: "flex",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <MDBFooter color="#4B515D" className={classes.footer}>
        <MDBContainer>
          <a href="https://www.linkedin.com/in/nuviba/">
            <img src="https://img.icons8.com/ios-filled/50/000000/linkedin.png" />
          </a>
        </MDBContainer>

        <MDBContainer fluid>
          CryptoRecords-{new Date().getFullYear()}-
        </MDBContainer>
        <MDBContainer>
          <a href="https://github.com/nuviba/CryptoRecords">
            <img src="https://img.icons8.com/fluency/48/000000/github.png" />{" "}
          </a>
        </MDBContainer>
      </MDBFooter>
    </div>
  );
};

export default Footer;
