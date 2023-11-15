import React from 'react';

import styles from './CategoryList.module.scss';
import { useSelector } from 'react-redux';
import CategoryItem from '../CategoryItem/CategoryItem';

const CategoryList: React.FC = () => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <ul className={styles.list}>
      {categories.map((cat: category) => (
        <CategoryItem key={cat.id} id={cat.id} color={cat.color} name={cat.name} />
      ))}
    </ul>
  );
};

export default CategoryList;
