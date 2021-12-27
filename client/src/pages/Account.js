import { React, useContext, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import AvatarCustom from "../components/AvatarCustom";

const useStyles = makeStyles((theme) => ({
  account: {
    paddingTop: "150px",
    minHeight: "600px",
    width: "100%",
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      paddingBottom: "60px",
    },
  },
  head: {
    backgroundColor: "black",
    color: "white",
    display: "flex",
    alignItems: "center",
    minHeight: "80px",
    paddingLeft: "20px",
  },
  body: {
    textAlign: "center",
    paddingTop: "30px",
  },
  avatar: {
    marginLeft: "20px",
  },
  userDetails: {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    width: "30%",
    marginLeft: "20px",
    borderRadius: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      paddingBottom: "10px",
      marginBottom: "30px",
    },
  },
  bodyFollow: {
    listStyleType: "none",
  },
  list: {
    display: "flex",
    alignItems: "center",
    padding: "8px",
  },

  userFollowers: {
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    width: "30%",
    marginLeft: "20px",
    borderRadius: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      marginBottom: "30px",
    },
  },
}));

const UserDetails = () => {
  const { userLogged, setUserLogged } = useContext(UserContext);
  const navigate = useNavigate();

  const classes = useStyles();

  /* const handleDelete = () => {
    axios
      .delete("http://localhost:4000/users/delete", {
        data: { email: userLogged.email },
      })
      .then((res) => {
        console.log(res);
        localStorage.removeItem("userLogged");
        setUserLogged("null");
        navigate("/", { replace: true });
      });
  }; */

  return (
    <div className={classes.userDetails}>
      <div className={classes.head}>
        <AvatarCustom
          className={classes.avatar}
          firstName={userLogged.firstName}
          lastName={userLogged.lastName}
        />
        <h4 style={{ width: "100%", textAlign: "center" }}>-Profile-</h4>
      </div>
      <div className={classes.body}>
        <h6 style={{ padding: "10px" }}>Username: @{userLogged.username}</h6>
        <h6 style={{ padding: "10px" }}>
          Name: {userLogged.firstName} {userLogged.lastName}
        </h6>
        <h6 style={{ padding: "10px" }}>Email: {userLogged.email}</h6>
        <h6 style={{ padding: "10px" }}>Birthdate: {userLogged.date}</h6>
        {/* <Button
          className={classes.buttonBox}
          onClick={handleDelete}
          variant="outline-dark"
        >
          Delete profile
        </Button>{" "} */}
      </div>
    </div>
  );
};

const UserFollowing = () => {
  const { userLogged, setUserLogged, following, setFollowing, page } =
    useContext(UserContext);
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get(`http://localhost:4000/users/get`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const friends = users.filter(
    (user) => userLogged.friends.indexOf(user.username) !== -1
  );
  useEffect(() => {
    setFollowing(friends);
  }, [users]);

  console.log(following);

  const followingList = following.map((follow) => {
    return (
      <li className={classes.list}>
        {
          <AvatarCustom
            firstName={follow.firstName}
            lastName={follow.lastName}
          />
        }
        <h6>@{follow.username}</h6>
      </li>
    );
  });

  return (
    <div className={classes.userFollowers}>
      <div className={classes.head}>
        <h4 style={{ width: "100%", textAlign: "center" }}>-Following-</h4>
      </div>
      <div className={classes.bodyFollow}>
        <ul style={{ listStyleType: "none" }}>{followingList}</ul>
      </div>
    </div>
  );
};

const UserFollowers = () => {
  const { userLogged, setUserLogged, followers, setFollowers, page } =
    useContext(UserContext);
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get(`http://localhost:4000/users/get`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const friends = users.filter(
    (user) => user.friends.indexOf(userLogged.username) !== -1
  );

  useEffect(() => {
    setFollowers(friends);
  }, [users]);

  const followersList = followers.map((follow) => {
    return (
      <li className={classes.list}>
        {
          <AvatarCustom
            firstName={follow.firstName}
            lastName={follow.lastName}
          />
        }
        <h6>@{follow.username}</h6>
      </li>
    );
  });

  return (
    <div className={classes.userFollowers}>
      <div className={classes.head}>
        <h4 style={{ width: "100%", textAlign: "center" }}>-Followers-</h4>
      </div>
      <div className={classes.bodyFollow}>
        <ul style={{ listStyleType: "none" }}>{followersList}</ul>
      </div>
    </div>
  );
};

const Account = () => {
  const classes = useStyles();
  return (
    <div>
      <Header />
      <div className={classes.account}>
        <UserDetails />
        <UserFollowing />
        <UserFollowers />
      </div>
    </div>
  );
};

export default Account;
