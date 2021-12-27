import { React, useState, useEffect, useContext } from "react";
import {
  makeStyles,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Tab,
} from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";

import Banner from "../components/Banner";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import MediaQuery from "react-responsive";

import MiniPlot from "../components/MiniPlot";

const useStyles = makeStyles((theme) => ({
  favs: {
    paddingTop: "120px",
    paddingBottom: "20px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  headTable: {
    padding: 10,
    fontSize: "large",
    color: "white",
    backgroundColor: "black",
  },
  head: {
    width: "100vw",
    position: "sticky",
  },
  table: {
    width: "70%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  cell: {
    height: 50,
    padding: 0,
  },
  headRow: {
    width: "100vw",
  },
  img: {
    height: "50px",
    width: "50px",
    marginRight: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "40px",
      width: "40px",
      marginLeft: "10px",
    },
  },
  percentRed: {
    color: "red",
  },
  percentGreen: {
    color: "rgb(51, 143, 51)",
  },

  linkCrypt: {
    textDecoration: "none",
    color: "black",
    display: "flex",
  },
  miniPlot: {
    width: "400px",
    height: "110px",
    display: "flex",
    alignItems: "center",
  },
  linkNoFav: {
    textDecoration: "none",
  },
}));

function FavPage() {
  const classes = useStyles();
  const { userLogged, setPage } = useContext(UserContext);

  const [favlist, setFavlist] = useState([]);
  const [favData, setFavData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    axios
      .post(`http://localhost:4000/favs/`, { email: userLogged.email })
      .then((res) => {
        if (res.data.data.length > 0) {
          setFavlist(res.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(favlist);

  useEffect(() => {
    setLoading(true);
    Promise.all(
      favlist.map((id) =>
        fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
          .then((res) => res.json())
          .then((json) => json)
      )
    ).then((datos) => {
      setFavData(datos);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [favlist]);

  function CoinFavs() {
    function Nofavs() {
      return (
        <div>
          <h2>You have not added favorites!</h2>
          <Link
            className={classes.linkNoFav}
            onClick={() => {
              setPage("1");
            }}
            to={"/"}
          >
            <h3>Go to the list of all coins to start adding favorites!</h3>
          </Link>{" "}
        </div>
      );
    }

    return loading ? (
      <div>Loading</div>
    ) : favData.length === 0 ? (
      <Nofavs />
    ) : (
      <Table stickyHeader className={classes.table}>
        <TableHead className={classes.head}>
          <TableRow className={classes.headRow}>
            <MediaQuery query="(min-width:900px)">
              {[
                "Coin",
                "24h var plot",
                "24h % var",
                "Current price",
                "Market cap",
              ].map((el) => {
                return (
                  <TableCell
                    key={el}
                    className={classes.headTable}
                    align={el === "24h var plot" ? "center" : "left"}
                  >
                    {el}
                  </TableCell>
                );
              })}
            </MediaQuery>
            <MediaQuery query="(max-width:899px)">
              {["Coin", "24h % var", "Current price", "Market cap"].map(
                (el) => {
                  return (
                    <TableCell
                      key={el}
                      className={classes.headTable}
                      align={el === "24h var plot" ? "center" : "left"}
                    >
                      {el}
                    </TableCell>
                  );
                }
              )}
            </MediaQuery>
          </TableRow>
        </TableHead>

        <TableBody>
          {favData.map((fav) => {
            const color = fav.market_data.price_change_percentage_24h
              ? fav.market_data.price_change_percentage_24h < 0
                ? "red"
                : "green"
              : null;

            return (
              <TableRow>
                <TableCell className={classes.cell}>
                  <Link
                    to={`/crypto/${fav.id}`}
                    className={classes.linkCrypt}
                    onClick={() => {
                      setPage(0);
                    }}
                  >
                    <div className={classes.crypimg}>
                      <img
                        src={fav.image.large}
                        alt={fav.name}
                        className={classes.img}
                      />
                    </div>
                    <MediaQuery query="(min-width:900px)">
                      <div className={classes.name}>
                        <p className={classes.name}>
                          <b>{fav.name}</b>
                        </p>
                        <p className={classes.symbCryp}>
                          {fav.symbol.toUpperCase()}
                        </p>
                      </div>
                    </MediaQuery>
                  </Link>
                </TableCell>
                <MediaQuery query="(min-width:900px)">
                  <TableCell className={classes.cell}>
                    <div className={classes.miniPlot}>
                      <MiniPlot
                        crypto={fav.id}
                        bordercolor={color}
                        bkcolor={color}
                      />
                    </div>
                  </TableCell>
                </MediaQuery>
                <TableCell className={classes.cell}>
                  {fav.market_data.price_change_percentage_24h ? (
                    fav.market_data.price_change_percentage_24h < 0 ? (
                      <p className={classes.percentRed}>
                        {fav.market_data.price_change_percentage_24h.toFixed(2)}
                        %
                      </p>
                    ) : (
                      <p className={classes.percentGreen}>
                        {fav.market_data.price_change_percentage_24h.toFixed(2)}
                        %
                      </p>
                    )
                  ) : (
                    <p className={classes.percentRed}>No data</p>
                  )}
                </TableCell>
                <TableCell className={classes.cell}>
                  <p className={classes.priceCryp}>
                    {fav.market_data.current_price.eur.toLocaleString()}€
                  </p>
                </TableCell>
                <TableCell className={classes.cell}>
                  <p className={classes.marktCap}>
                    {fav.market_data.market_cap.eur.toLocaleString()}€
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  return (
    <div>
      <Header />

      <div className={classes.favs}>
        <CoinFavs />
      </div>
    </div>
  );
}

export default FavPage;
