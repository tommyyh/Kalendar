import React from 'react';
import style from './newOrder.module.scss';
import Form from './Form/Form';

const NewOrder = ({
  formOpen,
  setFormOpen,
  date,
  setItems,
  items,
  editCode,
  setEditCode,
}) => {
  // Button on click
  const onClick = () => {
    if (editCode) return setEditCode('');

    setFormOpen(!formOpen);
  };

  return (
    <>
      <button
        className={
          formOpen || editCode
            ? `${style.button} ${style.buttonOpen}`
            : style.button
        }
        onClick={onClick}
      >
        {formOpen || editCode ? 'Zavřít' : 'Vložit zakázku'}
      </button>

      <Form formOpen={formOpen} setItems={setItems} items={items} />
    </>
  );
};

export default NewOrder;
