//------------IMPORT EXTERNAL MODULES---------------
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import axios from "axios";

import { Button } from "react-bootstrap";
import {
  ScrollingProvider,
  useScrollSection,
  Section,
} from "react-scroll-section";

import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import {
  AppBar,
  Typography,
  Toolbar,
  makeStyles,
  Tab,
} from "@material-ui/core";

//------------IMPORT INTERNAL COMPONENTS------------
import Access from "../components/Access";
import Banner from "../components/Banner";
import PlotHomePage from "../components/PlotHomePage";
import example from "./example-friends.png"

//definimos los estilos. Para responsividad utilizamos theme.breakpoint, implementado en MUI
const useStyles = makeStyles((theme) => ({
  //header
  header: {
    backgroundColor: "black",
    position: "fixed",
    height: "100px",
    display: "flex",
    opacity: " 0.8",
    zIndex: "8",
    justifyContent: "space-between",
    width: "100%",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: "80px",
    paddingTop: "8px",
  },
  menu: {
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    display: "flex",
  },
  p: {
    padding: "30px 5px 0 5px",
  },
  textSec1: {
    padding: "30px 5px 30px 5px",
  },
  butLogIn: {
    marginRight: "10px",
  },
  //ppal div
  homePage: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100%",
  },
  //section1
  section1: {
    minHeight: "100vh",
    paddingTop: "175px",
  },
  title: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  banner: {
    position: "bottom",
    display: "flex",
    justifyContent: "center",
    color: "white",
  },
  //section2
  section2: {
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "black",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  coin: {
    display: "flex",
  },
  coinName: {
    color: "black",
    display: "flex",
    flexDirection: "column",
  },
  sect2coin: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    paddingTop: "120px",
    marginLeft: "20px",
    height: "100vh",
    alignItems: "center",
    backgroundColor: "white",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sect2info: {
    paddingTop: "120px",
    paddingBottom: "20px",
    width: "50%",
    paddingRight: "100px",
    height: "100vh",
    alignItems: "center",
    color: "white",
    backgroundColor: "black",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  //section3
  section3: {
    width: "100%",
    minHeight: "800px",
    paddingTop: "100px",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  sect3info:{
    paddingTop: "120px",
    paddingBottom: "20px",
    width: "50%",
    paddingLeft: "100px",
    paddingRight:"40px",
    height: "100vh",
    alignItems: "center",
    color: "white",
    backgroundColor: "black",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  sect3follow:{
    paddingTop: "120px",
    paddingBottom: "20px",
    marginTop:0,
    width: "50%",
    paddingRight: "100px",
    height: "100vh",
    alignItems: "center",
    color: "black",
    backgroundColor: "white",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  img:{
    width:'95%',
    display:'flex',
    justifyContent:'center',
    marginLeft:"50px",
    borderRadius:'20px',
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
  }
}));

//-------------MAIN COMPONENT-------------------------

function HomePage() {

  //obtenemos los datos para el plot de la sección2 y los guardamos en un estado
  const [crypt, setCrypt] = useState();
  const getCrypt = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/bitcoin`
    );
    setCrypt(data);
  };

  useEffect(() => {
    getCrypt();
  }, []);

  //componente para mostrar la información de una moneda de la sección2
  function Infocoin() {
    if (!crypt) return <h1></h1>;
    return (
      <div className={classes.coin}>
        <img src={crypt.image.large} alt={crypt.name} height="100" />
        <div>
          <h2 className={classes.coinName}>{crypt.name}</h2>
          <h2 className={classes.coinName}>{crypt.symbol.toUpperCase()}</h2>
        </div>
      </div>
    );
  }
  //Estados para controlar el "pop-up" de sign-up/login
  const [showAcc, setShowAcc] = useState(false);//determina si se muestra el pop-up o no
  const [regis, setRegis] = useState(false);//determina si debe aparecer sign-up o login

  //funciones para abrir el login y el sign-up
  const openLogIn = () => {
    setRegis(true);
    setShowAcc((prev) => !prev);
  };
  const openSignUp = () => {
    setRegis(false);
    setShowAcc((prev) => !prev);
  };

  //componente para mostrar el menú de secciones del header.
  //usamos useScrollSection para tener un efecto de smoothscroll entre secciones
  const StaticMenu = () => {
    const section1 = useScrollSection("home");
    const section2 = useScrollSection("about");
    const section3 = useScrollSection("faqs");

    const [value, setValue] = useState("1");//estado para controlar la sección activa 
    const handleChange = (nv) => {
      setValue(nv);
    };

    return (
      <>{/* Usamos AppBar de MUI para hacer un header fijo */}
        <AppBar className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Typography>
              <Link to="/">
                <img
                  className={classes.logo}
                  src="../logos/logoW.png"
                  alt="Logo CryptoRecords"
                />
              </Link>
            </Typography>

            {/* Usamos MediaQuery de react-responsive para mostrar componentes según el tamaño de pantalla
            Para dispositivos móviles no mostramos las secciones en el header */}
            <MediaQuery query="(min-width:900px)">
              <TabContext className={classes.menu} value={value}>
                <TabList
                  textColor="white"
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab onClick={section1.onClick} label="Trending" value="1" />
                  <Tab onClick={section2.onClick} label="Up&Down" value="2" />
                  <Tab
                    onClick={section3.onClick}
                    label="Friends and more"
                    value="3"
                  />
                </TabList>
              </TabContext>
            </MediaQuery>

            <Typography>
              <Button
                className={classes.butLogIn}
                onClick={openLogIn}
                variant="outline-light"
              >
                LOG IN
              </Button>
            </Typography>
          </Toolbar>
        </AppBar>
      </>
    );
  };

  //return principal del componente
  const classes = useStyles();
  return (
    <div className={classes.homePage}>
      <ScrollingProvider>
        <StaticMenu />
        <Section>
          {/* componente que muestra el pop-up del login/signup */}
          <Access
            showAcc={showAcc}
            setShowAcc={setShowAcc}
            regis={regis}
            setRegis={setRegis}
          />
        </Section>

        <Section className={classes.section1} id="home">
          <div className={classes.title}>
            <h1>CRYPTO RECORDS</h1>
            <Typography className={classes.textSec1} variant="p">
              Join us for stay tuned to last Crypto values!
            </Typography>
            <Button onClick={openSignUp} variant="outline-light">
              GET STARTED
            </Button>{" "}
          </div>
          <div className={classes.banner}>
            <Banner />
          </div>
        </Section>

        <Section className={classes.section2} id="about">
          <div className={classes.sect2coin}>
            <Infocoin />{" "}
            <PlotHomePage
              crypto="bitcoin"
              bkcolor="black"
              bordercolor="black"
            />
          </div>
          <div className={classes.sect2info}>
            <h4 style={{ padding: "10px" }}>
              Join us to track the best data from your favourite crypto coins!
            </h4>
            <ul>
              <li style={{ padding: "20px" }}>
                <h5>
                  Save your favourite coins for accessing easily their data.
                </h5>
              </li>
              <li style={{ padding: "20px" }}>
                <h5>
                  Visualize historical data of the coin price, from just today
                  to five years ago (if the coin is old enough!)
                </h5>
              </li>
              <li style={{ padding: "20px" }}>
                <h5>
                  You can find new coins every day, up-to-date data every
                  second!
                </h5>
              </li>
            </ul>
          </div>
          
        </Section>

        <Section className={classes.section3} id="faqs">
        <div className={classes.sect3info}>
            <h4 style={{ padding: "10px" }}>
              FIND NEW FRIENDS IN THE USERS DATABASE!
            </h4>
            <ul>
              <li style={{ padding: "20px" }}>
                <h5>
                  Follow people that share your interests in crypto-currencies.                
                </h5>
              </li>
              <li style={{ padding: "20px" }}>
                <h5>
                  Share your thoughts and interesting info with your in the message board.
                </h5>
              </li>
            </ul>
          </div>
          <div className={classes.sect3follow}>
            <img
                  className={classes.img}

                  src={example}
                  alt="example-friends"
                />
          </div>
         
        </Section>
      </ScrollingProvider>
    </div>
  );
}

export default HomePage;
