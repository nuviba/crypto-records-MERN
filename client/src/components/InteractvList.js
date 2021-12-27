//------------IMPORT EXTERNAL MODULES---------------
import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";

//-------------STYLES------------------------------
const useStyles = makeStyles((theme) => ({
  styleList: {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    color:'white',
    borderTop: '1px outset hsl(0, 0%, 61%)',
    paddingTop:'45px'
  },
  h4:{
    fontSize:'xx-small'
  }
}));

//componente para construir un Alice-Carrousel con los datos de las coin más trending
const InteractvList = () => {

const classes =useStyles();

const [trendList, setTrendList]=useState([]);
useEffect(() => {
  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`) 
  .then(res =>{
    setTrendList(res.data);
  })
  .catch(err=>console.log(err));
  },[]);

  //creamos los items individuales del carrousel
const items= trendList.map((trend)=>{
  let upd = trend.price_change_percentage_24h >= 0;
  return(
    <>
    <div>
      <img src={trend.image} alt={trend.name} height={'65px'}/>
      <div style={{display:"flex"}}>
        <h4 style={{fontSize:'large'}}>{trend.symbol.toUpperCase()}   </h4>
        <h4 style={{
          color: upd>0 ? 'green':'red',
        fontSize:'large'}}> {trend.price_change_percentage_24h.toFixed(2)}%</h4>
      </div>
      <h4 style={{fontSize:'large'}}>{trend.current_price.toFixed(2)}€</h4>
      </div>
    </>
    )
  })

//según tamaño de pantalla cambiamos el número de elementos mostrados en el carrousel
const responsive = {
  0: {
    items: 2,
  },
  512: {
    items: 6,
  },
  };

  return (
    <div>
      <div className={classes.styleList}>
          <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={2000}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
          />    
      </div>
    </div>
  )
} 

export default InteractvList
