import React from 'react';

import styles from './CategorySelect.module.scss';
import { useSelector } from 'react-redux';

const CategorySelect: React.FC<any> = (props) => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <select
      className={styles.select}
      name="category"
      value={props.value}
      onChange={props.handleItemChange}
    >
      {categories.map((cat: category) => (
        <option
          key={cat.id}
          value={cat.id}
          style={{ '--color': cat.color } as React.CSSProperties}
          className={styles.option}
        >
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
