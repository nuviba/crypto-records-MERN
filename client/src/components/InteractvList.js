import React, { useEffect, useState } from 'react'
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";


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

const InteractvList = () => {

const [trendList, setTrendList]=useState([]);
const classes =useStyles();

useEffect(() => {
  axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`) 
  .then(res =>{
    setTrendList(res.data);
  })
  .catch(err=>console.log(err));
  },[]);

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
