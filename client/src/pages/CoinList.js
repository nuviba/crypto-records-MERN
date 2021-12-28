//------------IMPORT EXTERNAL MODULES---------------
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
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { Icon } from "@blueprintjs/core";
import MediaQuery from "react-responsive";

//------------IMPORT INTERNAL COMPONENTS------------
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";

//-------------STYLES------------------------------
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

// componente que muestra una lista de monedas con buscador y paginación
const CoinList = () => {

const classes = useStyles();
const { userLogged, setUserLogged, page, setPage } = useContext(UserContext);

let [data, setData] = useState([]); //estado para guardar datos de la API
let [search, setSearch] = useState(""); //estado para el input de la búsqueda (componente controlado)

//obtenemos las 100 primeras monedas de la API
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

//función para controlar el cambio en la barra de búsqueda
  const handleChange = (coin) => {
    setPage("1")
    setSearch(coin.target.value);
  };
//función para controlar la paginación
  const handlePage = () => {
    return data.filter((crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <>
      <Header key="header" />

      <div className={classes.mainList}>
        {/* barra de búsqueda */}
        <div  className={classes.searchCryp}>
          <TextField
            key="search"
            className={classes.searchBar}
            onChange={handleChange}
            id="standard-basic"
            label="Search by name"
            variant="standard"
            color="black"
          />
        </div>

        <Table key="table" className={classes.table}>

          <TableHead key="tableHead">
            <TableRow key="rowTableHead">
              {["Fav", "Coin", "24h % var", "Current price", "Market cap"].map(
                (el) => {
                  return (
                    <TableCell
                      key={el}
                      className={classes.head}
                    >
                      {el}
                    </TableCell>
                  );
                }
              )}
            </TableRow>
          </TableHead>

          <TableBody key="tableBody">
            {handlePage()
              .slice((page - 1) * 5, (page - 1) * 5 + 5)
              .map((crypto, i) => {
                //funciones para añadir monedas a favoritos o eliminarlas
                      const addFav = async () => {
                        await axios
                          .put("favs/add", {
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
                          .put("favs/delete", 
                          {email: userLogged.email, coin: crypto.id }
                          )
                          .then((res) => {
                            console.log(res);
                            setUserLogged(res.data.data);
                          });
                      };//estamos aún en el map!
                        return (
                          <TableRow key={`row${i}`} className={classes.row}>
                            <TableCell key={`cell1_${i}`} className={classes.cell}>
                              {userLogged.favs.indexOf(crypto.id) === -1 ? (
                                <Icon
                                  key={`icon1_${i}`}
                                  className={classes.starEmpty}
                                  onClick={addFav}
                                  color="#D8E1E8"
                                  icon="star-empty"
                                  size={30}
                                  intent="primary"
                                />
                              ) : (
                                <Icon
                                  key={`icon1_${i}`}
                                  className={classes.star}
                                  onClick={deleteFav}
                                  color="#D8E1E8"
                                  icon="star"
                                  size={30}
                                  intent="primary"
                                />
                              )}
                            </TableCell>
                            <TableCell key={`cell2_${i}`} className={classes.cell}>
                              <Link key={`link_${i}`}
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
                                <MediaQuery key={`mq_${i}`} query="(min-width:900px)">
                                  <div>
                                    <p>
                                      <b>{crypto.name}</b>
                                    </p>
                                    <p>{crypto.symbol.toUpperCase()}</p>
                                  </div>
                                </MediaQuery>
                              </Link>
                            </TableCell>
                            <TableCell key={`cell3_${i}`} className={classes.cell}>
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
                            <TableCell key={`cell4_${i}`} className={classes.cell}>
                              <p className={classes.priceCryp}>
                                {crypto.current_price.toLocaleString()}€
                              </p>
                            </TableCell>
                            <TableCell key={`cell5_${i}`} className={classes.cell}>
                              <p className={classes.marktCap}>
                                {crypto.market_cap.toLocaleString()}€
                              </p>
                            </TableCell>
                          </TableRow>
                        );//salimos del map, hemos creado una fila para cada moneda
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
