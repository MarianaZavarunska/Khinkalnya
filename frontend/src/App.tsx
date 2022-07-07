import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout, UserRegistration } from './components';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path={'/auth/registration'} element={<UserRegistration/>}></Route>
        </Route>
     </Routes>
    </div>
  );
}

export default App;
