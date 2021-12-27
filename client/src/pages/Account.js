//------------IMPORT EXTERNAL MODULES---------------
import { React, useContext, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

//------------IMPORT INTERNAL COMPONENTS------------
import Header from "../components/Header";
import AvatarCustom from "../components/AvatarCustom";

//-------------STYLES------------------------------
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
//componente para mostrar el perfil del usuario
const UserDetails = () => {
  const classes = useStyles();

  const { userLogged } = useContext(UserContext);

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

      </div>
    </div>
  );
};

//componente para mostrar los following usuario
const UserFollowing = () => {
  const classes = useStyles();

  const { userLogged, following, setFollowing } = useContext(UserContext);
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
  //filtramos para quedarnos solo con los usuarios que están en nuestra lista de amigos
  const friends = users.filter(
    (user) => userLogged.friends.indexOf(user.username) !== -1
  );
  useEffect(() => {
    setFollowing(friends);
  }, [users]);
  //para cada following creamos un elemento con su avatar y nombre de usuario
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
  //devolvemos la lista de todos los followings
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

//componente para mostrar los followers del usuario
//misma lógica que función anterior, solo cambia el filtro para quedarnos con los followers
const UserFollowers = () => {
  const classes = useStyles();

  const { userLogged, followers, setFollowers } =
    useContext(UserContext);
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
//componente para mostrar la página con las tres secciones
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
