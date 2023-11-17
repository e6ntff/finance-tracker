import React, { useCallback, useEffect, useState } from 'react';

import styles from './CategoryItem.module.scss';
import { useDispatch } from 'react-redux';

const CategoryItem: React.FC<category> = (props) => {
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

  useEffect(() => {
    dispatch({ type: 'REPLACE_CAT', category: currentCategory });
  }, [currentCategory, dispatch]);

  const deleteCategory = useCallback(() => {
    dispatch({ type: 'REMOVE_CAT', category: currentCategory });
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
