import React, { useContext } from 'react';
import style from './newOrder.module.scss';
import Form from './Form/Form';
import { EditCodeContext } from '../../context/EditCodeProvider';
import { FormOpenContext } from '../../context/FormOpenProvider';

const NewOrder = () => {
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { formOpen, setFormOpen } = useContext(FormOpenContext);

  // Button on click
  const onClick = () => {
    if (editCode?.code) return setEditCode({ code: '', selectedDate: '' });

    setFormOpen(!formOpen);
  };

  return (
    <>
      <button
        className={
          formOpen || editCode?.code
            ? `${style.button} ${style.buttonOpen}`
            : style.button
        }
        onClick={onClick}
      >
        {formOpen || editCode?.code ? 'Zavřít' : 'Vložit zakázku'}
      </button>

      <Form formOpen={formOpen} />
    </>
  );
};

export default NewOrder;
