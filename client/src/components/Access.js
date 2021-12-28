//------------IMPORT EXTERNAL MODULES---------------
import { makeStyles } from "@material-ui/core";

//------------IMPORT INTERNAL COMPONENTS------------
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

//-------------STYLES------------------------------
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
        {showAcc?(//solo mostramos este componente si showAcc es true
          <div className={classes.global}>      
          <div className={classes.sgnIn} showAcc={showAcc}>
            {regis? //dependiendo del valor del estado, mostramos signIn o signUp
            <SignIn key='signIn' setRegis={setRegis}/>
            :<SignUp key="signUp" setRegis={setRegis} />}
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