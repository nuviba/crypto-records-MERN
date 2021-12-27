import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { Button, Dropdown } from "react-bootstrap";
import { Icon } from "@blueprintjs/core";

import { UserContext } from "../contexts/UserContext";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import AvatarCustom from "./AvatarCustom";

const useStyles = makeStyles((theme) => ({
  publication: {
    minHeight: "100px",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    color: "black",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
    marginLeft: "20px",
    backgroundColor: "white",
    borderRadius: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      position: "relative",
      margin: "20px",
    },
  },
  headPublication: {
    width: "100%",
    padding: "10px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "black",
    color: "white",
  },
  bodyPublication: {
    paddingTop: "10px",
    width: "100%",
    textAlign: "justify",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
    padding: "10px",
  },
  footerPublication: {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    paddingBottom: "10px",
  },
}));

const PublicationsBoard = ({ refresh, setRefresh }) => {
  const classes = useStyles();
  const { userLogged, setUserLogged } = useContext(UserContext);
  const [pubs, setPubs] = useState([]);

  const getPubs = async () => {
    await axios
      .get(`http://localhost:4000/publications/show`)
      .then((res) => {
        console.log(res.data);
        setPubs(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPubs();
  }, [refresh]);

  function ShowPub({ pub }) {
    const deletePub = async () => {
      await axios
        .delete("http://localhost:4000/publications/delete", {
          data: { username: userLogged.username, dated: pub.dated },
        })
        .then((res) => {
          console.log(res);
          setRefresh(refresh - 1);
        });
    };

    const like = async () => {
      await axios
        .post("http://localhost:4000/publications/like", {
          dated: pub.dated,
          username: userLogged.username,
        })
        .then((res) => {
          console.log(res);
          setRefresh(refresh + 1);
        });
    };

    const dislike = async () => {
      await axios
        .delete("http://localhost:4000/publications/dislike", {
          data: { dated: pub.dated, username: userLogged.username },
        })
        .then((res) => {
          console.log(res);
          setRefresh(refresh - 1);
        });
    };
    const date = new Date(pub.dated);
    const likeUsers = pub.likes.map((like) => {
      return <DropdownItem>{like}</DropdownItem>;
    });
    const likeNumber = pub.likes.length;

    function ShowLikes() {
      return (
        <>
          <Dropdown className={classes.buttonLikes}>
            <DropdownToggle variant="outline-dark">
              {likeNumber} likes
            </DropdownToggle>
            <DropdownMenu>{likeUsers}</DropdownMenu>
          </Dropdown>
        </>
      );
    }

    return (
      <div className={classes.publication}>
        <div className={classes.headPublication}>
          <AvatarCustom firstName={pub.firstName} lastName={pub.lastName} />
          <p>@{pub.username}</p>
          <p>{date.toUTCString()}</p>
        </div>

        <p className={classes.bodyPublication}>{pub.pub}</p>
        <div className={classes.footerPublication}>
          {likeNumber === 0 ? <p>No likes yet!</p> : <ShowLikes />}
          {pub.username === userLogged.username ? (
            <Button
              className={classes.buttonBox}
              onClick={deletePub}
              variant="outline-dark"
            >
              Delete
            </Button>
          ) : pub.likes.indexOf(userLogged.username) == -1 ? (
            <Icon
              color="black"
              icon="thumbs-up"
              size={25}
              onClick={like}
              intent="primary"
            />
          ) : (
            <Icon
              color="black"
              icon="thumbs-down"
              size={25}
              onClick={dislike}
              intent="primary"
            />
          )}
        </div>
      </div>
    );
  }

  function Publications() {
    if (pubs == null) {
      return (
        <div className={classes.publication}>
          <h2>There are no publications yet!</h2>
        </div>
      );
    } else {
      const publist = pubs.filter(
        (pub) =>
          userLogged.friends.indexOf(pub.username) !== -1 ||
          userLogged.username == pub.username
      );
      const publistFriends = publist.map((e) => {
        return <ShowPub pub={e} />;
      });
      console.log(publist);

      return publistFriends;
    }
  }
  return (
    <div className={classes.publications}>
      <Publications />
    </div>
  );
};

export default PublicationsBoard;
