import React, { FC } from 'react';
import GoogleLogin from 'react-google-login';
import { useAppDispatch } from '../../../hooks/redux';
import { googleLogin, setLoginActive } from '../../../store/slices';

const GoogleLoginButton:FC = () => {

  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useAppDispatch();

  const handleSuccess = async (res:any) => {
    const tokens = await dispatch(googleLogin(res));

    if(!tokens) {
      alert("Error while logging via Google 1")
    } else {
      dispatch(setLoginActive());
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
      buttonText=""
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
}

export {GoogleLoginButton};
