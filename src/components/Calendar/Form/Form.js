import React, { useState } from 'react';
import style from './form.module.scss';

const Form = ({ formOpen, setItems, items }) => {
  const [data, setData] = useState({
    code: '',
    title: '',
    parent: '',
  });

  // On input change
  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    setItems([
      ...items,
      { code: data.code, title: data.title, parent: data.parent },
    ]);

    // Empty form
    setData({ code: '', title: '', parent: '' });
  };

  return (
    <form className={formOpen ? `${style.form} ${style.formOpen}` : style.form}>
      <input
        type='text'
        placeholder='Kod zakázky'
        name='code'
        onChange={(e) => onChange(e.target.value, 'code')}
        value={data.code}
      />
      <input
        type='text'
        placeholder='Název zakázky'
        name='title'
        onChange={(e) => onChange(e.target.value, 'title')}
        value={data.title}
      />
      <input
        type='text'
        placeholder='Kod nadřazené zakázky'
        name='parent'
        onChange={(e) => onChange(e.target.value, 'parent')}
        value={data.parent}
      />

      <button
        type='button'
        onClick={submit}
        disabled={!data.code || !data.title}
      >
        Přidat zakázku
      </button>
    </form>
  );
};

export default Form;
