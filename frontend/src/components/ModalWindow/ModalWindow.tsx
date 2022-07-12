import { FC } from "react";
import * as React from "react";

import "./ModalWindow.css";
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setModalActive } from '../../store/slices';

type Props = {
  children?: React.ReactNode
};

const ModalWindow: FC<Props>= ( {children}) => {
  const dispatch = useAppDispatch();
  const { isModalActive } = useAppSelector((state) => state.userReducer);

  return (
    <div
      className={isModalActive ? "modal active" : "modal"}
      onClick={() => {
        dispatch(setModalActive());
      }}
    >
      <div
        className={isModalActive ? "modal-content active" : "modal-content"}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export { ModalWindow };
