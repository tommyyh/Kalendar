import React, { useContext, useEffect, useState } from 'react';
import style from './editItem.module.scss';
import { deleteCascade } from '../../../utils/items';
import { ItemsContext } from '../../../context/ItemsProvider';
import { EditCodeContext } from '../../../context/EditCodeProvider';
import Input from '../../Input/Input';
import { v4 } from 'uuid';

const EditItem = () => {
  const { editCode, setEditCode } = useContext(EditCodeContext);
  const { code, selectedDate, segmentId } = editCode ?? {};
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
    const segment = item?.segments?.find((segment) => segment.id === segmentId);

    if (segment) {
      setData({
        start: segment.start,
        end: segment.end,
        status: segment.status,
      });

      return;
    }

    setData({
      start: item?.start || selectedDate || '',
      end: item?.end || selectedDate || '',
      status: item?.status || 'ongoing',
    });
  }, [code, selectedDate, segmentId]);

  // On input change
  const onChange = (value, name) => {
    setData({ ...data, [name]: value });
  };

  // Submit form
  const submit = () => {
    const { start, end, status } = data;

    // Find the index of the item
    const itemIndex = items.findIndex((item) => item.code === code);
    if (itemIndex === -1) return; // Safety check

    const itemsDupe = [...items]; // Clone array
    let updatedSegments = [...(itemsDupe[itemIndex].segments || [])];

    if (segmentId) {
      // UPDATE an existing segment
      updatedSegments = updatedSegments.map((segment) =>
        segment.id === segmentId ? { ...segment, start, end, status } : segment
      );
    } else {
      // ADD a new segment
      updatedSegments.push({ id: v4(), start, end, status });
    }

    // Update the item in the array
    itemsDupe[itemIndex] = {
      ...itemsDupe[itemIndex],
      segments: updatedSegments,
    };

    // Get the item's parent
    const parentCode = itemsDupe[itemIndex].parent;

    if (parentCode) {
      // 1️⃣ Find all siblings (same parent)
      const siblings = itemsDupe.filter((item) => item.parent === parentCode);

      // 2️⃣ Sort siblings by the closest `end` date
      siblings.sort((a, b) => {
        const aEnd = new Date(
          a.segments[a.segments.length - 1]?.end || '9999-12-31'
        );
        const bEnd = new Date(
          b.segments[b.segments.length - 1]?.end || '9999-12-31'
        );

        return aEnd - bEnd;
      });

      // 3️⃣ Merge sorted siblings back into the original array
      const otherItems = itemsDupe.filter((item) => item.parent !== parentCode);
      setItems([...otherItems, ...siblings]); // Keep hierarchy intact
    } else {
      // If it's a top-level item, just update the list
      setItems(itemsDupe);
    }

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
