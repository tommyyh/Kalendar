import React, { useContext, useEffect, useState } from 'react';
import style from './editItem.module.scss';
import { deleteCascade } from '../../../utils/items';
import { ItemsContext } from '../../../context/ItemsProvider';
import { EditCodeContext } from '../../../context/EditCodeProvider';
import Input from '../../Input/Input';
import { v4 } from 'uuid';

const EditItem = () => {
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { code, selectedDate } = editCode ?? {};
  const { items, setItems } = useContext(ItemsContext);
  const item = items.find((item) => item.code === code); // Find item -> Add existing values
  const codesArray = items.map((item) => item.code); // For select tag

  const [data, setData] = useState({
    start: '',
    end: '',
    status: 'ongoing',
  });

  // Item change -> Update existing data
  useEffect(() => {
    setData({
      start: item?.start || selectedDate || '',
      end: item?.end || selectedDate || '',
      status: item?.status || 'ongoing',
    });
  }, [code, selectedDate]);

  // On input change
  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    // Find index of item -> update it in the duplicate array
    const { start, end, status } = data;

    const itemIndex = items.findIndex((item) => item.code === code);
    const itemsDupe = [...items];
    const updatedItem = {
      ...itemsDupe[itemIndex],
      segments: [...item?.segments, { id: v4(), start, end, status }],
    };

    // Update and set state
    itemsDupe[itemIndex] = updatedItem;

    setItems(itemsDupe);
    setEditCode({ code: '', selectedDate: '' }); // Close form
  };

  // Change edit to a new item
  const selectNewItem = (code) => {
    setEditCode({ code, selectedDate: '' }); // --------------
  };

  // Delete from list
  const deleteItem = () => {
    // Delete all
    const newArray = deleteCascade(code, items);

    setItems(newArray);
    setEditCode({ code: '', selectedDate: '' });
  };

  return (
    <form className={code ? `${style.form} ${style.formOpen}` : style.form}>
      <div className={style.main}>
        <select
          name='code'
          onChange={(e) => selectNewItem(e.target.value)}
          style={{ width: '5rem' }}
          value={code}
        >
          {codesArray.map((code) => (
            <option value={code} key={code}>
              {code}
            </option>
          ))}
        </select>

        <Input
          type='date'
          placeholder='Začátek zakázky'
          name='start'
          onChange={onChange}
          value={data.start}
          max={data.end}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <Input
          type='date'
          placeholder='Konec zakázky'
          name='end'
          onChange={onChange}
          value={data.end}
          max={'2499-12-31'}
          min={data.start}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <select
          name='status'
          onChange={(e) => onChange(e.target.value, 'status')}
          value={data.status}
        >
          <option value='ongoing'>🕗 Nová</option>
          <option value='unfinished'>🛠️ V přípravě</option>
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
