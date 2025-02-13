import React from 'react';
import Calendar from './components/Calendar/Calendar';
import NewOrder from './components/NewOrder/NewOrder';
import './global.scss';
import EditItem from './components/Calendar/EditItem/EditItem';

export const App = () => {
  return (
    <>
      <NewOrder />
      <EditItem />

      <Calendar />
    </>
  );
};
