import React, { FC } from 'react';
import GoogleLogout from 'react-google-login';


const GoogleLogoutButton:FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID as string;
  const onSuccess = () => {
    console.log('Logout successful');
  }

  return (
    <GoogleLogout
      clientId={clientId}
      buttonText={"Log out"}
      // @ts-ignore
      onLogoutSuccess={onSuccess}
    />

  );
}

export {GoogleLogoutButton};
