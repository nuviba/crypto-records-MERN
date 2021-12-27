import React, { useContext, useState } from "react";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Tab,
  IconButton,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import TabList from "@mui/lab/TabList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TabContext from "@mui/lab/TabContext";
import { Icon } from "@blueprintjs/core";
import MediaQuery from "react-responsive";
import AvatarCustom from "./AvatarCustom";

const useStyles = makeStyles(() => ({
  menu: {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
  },
  ddMenu: {
    width: "100%",
    backgroundColor: "black",
  },
  ddItem: {
    borderBottom: "1px solid white",
    backgroundColor: "black",
    marginTop: "0px",
    color: "white",
    width: "100vw",
    padding: "10px 0px 10px 10px",
    navdrop: { color: "black" },
  },
  header: {
    backgroundColor: "black",
    position: "fixed",
    height: "100px",
    display: "flex",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    paddingTop: "8px",
  },
  titleH: {
    display: "flex",
  },
  p: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  img: {
    width: "80px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  linkAccount: {
    textDecoration: "none",
    color: "black",
  },
  navdrop: {
    color: "black",
    display: "none",
  },
}));

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();
  const { userLogged, setUserLogged, page, setPage } = useContext(UserContext);

  const logOut = () => {
    setUserLogged("null");
    localStorage.removeItem("userLogged");
    navigate("/", { replace: true });
  };

  const [value, setValue] = useState("1");
  const handleChange = (e, nv) => {
    setValue(nv);
  };

  const classes = useStyles();

  return (
    <AppBar className={classes.header}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.title} variant="h5">
          <Link
            onClick={() => {
              setPage("1");
            }}
            to="/"
            className={classes.link}
          >
            <img
              className={classes.img}
              src="../logos/logoW.png"
              alt="Logo CryptoRecords"
            />
          </Link>
        </Typography>
        <Typography className={classes.titleH} variant="h5">
          <MediaQuery query="(min-width:700px)">
            <TabContext className={classes.menu} value={page}>
              <TabList
                textColor="white"
                indicatorColor="primary"
                aria-label="lab API tabs example"
              >
                <Tab
                  onClick={() => {
                    setPage("1");
                    navigate("/");
                  }}
                  label="ALL COINS"
                  value="1"
                />

                <Tab
                  onClick={() => {
                    setPage("2");
                    navigate("/my-crypto");
                  }}
                  label="FAV COINS"
                  value="2"
                />

                <Tab
                  onClick={() => {
                    setPage("3");
                    navigate("/friends");
                  }}
                  label="SOCIAL"
                  value="3"
                />
              </TabList>
            </TabContext>
          </MediaQuery>
          <MediaQuery query="(max-width:699px)">
            <div className={classes.ddMenu}>
              <NavDropdown
                bsPrefix="navdrop"
                menuVariant="dark"
                active={false}
                disabled={false}
                title={
                  <IconButton>
                    <Icon
                      color="white"
                      icon="menu"
                      size={30}
                      intent="primary"
                    />
                  </IconButton>
                }
              >
                <NavDropdown.Item
                  className={classes.ddItem}
                  onClick={() => {
                    setPage("1");
                    navigate("/");
                  }}
                >
                  List
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={classes.ddItem}
                  onClick={() => {
                    setPage("2");
                    navigate("/my-crypto");
                  }}
                >
                  My cryptos
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={classes.ddItem}
                  onClick={() => {
                    setPage("3");
                    navigate("/friends");
                  }}
                >
                  Followers
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </MediaQuery>
        </Typography>
        <Typography>
          {/*                     <Button onClick={logOut} variant="outline-light">LOG OUT</Button>{' '}
                        
 */}
          <IconButton onClick={handleOpenUserMenu}>
             <AvatarCustom
              firstName={userLogged.firstName}
              lastName={userLogged.lastName}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link
                onClick={() => {
                  setPage(0);
                }}
                className={classes.linkAccount}
                to="/account"
              >
                <Typography textAlign="center">Account</Typography>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu}>
              <Typography onClick={logOut} textAlign="center">
                <Icon
                  color="#black"
                  icon="log-out"
                  size={20}
                  intent="primary"
                />{" "}
                Log out
              </Typography>
            </MenuItem>
          </Menu>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
