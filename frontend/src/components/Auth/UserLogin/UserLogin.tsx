import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { IUser } from '../../../models';
import { useAppDispatch } from '../../../hooks/redux';
import { setLoginActive, setRegisterActive, userLogin } from '../../../store/slices';
import { Link } from 'react-router-dom';
import { GoogleAuth } from '../GoogleAuth/GoogleAuth';
import './UserLogin.css';

const UserLogin:FC = () => {
  const {register, handleSubmit, reset} = useForm<Partial<IUser>>()
  const dispatch = useAppDispatch();

const onSubmitForm = async(data: Partial<IUser>) => {
    dispatch(setLoginActive());
    await dispatch(userLogin(data));
    reset();
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitForm)} className="logIn-form">
          <div className={'logIn-content'}>
            <label>Email</label>
            <input type="text"{...register('email')}/>
          </div>

          <div className={'logIn-content'}>
            <label>Password</label>
            <input type="text" {...register('password')}/>
          </div>

          <div className="btn-container">
            <button>Log In</button>
            <Link to={'/auth/google'}>
              <GoogleAuth/>
            </Link>
            <a><h4>Forgot Password?</h4></a>

            <button onClick={() => {dispatch(setRegisterActive())}}>
                Sign Up
            </button>
          </div>
      </form>
    </div>
  )
}

export {UserLogin};
