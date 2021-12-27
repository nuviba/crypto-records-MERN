import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Tab,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Icon } from "@blueprintjs/core";
import MediaQuery from "react-responsive";

import { UserContext } from "../contexts/UserContext";

import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  mainList: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchCryp: {
    marginTop: "100px",
    marginBottom: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  searchBar: {
    width: "100%",
    color: "black",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
  },
  table: {
    width: "70%",
  },
  head: {
    color: "white",
    backgroundColor: "black",
    fontSize: "large",
    padding: 10,
  },
  row: {
    height: 80,
  },
  cell: {
    height: 50,
    padding: 5,
  },
  starEmpty: {
    cursor: "pointer",
  },
  star: {
    cursor: "pointer",
  },
  img: {
    height: "40px",
    width: "40px",
    marginRight: "20px",
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
  pages: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "50px",
    "& .MuiPaginationItem-root": {
      color: "black",
    },
    "& .MuiPaginationItem-ul": {},
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
    },
  },
}));

const CoinList = () => {
  let [data, setData] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(function () {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (coin) => {
    setPage(1);
    setSearch(coin.target.value);
  };

  const handlePage = () => {
    return data.filter((crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const classes = useStyles();

  const { userLogged, setUserLogged, page, setPage } = useContext(UserContext);

  return (
    <>
      <Header key="header" />
      <div className={classes.mainList}>
        <div key="search" className={classes.searchCryp}>
          <TextField
            className={classes.searchBar}
            onChange={handleChange}
            id="standard-basic"
            label="Search by name"
            variant="standard"
            color="black"
          />
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {["Fav", "Coin", "24h % var", "Current price", "Market cap"].map(
                (el) => {
                  return (
                    <TableCell
                      key={el}
                      className={classes.head}
                      align={el === "24h var plot" ? "center" : "left"}
                    >
                      {el}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {handlePage()
              .slice((page - 1) * 5, (page - 1) * 5 + 5)
              .map((crypto) => {
                const addFav = async () => {
                  await axios
                    .post("http://localhost:4000/favs/add", {
                      email: userLogged.email,
                      coin: crypto.id,
                    })
                    .then((res) => {
                      console.log(res);
                      setUserLogged(res.data.data);
                    });
                };

                const deleteFav = async () => {
                  await axios
                    .delete("http://localhost:4000/favs/delete", {
                      data: { email: userLogged.email, coin: crypto.id },
                    })
                    .then((res) => {
                      console.log(res);
                      setUserLogged(res.data.data);
                    });
                };
                return (
                  <TableRow className={classes.row}>
                    <TableCell className={classes.cell}>
                      {userLogged.favs.indexOf(crypto.id) == -1 ? (
                        <Icon
                          className={classes.starEmpty}
                          onClick={addFav}
                          color="#D8E1E8"
                          icon="star-empty"
                          size={30}
                          intent="primary"
                        />
                      ) : (
                        <Icon
                          className={classes.star}
                          onClick={deleteFav}
                          color="#D8E1E8"
                          icon="star"
                          size={30}
                          intent="primary"
                        />
                      )}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <Link
                        onClick={() => {
                          setPage(0);
                        }}
                        to={`/crypto/${crypto.id}`}
                        className={classes.linkCrypt}
                      >
                        <div className={classes.crypimg}>
                          <img
                            src={crypto.image}
                            alt={crypto.name}
                            className={classes.img}
                          />
                        </div>
                        <MediaQuery query="(min-width:900px)">
                          <div>
                            <p>
                              <b>{crypto.name}</b>
                            </p>
                            <p>{crypto.symbol.toUpperCase()}</p>
                          </div>
                        </MediaQuery>
                      </Link>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      {crypto.price_change_percentage_24h ? (
                        crypto.price_change_percentage_24h < 0 ? (
                          <p className={classes.percentRed}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        ) : (
                          <p className={classes.percentGreen}>
                            {crypto.price_change_percentage_24h.toFixed(2)}%
                          </p>
                        )
                      ) : (
                        <p className={classes.percentRed}>No data</p>
                      )}
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <p className={classes.priceCryp}>
                        {crypto.current_price.toLocaleString()}€
                      </p>
                    </TableCell>
                    <TableCell className={classes.cell}>
                      <p className={classes.marktCap}>
                        {crypto.market_cap.toLocaleString()}€
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        <Pagination
          key="pagi"
          className={classes.pages}
          count={parseInt((handlePage().length / 6).toFixed(0))}
          onChange={(_, pag) => {
            setPage(pag);
          }}
          color="standard"
        />
      </div>
    </>
  );
};

export default CoinList;