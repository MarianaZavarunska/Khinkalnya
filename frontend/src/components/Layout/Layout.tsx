import React, {FC} from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderComponent } from '../Header/Header';
import { FooterComponent } from '../Footer/Footer';

const Layout:FC = () => {
  return (
    <div>
      <HeaderComponent/>
      <Outlet/>
      <FooterComponent/>
    </div>
  );
}

export {Layout};
