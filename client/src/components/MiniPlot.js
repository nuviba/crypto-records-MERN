//------------IMPORT EXTERNAL MODULES---------------
import {React, useState, useEffect} from 'react';
import axios from 'axios';
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
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

//-------------STYLES------------------------------
const useStyles = makeStyles((theme) => ({
sec2:{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      color: 'white'
    }
  }));
//componente para producir gráficos en tabla de monedas favoritas
const MiniPlot = ({crypto,bordercolor,bkcolor}) => {
  const classes =useStyles();

  const [dataCrypt, setDataCrypt]=useState();
  //obtenemos datos de la API
  const getData = async () => {
    const  { data }  = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=eur&days=1`);
    setDataCrypt(data.prices);
  };

  useEffect(() => {
    getData();
  },[]);
    
  if (!dataCrypt) return <p>Loading...</p>;
    return (
        <div className={classes.mainDiv}>
            <div className={classes.sec2}>
              <Line 
                key='miniPlot'
                data={{
                  labels:dataCrypt.map((element)=>{
                    let date = new Date(element[0]);
                      return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
                  }),
                  datasets:[
                    {data: dataCrypt.map((element)=>element[1]),
                      label:false,
                      pointBackgroundColor:bkcolor,
                      borderColor:bordercolor,
                  pointRadius:0}]     
                  }}
                  options={{maintainAspectRatio:false, plugins:{legend:false}, scales:{x:{display:false},y:{display:false}}}}
                  height={70}
              />     
            </div>    
        </div>
    )
}

export default MiniPlot
