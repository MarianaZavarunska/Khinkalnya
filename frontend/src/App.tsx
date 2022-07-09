import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import {  Layout, UserLogin, UserRegistration } from './components';
import {Home} from './components/Home/Home';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path={'/auth/registration'} element={<UserRegistration/>}></Route>
          <Route path={'/auth/login'} element={<UserLogin/>}></Route>
          <Route path={'/auth/google'} element={<Home/>}></Route>

        </Route>
     </Routes>
    </div>
  );
}

export default App;
