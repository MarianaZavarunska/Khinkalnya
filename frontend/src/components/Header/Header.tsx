import { FC } from 'react';

import './Header.css'
import { setLoginActive, setModalActive, userLogout } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ModalWindow } from '../ModalWindow/ModalWindow';
import { UserLogin, UserRegistration } from '../Auth';

const HeaderComponent:FC = () => {
  const dispatch = useAppDispatch();
  const {user, isLoginActive, isRegisterActive, accessToken} = useAppSelector((state) => state.userReducer)

  const request = {...user, accessToken};

  return (
    <div>
      <div className={'header_menu'}>
        <div>
          <a href="/"> <img src="/image-for-header/logoKhinkalnya.jpg" width={'150px'} alt="logo"/></a>
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/discount.svg" width={'50px'} height={'40px'} alt="discount"/>
          Акції
        </div>
        <div className={'item_header_menu'}><a href="/dish/khinkali">
          <img src="/image-for-header/khinkali.svg" width={'50px'} height={'40px'} alt="khinkali_menu"/>
          Хінкалі
        </a>
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/khachapuri.svg" width={'50px'} height={'40px'} alt="khachapuri_menu"/>
          Хачапурі
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/main_dish.svg" width={'50px'} height={'40px'} alt="main_dish_menu"/>
          Гарячі Закуски
        </div>
        <div className={'item_header_menu'}><a href="#">
          <img src="/image-for-header/first_dish.svg" width={'50px'} height={'40px'} alt="first_dish_menu"/>
          Перші Страви
        </a>
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/salad.svg" width={'50px'} height={'40px'} alt="first_dish_menu"/>
          Салати
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/cold_dish.svg" width={'50px'} height={'40px'} alt="cold_dish_menu"/>
          Холодні Закуски
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/cake.svg" width={'50px'} height={'40px'} alt="sweet_menu"/>
          Десерти
        </div>
        <div className={'item_header_menu'}>
          <img src="/image-for-header/information.svg" width={'50px'} height={'40px'} alt="information_menu"/>
          Інформація
        </div>
        <div>
          <img src="/image-for-header/cart.png" width={'80px'} height={'50px'} alt="cart"/>
        </div>
          <div>
            {user && <div>{user.name}</div>}
           <button  onClick={() => {
              dispatch(setLoginActive());

              if(accessToken && request) dispatch(userLogout(request))
            }}>
             {!accessToken ? "Log In" : "Log out"}
           </button>
          </div>

        </div>
      <ModalWindow>
        {isLoginActive ? <UserLogin/> : isRegisterActive ? <UserRegistration/> : null}
      </ModalWindow>
    </div>

  )
}

export {HeaderComponent}
