import React, { useContext, useEffect, useState } from 'react';
import style from './editItem.module.scss';
import { deleteCascade } from '../../../utils/items';
import { ItemsContext } from '../../../context/ItemsProvider';
import { EditCodeContext } from '../../../context/EditCodeProvider';

const EditItem = () => {
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { items, setItems } = useContext(ItemsContext);
  const item = items.find((item) => item.code === editCode?.code); // Find item -> Add existing values
  const codesArray = items.map((item) => item.code); // For select tag

  const [data, setData] = useState({
    start: '',
    end: '',
    status: 'ongoing',
  });

  // Item change -> Update existing data
  useEffect(() => {
    setData({
      start: item?.start || '',
      end: item?.end || '',
      status: item?.status || 'ongoing',
    });
  }, [editCode?.code]);

  // On input change
  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    // Find index of item -> update it in the duplicate array
    const { start, end, status } = data;

    const itemIndex = items.findIndex((item) => item.code === editCode?.code);
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
    setEditCode({ code: '', selectedDate: '' }); // Close form
  };

  // Change edit to a new item
  const selectNewItem = (code) => {
    setEditCode({ code, selectedDate: '' }); // --------------
  };

  // Delete from list
  const deleteItem = () => {
    // Delete all
    const newArray = deleteCascade(editCode?.code, items);

    setItems(newArray);
    setEditCode({ code: '', selectedDate: '' });
  };

  return (
    <form
      className={
        editCode?.code ? `${style.form} ${style.formOpen}` : style.form
      }
    >
      <div className={style.main}>
        <select
          name='code'
          onChange={(e) => selectNewItem(e.target.value)}
          style={{ width: '5rem' }}
          value={editCode?.code}
        >
          {codesArray.map((code) => (
            <option value={code} key={code}>
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
          max={data.end}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <input
          type='date'
          placeholder='Konec zakázky'
          name='end'
          onChange={(e) => onChange(e.target.value, 'end')}
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
