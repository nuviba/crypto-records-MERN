import {Button} from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core';

import React, {useContext, useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles (()=>({
  signin:{
    display:'flex',
    flexDirection:'column',
    minHeight:'300px',
    minWidth: '400px',
    justifyContent:'space-between'
  },
  signininput:{
    display:'flex',
    flexDirection:'column'
  },
  classP:{
    padding:'20px',
    display:'flex'
  },
  regSignUp:{
    cursor:'pointer',
    color:'rgb(41,93,207)'
  },
  button:{
    marginBottom:'20px'
  }
  
}));

function SignIn({setRegis}){
  const navigate = useNavigate();
  const { setUserLogged, setPage } = useContext(UserContext);
  const [feed, setFeed] = useState("")
  
  const classes= useStyles();

  return(
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={values => {
        return axios({
          method: "POST",
          url: "http://localhost:4000/users/sign-in",
          data: values})
          .then((res)=>{console.log(res.data.user);
            if(res.data.isAuth){
              setUserLogged(res.data.user)
              setPage("1")
              navigate('/', {replace: true})
            }
          else{
            setFeed(res.data.message)
          }
        })
      }}
      render={({ errors, touched }) => (
    <Form>
      <div className={classes.signin}>
        <div className={classes.signininput}>
        <p>Log in to follow cryptos with us!</p>
        <Field name="email" placeholder="example@email.com" type="email" />
        <Field style={{marginTop:'20px'}} name="password" placeholder="password" type="password" />
        <div className={classes.classP}>
        <p >{'Not yet registered?'}<br/> {'Create an account'} <span className={classes.regSignUp} onClick={()=>{setRegis(false)}}>here!
        </span></p>
        </div>
        </div>
        <p>{feed}</p>
        <Button className={classes.button} type="submit">Sign In</Button>

      </div>
    </Form>)}
    />)};

export default SignIn;