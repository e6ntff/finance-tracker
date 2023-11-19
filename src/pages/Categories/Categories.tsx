import React from 'react';

import CategoryList from '../../components/CategoryList/CategoryList';

import styles from './Categories.module.scss';
import AddCategory from '../../components/AddCategory/AddCategory';

const Categories: React.FC = () => {
  return (
    <div className={styles.categories}>
      <AddCategory />
      <CategoryList />
    </div>
  );
};

export default Categories;
