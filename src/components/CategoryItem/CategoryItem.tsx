import React, { useCallback, useEffect, useState } from 'react';

import styles from './CategoryItem.module.scss';
import { useDispatch } from 'react-redux';
import {
  clearListFromCategory,
  refreshItemByCategory,
  removeCategory,
  replaceCategory,
} from '../../utils/store';

import { category } from '../../settings/interfaces';
import useDebounce from '../../hooks/useDebounce';

type Props = category;

const CategoryItem: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const { id, color, name } = props;

  const [currentCategory, setCurrentCategory] = useState<category>({
    id: id,
    color: color,
    name: name,
  });

  const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setCurrentCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const debouncedCategory = useDebounce(currentCategory);

  useEffect(() => {
    dispatch(replaceCategory({ category: debouncedCategory }));
    dispatch(refreshItemByCategory({ category: debouncedCategory }));
  }, [dispatch, debouncedCategory]);

  const deleteCategory = useCallback(() => {
    dispatch(removeCategory({ category: currentCategory }));
    dispatch(clearListFromCategory({ category: currentCategory }));
  }, [currentCategory, dispatch]);

  return (
    <li className={styles.item}>
      <input
        name="color"
        type="color"
        value={currentCategory.color}
        className={styles.color}
        onChange={handleItemChange}
      />
      <input
        name="name"
        type="text"
        value={currentCategory.name}
        className={styles.name}
        onChange={handleItemChange}
      />
      <button className={styles.button} onClick={deleteCategory}>
        🗑
      </button>
    </li>
  );
};

export default CategoryItem;
