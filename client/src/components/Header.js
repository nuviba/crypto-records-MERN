//------------IMPORT EXTERNAL MODULES---------------
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Tab,
  IconButton,
} from "@material-ui/core";
import { NavDropdown } from "react-bootstrap";
import TabList from "@mui/lab/TabList";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TabContext from "@mui/lab/TabContext";
import { Icon } from "@blueprintjs/core";
import MediaQuery from "react-responsive";

//------------IMPORT INTERNAL COMPONENTS------------
import AvatarCustom from "./AvatarCustom";
import { UserContext } from "../contexts/UserContext";

//-------------STYLES------------------------------
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
//componente para mostrar la barra del header fija, presente en todas las páginas de la sección privada
const Header = () => {
  const navigate = useNavigate();
  //importamos diferentes estados del contexto de usuario
  const { userLogged, setUserLogged, page, setPage } = useContext(UserContext);
  
  //estado para controlar el dropdown del menú de usuario
  const [anchorElUser, setAnchorElUser] = useState(null);

  //funciones para abrir/cerrar el menú de usuario
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
            setUserLogged("null");
            localStorage.removeItem("userLogged");
            navigate("/", { replace: true })}

  const classes = useStyles();

  return (
    <AppBar key='appBarH' className={classes.header}>
      <Toolbar key='toolBarH' className={classes.toolbar}>
        <Typography key='typoLogoH' className={classes.title} variant="h5">
          <Link
            key='linkLogoH'
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
        <Typography key='typotitleH' className={classes.titleH} variant="h5">
          <MediaQuery key='mediaQuery1H' query="(min-width:700px)">
            <TabContext key='tabContextH' className={classes.menu} value={page}>
              <TabList
                key='tabListH'
                textColor="white"
                indicatorColor="primary"
                aria-label="lab API tabs example"
              >
                <Tab
                  key='tab1H'
                  onClick={() => {
                    setPage("1");
                    navigate("/");
                  }}
                  label="ALL COINS"
                  value="1"
                />

                <Tab
                  key='tab2H'
                  onClick={() => {
                    setPage("2");
                    navigate("/my-crypto");
                  }}
                  label="FAV COINS"
                  value="2"
                />

                <Tab
                  key='tab3H'
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
          <MediaQuery key='mediaQuery2H' query="(max-width:699px)">
            <div className={classes.ddMenu}>
              <NavDropdown
                key='navDropdownH'
                bsPrefix="navdrop"
                menuVariant="dark"
                active={false}
                disabled={false}
                title={
                  <IconButton key='iconMenuH'>
                    <Icon
                      key='iconMenu2H'
                      color="white"
                      icon="menu"
                      size={30}
                      intent="primary"
                    />
                  </IconButton>
                }
              >
                <NavDropdown.Item
                  key='ndI1'
                  className={classes.ddItem}
                  onClick={() => {
                    setPage("1");
                    navigate("/");
                  }}
                >
                  List
                </NavDropdown.Item>
                <NavDropdown.Item
                  key='ndI2'
                  className={classes.ddItem}
                  onClick={() => {
                    setPage("2");
                    navigate("/my-crypto");
                  }}
                >
                  My cryptos
                </NavDropdown.Item>
                <NavDropdown.Item
                  key='ndI3'
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
        <Typography key='typoUserMenu'>
          <IconButton key='iconButUserMenu' onClick={handleOpenUserMenu}>
            <AvatarCustom
              key='avaterUM'
              firstName={userLogged.firstName}
              lastName={userLogged.lastName}
             />
          </IconButton>
          <Menu
            key='userMenu'
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
            <MenuItem key='accountMU'>
              <Link
                key='linkAccount'
                onClick={() => {
                  setPage(0);
                }}
                className={classes.linkAccount}
                to="/account"
              >
                <Typography key='accountTypo' textAlign="center">Account</Typography>
              </Link>
            </MenuItem>
            <MenuItem key='logOutMU'> 
              <Typography  key='logOutTypo' onClick={logOut} textAlign="center">
                <Icon
                  key='logOuticon'
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
