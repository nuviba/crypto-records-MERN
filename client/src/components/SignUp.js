import { Button} from 'react-bootstrap';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles (()=>({
  signup:{
    display:'flex',
    flexDirection:'column',
    minHeight:'500px',
    minWidth: '400px',
    justifyContent:'space-between',
    },
  regLogIn:{
    cursor:'pointer',
    color:'rgb(41,93,207)'
  },
  textInput:{
    margin:'5px'
  }
  
  
}));


const SignUpSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Must be longer than 4 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  firstName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a first name that long')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Must be longer than 2 characters')
    .max(20, 'Nice try, nobody has a last name that long')
    .required('Required'),
  password: Yup.string()
    .min(5, 'Must be longer than 5 characters')
    .required('Required'),
  date: Yup.date().required('Required')
});

const SignUp = ({setRegis}) =>{

const classes= useStyles();
  
return(
  
  
    <Formik
      initialValues={{
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        date: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={values => {
        return axios({
          method: "POST",
          url: "http://localhost:4000/users/sign-up",
          data: values
        }).then((res)=>{console.log(res)
        setRegis(true)})
      }}
      render={({ errors, touched }) => (
        <>
        <Form>
          
          <div className={classes.signup}>
          <p>{'Not yet registered? '}<br/>{'Fill this up to join us!'}</p> 

          <Field className={classes.textInput} name="username" placeholder="Username" type="text" />
          <ErrorMessage
            name="username"
            component="div"
            className="field-error"
          />

          <Field className={classes.textInput} name="firstName" placeholder="Name" type="text" />
          <ErrorMessage
            name="firstName"
            component="div"
            className="field-error"
          />

          <Field className={classes.textInput} name="lastName" placeholder="Last name" type="text" />
          <ErrorMessage
            name="lastName"
            component="div"
            className="field-error"
          />
          
          <Field className={classes.textInput} name="date" type="date" />
          <ErrorMessage
            name="date"
            component="div"
            className="field-error"
          />

          <Field className={classes.textInput} name="email" placeholder="example@email.com" type="email" />
          <ErrorMessage
            name="email"
            component="div"
            className="field-error"
          />

          <Field className={classes.textInput} name="password" placeholder="password" type="password" />
          <ErrorMessage name="password" component="div" className="field-error" />

          <p>Do you have an account? Then 
            <div className={classes.regLogIn} onClick={()=>{setRegis(true)}}>log in!
            </div> 
          </p>
          
          <Button type="submit">Sign Up</Button>
          </div>
          
        </Form>
        </>
        
      )}
    />
  
)};
export default SignUp;
