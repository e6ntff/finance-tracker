import React from 'react';

import styles from './FormCategorySelect.module.scss';
import { useSelector } from 'react-redux';

interface Props {
  value: category;
  handleFormChange: any;
}

const FormCategorySelect: React.FC<Props> = (props) => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <select
      className={styles.select}
      name="category"
      value={props.value.id}
      onChange={props.handleFormChange}
      style={{ '--color': props.value.color } as React.CSSProperties}
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

export default FormCategorySelect;
