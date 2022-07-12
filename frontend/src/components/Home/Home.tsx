import React, { FC } from 'react';

import { GoogleAuth } from '../Auth/GoogleAuth/GoogleAuth';

const Home: FC = () => {
  return (
    <div>
      Home
      <GoogleAuth/>
    </div>
  );
};

export {Home};
