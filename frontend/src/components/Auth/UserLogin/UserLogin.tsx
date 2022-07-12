import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IUser } from '../../../models';
import { useAppDispatch } from '../../../hooks/redux';
import { userLogin } from '../../../store/slices/user.slice';
import { Link } from 'react-router-dom';
import { GoogleAuth } from '../GoogleAuth/GoogleAuth';

const UserLogin:FC = () => {
  const {register, handleSubmit} = useForm<Partial<IUser>>()
  const dispatch = useAppDispatch();

const onSubmitForm = async(data: Partial<IUser>) => {
    await dispatch(userLogin(data));
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className={'login-container'}>
          <div><input type="text" placeholder={'email'}{...register('email')}/></div>
          <div><input type="text" placeholder={'password'}{...register('password')}/></div>
          <div>
            <button>Log In</button>
            <Link to={'/auth/registration'}>
              <button>
                Registration new account
              </button>
            </Link>
          </div>
        </div>
        <a href="#"><h4>Forgot Password?</h4></a>

        <Link to={'/auth/google'}>
          <GoogleAuth/>
        </Link>
      </form>
    </div>
  )
}

export {UserLogin};
