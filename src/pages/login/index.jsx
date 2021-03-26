import React, { useState } from "react";
// import {useHistory} from 'react-router-dom';

import {Avatar, Box, Button, Card, TextField} from "@material-ui/core";

import {loginConstants} from '../../constants/loginConstants'

import "./styles.scss";
// import axios from "axios";

export default function Login() {
 
    const {userName,  userPassword, loginButton} = loginConstants;

    const [user, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const handleChange = (e) => {
        console.log(e.target.value)
    }

  return (
    <Box className='login-screen'>
      <Card className='login-card'>
          <Avatar />

          <TextField label ={userName} type="text" onChange={handleChange} classes={{root:'text-field'}}></TextField>

          <TextField label ={userPassword} type="text" onChange={handleChange} classes={{root:'text-field'}}></TextField>

          <Button>{loginButton}</Button>


          
      </Card>
    </Box>
  );
}
