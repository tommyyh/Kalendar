import React, { useContext, useEffect, useState } from 'react';
import style from './editItem.module.scss';
import { deleteCascade } from '../../../utils/items';
import { ItemsContext } from '../../../context/ItemsProvider';
import { EditCodeContext } from '../../../context/EditCodeProvider';
import Input from '../../Input/Input';
import { v4 } from 'uuid';

const EditItem = () => {
  const [data, setData] = useState({
    start: '',
    end: '',
    status: 'ongoing',
  });
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { code, selectedDate, segmentId } = editCode ?? {};
  const { items, setItems } = useContext(ItemsContext);
  const item = items.find((item) => item.code === code);
  const codesArray = items.map((item) => item.code);

  useEffect(() => {
    const segment = item?.segments?.find((segment) => segment.id === segmentId);

    // If user clicked on segment -> Edit instead of new
    if (segment) {
      setData({
        start: segment.start,
        end: segment.end,
        status: segment.status,
      });
      return;
    }

    // New segment
    setData({
      start: item?.start || selectedDate || '',
      end: item?.end || selectedDate || '',
      status: item?.status || 'ongoing',
    });
  }, [code, selectedDate, segmentId]);

  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    const { start, end, status } = data;
    const itemIndex = items.findIndex((item) => item.code === code);

    if (itemIndex === -1) return; // Make sure item exists

    const itemsDupe = [...items]; // Clone array
    let updatedSegments = [...(itemsDupe[itemIndex].segments || [])];

    // Update segment / New
    if (segmentId) {
      updatedSegments = updatedSegments.map((segment) =>
        segment.id === segmentId ? { ...segment, start, end, status } : segment
      );
    } else {
      updatedSegments.push({ id: v4(), start, end, status });
    }

    // Insert into array
    itemsDupe[itemIndex] = {
      ...itemsDupe[itemIndex],
      segments: updatedSegments,
    };

    setItems(itemsDupe);
    setEditCode({ code: '', selectedDate: '' });
  };

  // Select new item with Code
  const selectNewItem = (code) => {
    const today = new Date().toISOString().split('T')[0];

    setEditCode({ code, selectedDate: today });
  };

  // Delete item
  const deleteItem = () => {
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
