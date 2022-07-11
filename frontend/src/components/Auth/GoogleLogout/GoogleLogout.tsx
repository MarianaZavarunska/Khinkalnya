import React, { FC } from 'react';
import GoogleLogout from 'react-google-login';
import { useAppDispatch } from '../../../hooks/redux';
import { googleLogout } from '../../../store/slices/user.slice';





const GoogleLogoutButton:FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  const dispatch = useAppDispatch();

  const onSuccess = async(res:any) => {
    console.log(res, "logout")
    await dispatch(googleLogout(res));

    console.log(res)
  }
  const onFailure = async(res:any) => {
    console.log(res)
    alert('onFailure')
  }


  return (
    <GoogleLogout
      clientId={clientId}
      buttonText={"Log out with Google"}
      // @ts-ignore
      onLogoutSuccess={onSuccess}
      onFailure={onFailure}
    />

  );
}

export {GoogleLogoutButton};
