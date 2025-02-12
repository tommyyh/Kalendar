import React from 'react';
import Item from './Item/Item';

const Items = ({ items, setEditCode, setFormOpen, editCode, setItems }) => {
  return items.map((item) => (
    <Item
      item={item}
      setEditCode={setEditCode}
      setFormOpen={setFormOpen}
      editCode={editCode}
      items={items}
      setItems={setItems}
      key={item.code}
    />
  ));
};

export default Items;
