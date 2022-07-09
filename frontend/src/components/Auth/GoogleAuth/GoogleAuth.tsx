import React, { FC, useEffect } from 'react';
import {gapi} from 'gapi-script';

import { GoogleLoginButton } from '../GoogleLogin/GoogleLogin';
import { GoogleLogoutButton } from '../GoogleLogout/GoogleLogout';


const GoogleAuth:FC = () => {
  const clientId = "270077238897-4kqpjvteon9l6fd4edrhr9qom640cog0.apps.googleusercontent.com";
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
      <GoogleLogoutButton/>
    </div>
  );
};

export {GoogleAuth} ;
