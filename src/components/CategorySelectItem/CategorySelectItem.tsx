import React from 'react';

import styles from './CategorySelectItem.module.scss';
import { useSelector } from 'react-redux';

const CategorySelectItem: React.FC<category> = (props) => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <option
      key={props.id}
      style={{ '--color': props.color } as React.CSSProperties}
      className={styles.option}
    >
      {props.name}
    </option>
  );
};

export default CategorySelectItem;
