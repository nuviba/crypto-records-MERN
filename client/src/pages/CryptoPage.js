//------------IMPORT EXTERNAL MODULES---------------
import React from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import MediaQuery from "react-responsive";

//------------IMPORT INTERNAL COMPONENTS------------
import Header from "../components/Header";
import CryptoPlot from "../components/CryptoPlot";

//-------------STYLES------------------------------
const useStyles = makeStyles((theme) => ({
  appCryp: {
    paddingTop: "120px",
    paddingBottom: "120px",
    background: "white",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
  sec1: {
    justifyContent: "space-between",
    width: "70%",
    display: "flex",
    alignItems: "end",
    marginTop: 0,
    color: "black",
    borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
  },
  title: {
    width: "25%",
    borderRight: "1px solid rgba(0, 0, 0, 0.25)",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
  price: {
    width: "35%",
    paddingBottom: "25px",
    paddingLeft: "10px",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      width: "50%",
    },
  },
  details: {
    width: "35%",
    paddingRight: "20px",
  },
  description: {
    width: "100%",
    padding: 0,
    paddingBottom: 0,
    paddingTop: 0,
    textAlign: "justify",
    textDecoration: "none",
  },
  link: {
    textDecoration: "none",
    color: "white",
    border: "2px groove grey",
    borderRadius: "20px",
    padding: "10px",
    backgroundColor: "black",
  },
  plot: {
    width: "100%",
  },
}));

//componente para mostrar detalles individuales de una moneda en concreto
const CryptoPage = () => {
  const classes = useStyles();
  const { id } = useParams(); //llamamos a cada moneda mediante una ruta con params 

  const [crypt, setCrypt] = useState();
//guardamos los datos de la api en un estado
  const getCrypt = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
    setCrypt(data);
  };

  useEffect(() => {
    getCrypt();
  }, []);

  if (!crypt) return <h1>Loading ...</h1>;

  return (
    <>
      <Header key="header"/>

      <div className={classes.appCryp}>
        <div className={classes.sec1}>
          <div className={classes.title}>
            <img src={crypt.image.large} alt={crypt.name} height="90" />
            <h3>
              {crypt.name}-{crypt.symbol.toUpperCase()}
            </h3>
            <h3>Rank #{crypt.market_cap_rank}</h3>
          </div>
          <MediaQuery key="mq" query="(min-width:900px)">
            <div className={classes.details}>
              <p className={classes.description}>
                {ReactHtmlParser(crypt.description.en.split(". ")[0])}.
              </p>
            </div>
          </MediaQuery>
          <div className={classes.price}>
            <h5>
              Current price:{" "}
              {crypt.market_data.current_price.eur
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              €
            </h5>

            <h5>
              Market Cap:{" "}
              {crypt.market_data.market_cap.eur
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              €
            </h5>
          </div>
        </div>

        <CryptoPlot key={`plot_${id}`}
          className={classes.plot}
          crypto={id}
          bkcolor="green"
          bordercolor="black"
        />
      </div>
    </>
  );
};

export default CryptoPage;
