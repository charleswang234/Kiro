import React from "react";
import { login, getAccessToken } from './utils/AuthService';
import axios from 'axios';



class Login extends React.Component {

  constructor() {
    super();
  }

  login = () => {
    login()
  }

  getUser = () =>{
    let token = getAccessToken()
    console.log(token)
    axios(
      {
        method:'get',
        url:'https://lhl.auth0.com/userinfo',
        headers: { authorization: `Bearer ${token}`}
      }
    )
    .then( res => {
      console.log(res)
    })
    .catch(error => {
    console.log(error.response)
})
  }

  render() {

    return (
      <div>
        <p>You must log in to view this page!</p>
        <button onClick={this.login}>Log in</button>
        <button onClick={this.getUser}>Get User</button>
      </div>

      
    )
  }
}


export default Login