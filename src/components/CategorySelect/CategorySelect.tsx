import React from 'react';

import styles from './CategorySelect.module.scss';
import { useSelector } from 'react-redux';

interface Props {
  id: number;
  handleItemChange: any;
}

const CategorySelect: React.FC<Props> = (props) => {
  const categories = useSelector((state: GlobalState) => state.categories);

  const FoundCategory = categories.find((cat: category) => cat.id === props.id);

  return (
    <select
      className={styles.select}
      name="category"
      value={props.id}
      onChange={props.handleItemChange}
      style={
        {
          '--color': FoundCategory ? FoundCategory.color : '#0000',
        } as React.CSSProperties
      }
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
