//------------IMPORT EXTERNAL MODULES---------------
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";

//------------IMPORT INTERNAL COMPONENTS------------
import HomePage from "./pages/HomePage";
import CryptoPage from "./pages/CryptoPage";
import CoinList from "./pages/CoinList";
import Footer from "./components/Footer";
import FavPage from "./pages/FavPage";
import Friends from "./pages/Friends";
import { UserContext } from "./contexts/UserContext";
import Account from "./pages/Account";

//-------------LOCAL SESSION-------------------------
/* Comprobamos si el usuario está logeado y guardado en el localStorage.
Si está en el localStorage, lo leemos y lo guardamos en un estado de React.
 */
const useStateWithLocalStorage = (localStorageKey) => {
  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || null
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};

//-------------MAIN APP COMPONENT-------------------------
/*Componente principal de la aplicación
 */
function App() {
  //cargamos los estados necesarios
  const [page, setPage] = useState("1"); // nos sirve para controlar que TAB está activa en los headers
  const [userLogged, setUserLogged] = useStateWithLocalStorage("userLogged"); //cargamos el usuario logeado. si no hubiera se carga a null, ver código arriba.
  const [following, setFollowing] = useState([]);//guardamos los following y followers más adelante, de momento se inicia el estado a array vacío.
  const [followers, setFollowers] = useState([]);

//aquí y durante toda la app utilizamos MakeStyles de Material UI para controlar los estilos de cada componente
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "white",
      color: "black",
    },
  }));

  const classes = useStyles();

  return (
//utilizamos React Router para definir diferentes rutas en la aplicación 
    <BrowserRouter key='browserRoute'>
      <div className={classes.App}>
{/*         usamos useContext con un contexto definido para compartir estados con todos los componentes y rutas.
 */}     <UserContext.Provider
          key='userContext'
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
          <Routes key='routes'>
{/*             para la ruta raíz comprobamos si el usuario está logeado o no, para llevarlo a la sección privada o la pública
 */}        <Route 
              key='routeRoot'
              path="/"
              element={userLogged === "null" ? <HomePage /> : <CoinList />}
            />
            <Route key='routeCryptoPage' path="/crypto/:id" element={<CryptoPage />} />
            <Route key='routefav' path="/my-crypto" element={<FavPage />} />
            <Route key='routefriends' path="/friends" element={<Friends />} />
            <Route key='routeAccount' path="/account" element={<Account />} />
            <Route key='routeList' path="/list" element={<CoinList />} />
          </Routes>
        </UserContext.Provider>

        <Footer key='footer' />
      </div>
    </BrowserRouter>
  );
}

export default App;
