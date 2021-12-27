import { Tabs, Tab} from 'react-bootstrap';
import { makeStyles } from "@material-ui/core";
import { useState } from 'react';

import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

  const useStyles = makeStyles((theme) => ({
    access: {
        display:'flex',
        flexDirection:'row-reverse',
        color:'white'
    },
    global:{
      position:'fixed',
      background:'rgb(35,39,46)',
      width:'auto',
      height:'auto',
      top:'50%',
      left:'50%',
      zIndex:'10',
      transform: 'translate(-50%,-50%)',
      borderRadius:' 20px',
      display:'flex',
      opacity:'1'
    },
    sgnIn:{
      position:'relative',
      width:'100%',
      margin:'0 auto',
      height:'auto',
      maxHeight: '70vh',
      background:'rgb (35,39,46)',
      borderRadius:' 20px',
      padding: '20px',
      overflow: 'auto',
      opacity:'1'
    }, 
    closeBut:{
      cursor:'pointer',
      position:'absolute',
      top:'20px',
      right:'20px',
      width:'32px',
      height:'32px',
      zIndex:'10',
      color:'white'
    }
  }));

function Access ({showAcc,setShowAcc, regis, setRegis}){

  const classes =useStyles();
    return(
      <>
        {showAcc?(
          <div className={classes.global}>      
          <div className={classes.sgnIn} showAcc={showAcc}>
            {/* <Tabs defaultActiveKey="SignIn" id="uncontrolled-tab-example" className="mb-3">
            <Tab eventKey="SignIn" title="Sing In" color="white">
                <SignIn/>
            </Tab>
            <Tab eventKey="SignUp" title="Sign Up">
                <SignUp />
            </Tab>
            </Tabs>  */}
            {regis?
            <SignIn setRegis={setRegis}/>
            :<SignUp setRegis={setRegis} />}
            <div >
                <span className={classes.closeBut} onClick={()=>setShowAcc(prev=> !prev)}>X</span>
            </div>
        </div>
        </div>
        ):null}
      </>
    )
}

export default Access;