import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { TextArea, Intent } from "@blueprintjs/core";
import { Button } from "react-bootstrap";

import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles(() => ({
  publicationBox: {
    paddingTop: "20px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    backgroundColor: "white",
    width: "100%",
    right: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "20px",
  },
  textBox: {
    width: "80%",
    minHeight: "100px",
  },
  buttonBox: {
    margin: "10px",
  },
}));

const Publish = ({ refresh, setRefresh }) => {
  const classes = useStyles();
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (text.length > 0) {
      await axios
        .post("http://localhost:4000/publications/post", {
          username: userLogged.username,
          firstName: userLogged.firstName,
          lastName: userLogged.lastName,
          pub: text,
          dated: Date.now(),
        })
        .then((res) => {
          console.log(res);
          setFeedback(res.data.msg);
          setRefresh(refresh + 1);
          setText("");
        });
    } else {
      setFeedback("Empty text! Nothing to share");
    }
  };

  return (
    <div className={classes.publicationBox}>
      <h5>{`What do you want to share, ${userLogged.firstName}?`}</h5>
      <TextArea
        className={classes.textBox}
        growVertically={false}
        large={true}
        intent={Intent.PRIMARY}
        onChange={handleChange}
        value={text}
      />
      <p>{feedback}</p>
      <Button
        className={classes.buttonBox}
        onClick={handleSubmit}
        variant="outline-dark"
      >
        Share
      </Button>{" "}
    </div>
  );
};

export default Publish;
