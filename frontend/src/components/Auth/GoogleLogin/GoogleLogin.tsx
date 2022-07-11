import React, { FC } from 'react';
import GoogleLogin from 'react-google-login';

import {googleLogin} from '../../../utils/google-login';



const GoogleLoginButton:FC = () => {

  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;

  const handleSuccess = async (res:any) => {
    const tokens = await googleLogin(res);

    if(!tokens) {
      alert("Error while logging via Google 1")
    } else {
      console.log("navigate");
    }
  }

  const handleFailure = (res:any) => {
    console.log(res)
    alert("Error while logging via Google 2")
  }

  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Log in Google"
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export {GoogleLoginButton};
