import React, { useState } from 'react';
import style from './newOrder.module.scss';
import Form from './Form/Form';

const NewOrder = ({ setItems, items }) => {
  const [formOpen, setFormOpen] = useState(false);

  // Button on click
  const onClick = () => {
    setFormOpen(!formOpen);
  };

  return (
    <>
      <button
        className={
          formOpen ? `${style.button} ${style.buttonOpen}` : style.button
        }
        onClick={onClick}
      >
        {formOpen ? 'Zavřít' : 'Vložit zakázku'}
      </button>

      <Form formOpen={formOpen} setItems={setItems} items={items} />
    </>
  );
};

export default NewOrder;
