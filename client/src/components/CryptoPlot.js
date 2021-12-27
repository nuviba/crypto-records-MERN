import { React, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  sec2: {
    width: "60%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    color: "white",
  },
  button: {
    marginLeft: "5px",
    [theme.breakpoints.up("sm")]: {
      width: "120px",
      marginLeft: "20px",
      marginBottom: "5px",
    },
  },
}));

const CryptoPlot = ({ crypto, bordercolor, bkcolor }) => {
  const [dataCrypt, setDataCrypt] = useState();
  const [days, setDays] = useState(2);
  console.log(crypto);

  const classes = useStyles();

  const getData = async () => {
    const { data } = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=eur&days=${days}`
    );
    console.log(data.prices);
    setDataCrypt(data.prices);
  };

  useEffect(() => {
    getData();
  }, [days]);

  if (!dataCrypt) return <h1></h1>;
  return (
    <>
      <div className={classes.sec2}>
        <Line
          data={{
            labels: dataCrypt.map((element) => {
              let date = new Date(element[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: dataCrypt.map((element) => element[1]),
                label: "Price in €",
                pointBackgroundColor: bkcolor,
                borderColor: bordercolor,
                pointRadius: 0,
              },
            ],
          }}
          options={{ maintainAspectRatio: true, plugins: { legend: false } }}
        />
        <div>
          <Button
            onClick={() => {
              setDays(1);
            }}
            className={classes.button}
            variant="outline-dark"
          >
            24h
          </Button>
          <Button
            onClick={() => {
              setDays(7);
            }}
            className={classes.button}
            variant="outline-dark"
          >
            1 WEEK
          </Button>
          <Button
            onClick={() => {
              setDays(30);
            }}
            className={classes.button}
            variant="outline-dark"
          >
            1 MONTH
          </Button>
          <Button
            onClick={() => {
              setDays(365);
            }}
            className={classes.button}
            variant="outline-dark"
          >
            1 YEAR
          </Button>
          <Button
            onClick={() => {
              setDays(365 * 5);
            }}
            className={classes.button}
            variant="outline-dark"
          >
            5 YEAR
          </Button>
        </div>
      </div>
    </>
  );
};

export default CryptoPlot;
