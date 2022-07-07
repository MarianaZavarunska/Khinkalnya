import { FC } from 'react';
import {useForm} from 'react-hook-form';

import { useAppDispatch } from '../../../hooks/redux';
import { userRegistration } from '../../../store/slices/user.slice';
import { IUser } from '../../../models/user.interface';


const UserRegistration:FC = () => {
const {register, handleSubmit} = useForm<IUser>();

const dispatch = useAppDispatch();

const onSubmitForm = async (data: IUser) => {
const res = await dispatch(userRegistration(data));
console.log(res);
}
  return(
   <div>
     <form onSubmit={handleSubmit(onSubmitForm)}>
       <div className={'register-container'}>
         <div><input type="text" placeholder={'name'}{...register('name')}/></div>
         <div><input type="text" placeholder={'email'}{...register('email')}/></div>
         <div><input type="number" placeholder={'age'}{...register('age')}/></div>
         <div><input type="text" placeholder={'city'}{...register('city')}/></div>
         <div><input type="text" placeholder={'password'}{...register('password')}/></div>
         <div>
           <button>Sign Up</button>
         </div>
       </div>
     </form>
   </div>
  )
}

export {UserRegistration};
