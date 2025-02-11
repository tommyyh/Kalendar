import React, { useEffect, useState } from 'react';
import style from './editItem.module.scss';

const EditItem = ({ setItems, items, editCode, setEditCode }) => {
  const today = new Date();
  const item = items.find((item) => item.code === editCode); // Find item -> Add existing values
  const codesArray = items.map((item) => item.code); // For select tag

  const [data, setData] = useState({
    start: '',
    end: '',
    status: 'ongoing',
  });

  // Item change -> Update existing data
  useEffect(() => {
    setData({
      start: item?.start,
      end: item?.end,
      status: item?.status || 'ongoing',
    });
  }, [editCode]);

  // On input change
  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    // Find index of item -> update it in the duplicate array
    const { start, end, status } = data;

    const itemIndex = items.findIndex((item) => item.code === editCode);
    const itemsDupe = [...items];
    const updatedItem = {
      ...itemsDupe[itemIndex],
      start,
      end,
      status,
    };

    // Update and set state
    itemsDupe[itemIndex] = updatedItem;

    setItems(itemsDupe);
    setEditCode(''); // Close form
  };

  // Change edit to a new item
  const selectNewItem = (code) => {
    setEditCode(code);
  };

  // Delete item from list
  const deleteItem = () => {
    const newArray = items.filter((item) => item.code !== editCode);

    setItems(newArray);
    setEditCode('');
  };

  return (
    <form className={editCode ? `${style.form} ${style.formOpen}` : style.form}>
      <div className={style.main}>
        <select
          name='code'
          onChange={(e) => selectNewItem(e.target.value)}
          style={{ width: '5rem' }}
        >
          {codesArray.map((code) => (
            <option value={code} selected={code === editCode} key={code}>
              {code}
            </option>
          ))}
        </select>

        <input
          type='date'
          placeholder='Začátek zakázky'
          name='start'
          onChange={(e) => onChange(e.target.value, 'start')}
          value={data.start}
          min={today.toLocaleDateString('fr-CA')}
          max={data.end}
        />
        <input
          type='date'
          placeholder='Konec zakázky'
          name='end'
          onChange={(e) => onChange(e.target.value, 'end')}
          value={data.end}
          max={'2499-12-31'}
          min={data.start}
        />
        <select
          name='status'
          onChange={(e) => onChange(e.target.value, 'status')}
          value={data.status}
        >
          <option value='ongoing'>❌ Nová</option>
          <option value='unfinished'>🕗 V přípravě</option>
          <option value='finished'>✔️ Hotová</option>
        </select>

        <button
          type='button'
          onClick={submit}
          disabled={!data.start || !data.end}
        >
          Upravit zakázku
        </button>
      </div>

      <button type='button' onClick={deleteItem} id={style.delete}>
        Smazat
      </button>
    </form>
  );
};

export default EditItem;
