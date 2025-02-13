import React, { useContext } from 'react';
import Item from './Item/Item';
import { ItemsContext } from '../../../context/ItemsProvider';

const Items = () => {
  const { items, setItems } = useContext(ItemsContext);

  return items.map((item) => (
    <Item item={item} items={items} setItems={setItems} key={item.code} />
  ));
};

export default Items;
