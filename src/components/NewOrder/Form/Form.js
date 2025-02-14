import React, { useContext, useState } from 'react';
import style from './form.module.scss';
import { ItemsContext } from '../../../context/ItemsProvider';
import Input from '../../Input/Input';

const Form = ({ formOpen }) => {
  const { items, setItems } = useContext(ItemsContext);
  const [error, setError] = useState('');
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
    const codeUsed = items.find((item) => item.code === data.code);
    const newItem = {
      code: data.code,
      title: data.title,
      parent: data.parent,
      segments: [],
      show: true,
    };

    if (codeUsed) return setError('Kod musí být unikátní.');

    // Normal Item
    if (!data.parent) {
      setItems([...items, newItem]);
      return setData({ code: '', title: '', parent: '' }); // Empty form
    }

    // Item with a parent
    let dupe = [...items];
    const parentIndex = items.findIndex((x) => x.code === data.parent);

    // Insert children right after parent
    dupe.splice(parentIndex + 1, 0, newItem);
    // Ensure all children of the parent have show: true
    dupe = dupe.map((item) =>
      item.parent === data.parent ? { ...item, show: true } : item
    );

    setItems(dupe);
    setData({ code: '', title: '', parent: '' }); // Empty form
  };

  return (
    <>
      <form
        className={formOpen ? `${style.form} ${style.formOpen}` : style.form}
      >
        <Input
          type='text'
          placeholder='Kod zakázky'
          name='code'
          onChange={onChange}
          onFocus={() => setError('')}
          maxLength={8}
          value={data.code}
        />
        <Input
          type='text'
          placeholder='Název zakázky'
          name='title'
          onChange={onChange}
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

      {error && <p style={{ margin: '0.4rem 0 0 0' }}>{error}</p>}
    </>
  );
};

export default Form;
