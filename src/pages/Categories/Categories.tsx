import React from 'react';
import { useSelector } from 'react-redux';

import CategoryList from '../../components/CategoryList/CategoryList';

import styles from './Categories.module.scss';
import AddCategory from '../../components/AddCategory/AddCategory';

const Categories: React.FC = () => {
  const categories = useSelector((state: GlobalState) => state.categories);

  return (
    <div className={styles.categories}>
      <AddCategory />
      <CategoryList />
    </div>
  );
};

export default Categories;
