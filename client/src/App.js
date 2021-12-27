import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useMemo, useEffect } from "react";

import HomePage from "./pages/HomePage";
import CryptoPage from "./pages/CryptoPage";
import CoinList from "./pages/CoinList";
import Footer from "./components/Footer";
import FavPage from "./pages/FavPage";
import Friends from "./pages/Friends";

import { UserContext } from "./contexts/UserContext";
import Account from "./pages/Account";
import FriendList from "./components/SearchUsers";

const useStateWithLocalStorage = (localStorageKey) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || null
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

function App() {
  const [page, setPage] = useState("1");
  const [userLogged, setUserLogged] = useStateWithLocalStorage("userLogged");
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "white",
      color: "black",
    },
  }));

  console.log(userLogged);

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        {/*  <Header/>  */}

        <UserContext.Provider
          value={{
            userLogged,
            setUserLogged,
            page,
            setPage,
            following,
            setFollowing,
            followers,
            setFollowers,
          }}
        >
          <Routes>
            <Route
              path="/"
              element={userLogged === "null" ? <HomePage /> : <CoinList />}
            />
            <Route path="/crypto/:id" element={<CryptoPage />} />
            <Route path="/my-crypto" element={<FavPage />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/account" element={<Account />} />
            <Route path="/list" element={<CoinList />} />
          </Routes>
        </UserContext.Provider>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
