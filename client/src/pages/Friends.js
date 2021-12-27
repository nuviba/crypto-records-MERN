import { React, useState } from "react";
import Header from "../components/Header";
import { makeStyles } from "@material-ui/core";

import SearchUsers from "../components/SearchUsers";
import PublicationsBoard from "../components/PublicationsBoard";
import Publish from "../components/Publish";

const useStyles = makeStyles((theme) => ({
  friends: {
    paddingTop: "120px",
    minHeight: "600px",
    width: "100%",
    minHeight: 1080,
    backgroundColor: "white",
    paddingBottom: "45px",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  publishSearch: {
    position: "fixed",
    right: "0px",
    width: "35%",
    marginRight: "30px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      position: "relative",
      margin: "20px",
    },
  },
}));

function Friends() {
  const classes = useStyles();
  const [refresh, setRefresh] = useState(0);

  return (
    <div>
      <Header />
      <div className={classes.friends}>
        <div className={classes.publishSearch}>
          <SearchUsers />
          <Publish setRefresh={setRefresh} refresh={refresh} />
        </div>
        <PublicationsBoard setRefresh={setRefresh} refresh={refresh} />
      </div>
    </div>
  );
}

export default Friends;
