import React, { FC } from 'react';
import GoogleLogout from 'react-google-login';

import { googleLogout } from '../../../utils/google-login';


const GoogleLogoutButton:FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const onSuccess = async(res:any) => {
    await googleLogout(res)
    console.log(res)
  }
  const onFailure = async(res:any) => {
    console.log(res)
    alert('onFailure')
  }

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText={"Log out"}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />

  );
}

export {GoogleLogoutButton};
