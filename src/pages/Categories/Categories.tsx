import React from 'react';

import CategoryList from '../../components/CategoryList/CategoryList';

import styles from './Categories.module.scss';
import AddCategory from '../../components/AddCategory/AddCategory';

interface Props {
  loading: boolean;
}

const Categories: React.FC<Props> = (props) => {
  return (
    <div className="app">
      <div className={styles.categories}>
        <AddCategory />
        <CategoryList loading={props.loading} />
      </div>
    </div>
  );
};

export default Categories;
