import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { Icon } from "@blueprintjs/core";

import { UserContext } from "../contexts/UserContext";
import Account from "../pages/Account";

const useStyles = makeStyles(() => ({
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    //backgroundColor:'rgb(35,39,46)',
  },

  //FIND FRIENDS
  numFollow: {
    display: "flex",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
  },
  following: {
    paddingRight: "10px",
    borderRight: "1px solid rgba(0, 0, 0, 0.25)",
    textAlign: "center",
  },
  followers: {
    paddingLeft: "10px",
    textAlign: "center",
  },
  findFriends: {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    color: "black",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: "20px",
    backgroundColor: "white",
  },
  userFound: {
    display: "flex",
    borderTop: "1px solid rgba(0, 0, 0, 0.25)",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  searchBar: {
    marginTop: "20px",
    marginBottom: "20px",
    width: "80%",
  },
  searchResult: {
    width: "80%",
  },
  userName: {
    marginRight: "10px",
  },
}));

const SearchUsers = () => {
  const classes = useStyles();
  const { userLogged, setUserLogged, following, setFollowing, followers } =
    useContext(UserContext);

  const [username, setUsername] = useState("");
  const [user, setUser] = useState([]);
  const [numfollowing, setNumfollowing] = useState(following.length)

  const getUsers = async () => {
    await axios
      .get(`http://localhost:4000/users/get`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  function ReturnUser({ retuser }) {

    const addFriend = async () => {
      await axios
        .post("http://localhost:4000/friends/add", {
          email: userLogged.email,
          friend: retuser.username,
        })
        .then((res) => {
          console.log(res);
          setUserLogged(res.data.data);
          setNumfollowing(numfollowing+1);
        });
    };

    const deleteFriend = async () => {
      await axios
        .delete("http://localhost:4000/friends/delete", {
          data: { email: userLogged.email, friend: retuser.username },
        })
        .then((res) => {
          console.log(res);
          setUserLogged(res.data.data);
          setNumfollowing(numfollowing-1);
        });
    };

    return (
      <div className={classes.userFound}>
        <p className={classes.userName}>@{retuser.username}</p>
        {userLogged.friends.indexOf(retuser.username) == -1 ? (
          <Icon
            style={{ cursor: "pointer" }}
            color="black"
            icon="new-person"
            size={25}
            onClick={addFriend}
            intent="primary"
          />
        ) : (
          <Icon
            style={{ cursor: "pointer" }}
            color="black"
            icon="delete"
            size={25}
            onClick={deleteFriend}
            intent="primary"
          />
        )}
      </div>
    );
  }

  function FindUsers() {
    if (username === "") {
      return (
        <p>
          <b>Start typing for searching new friends!</b>
        </p>
      );
    } else if (user.error) {
      return <p style={{ color: "red" }}>{user.mensaje}</p>;
    } else {
      const usersMatch = user.data.filter(
        (el) =>
          el.username.toLowerCase().includes(username.toLowerCase()) &&
          el.username.toLowerCase() !== userLogged.username.toLowerCase()
      );
      console.log(usersMatch);
      if (usersMatch.length === 0) {
        return <p>No users found!</p>;
      }
      const userList = usersMatch.map((el) => {
        return <ReturnUser retuser={el} />;
      });

      return userList;
    }
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.findFriends}>
        <div className={classes.numFollow}>
          <div className={classes.following}>
            <h6>FOLLOWING</h6>
            <h6>{numfollowing}</h6>
          </div>
          <div className={classes.followers}>
            <h6>FOLLOWERS</h6>
            <h6>{followers.length}</h6>
          </div>
        </div>
        <input
          className={classes.searchBar}
          type="text"
          placeholder="Search"
          aria-label="Search"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {/*                         <Icon className={classes.iconSearch} icon="search"/>
         */}
        <div className={classes.searchResult}>
          <FindUsers />
        </div>
      </div>
    </div>
  );
};

export default SearchUsers;
