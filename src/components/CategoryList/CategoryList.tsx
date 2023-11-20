import React from 'react';

import styles from './CategoryList.module.scss';
import { useSelector } from 'react-redux';
import CategoryItem from '../CategoryItem/CategoryItem';
import { getCategories } from '../../utils/store';
import Preloader from '../Preloader/Preloader';

import { category } from '../../settings/interfaces';

interface Props {
  loading: boolean;
}

const CategoryList: React.FC<Props> = (props) => {
  const categories = useSelector(getCategories);

  return (
    <>
      {props.loading && <Preloader />}
      <ul className={styles.list}>
        {categories.slice(1).map((cat: category) => (
          <CategoryItem
            key={cat.id}
            id={cat.id}
            color={cat.color}
            name={cat.name}
          />
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
