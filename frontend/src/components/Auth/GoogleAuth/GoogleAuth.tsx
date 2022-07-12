import React, { FC, useEffect } from 'react';
import {gapi} from 'gapi-script';

import { GoogleLoginButton } from '../GoogleLogin/GoogleLogin';

const GoogleAuth:FC = () => {
  const clientId = process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID;
  useEffect( () => {
    function start() {
      gapi.auth2.getAuthInstance({
        clientId: clientId,
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        idpId: "google",
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/translate/v2/rest'],
        ux_mode: 'popup',
      })
    }
    gapi.load("client:Web client 2", start)
  })

  return (
    <div>
       <GoogleLoginButton/>
    </div>
  );
};

export {GoogleAuth} ;
