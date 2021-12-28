//------------IMPORT EXTERNAL MODULES---------------
import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core';

//importamos el contexto de usuario
import { UserContext } from '../contexts/UserContext';

//-------------STYLES------------------------------
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
  const navigate = useNavigate();//usamos navigate para redirigir
  const { setUserLogged, setPage } = useContext(UserContext);
  const [feed, setFeed] = useState("") //estado para controlar el feedback del servidor
  
  const classes= useStyles();

  //usamos Formik para validar el contenido del formulario antes de enviar al server. Comprobamos forma, no tiene nada que ver con la autentificación. Una vez los campos requeridos están rellenos y el usuario accede la información se envía al server
  return(
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      //función para manejar el envío al servidor 
      onSubmit={values => {
        return axios({
          method: "POST",
          url: "users/sign-in",
          data: values})
          .then((res)=>{console.log(res.data.user);
            if(res.data.isAuth){//IMPORTANTE: comprobamos si el login en el servidor ha sido correcto
              setUserLogged(res.data.user) //guardamos el usuario 
              setPage("1")
              navigate('/', {replace: true})
            }
          else{
            setFeed(res.data.message) //si la atentificación falla en el servidor, guardamos el feedback
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