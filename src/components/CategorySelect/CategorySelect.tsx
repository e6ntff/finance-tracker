import React from 'react';

import styles from './CategorySelect.module.scss';
import { useSelector } from 'react-redux';
import CategorySelectItem from '../CategorySelectItem/CategorySelectItem';

const CategorySelect: React.FC = () => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <select className={styles.select}>
      {categories.map((cat: category) => (
        <CategorySelectItem
          key={cat.id}
          id={cat.id}
          color={cat.color}
          name={cat.name}
        />
      ))}
    </select>
  );
};

export default CategorySelect;
