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
    // ----------------------
    if (!data.parent) {
      setItems([
        ...items,
        { code: data.code, title: data.title, parent: data.parent, show: true },
      ]);
      // Empty form
      setData({ code: '', title: '', parent: '' });

      return;
    }

    let dupe = [...items];
    const parentIndex = items.findIndex((x) => x.code === data.parent);

    // Insert children right after parent
    dupe.splice(parentIndex + 1, 0, {
      code: data.code,
      title: data.title,
      parent: data.parent,
      show: true,
    });

    // Ensure all children of the parent have show: true
    dupe = dupe.map((item) =>
      item.parent === data.parent ? { ...item, show: true } : item
    );

    setItems(dupe);

    // Empty form
    setData({ code: '', title: '', parent: '' });

    setItems(dupe);

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
      <select
        name='parent'
        onChange={(e) => onChange(e.target.value, 'parent')}
        value={data.parent}
      >
        <option defaultValue value={items[0]}>
          Kod nadřazené zakázky
        </option>

        {items.map((item) => (
          <option value={item.code} key={item.code}>
            {item.code}
          </option>
        ))}
      </select>

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
