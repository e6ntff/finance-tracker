import React, { useCallback, useContext, useState } from 'react';

import styles from './AddCategory.module.scss';
import { LanguageContext } from '../LanguageContext/LanguageContext';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../utils/store';

const AddCategory: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  const [currentCategory, setCurrentCategory] = useState<category>({
    id: Math.random(),
    color: '#cccccc',
    name: languages.newCat[language],
  });

  const dispatch = useDispatch();

  const handleAddCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setCurrentCategory((prevCat: category) => ({
      ...prevCat,
      id: Math.random(),
      [name]: value,
    }));
  };

  const clearCurrentCategory = useCallback(() => {
    setCurrentCategory({
      id: Math.random(),
      color: '#cccccc',
      name: languages.newCat[language],
    });
  }, [languages, language]);

  const AddCategory = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      dispatch(addCategory({ category: currentCategory }));

      clearCurrentCategory();
    },
    [currentCategory, dispatch, clearCurrentCategory]
  );

  return (
    <form className={styles.form} onSubmit={AddCategory}>
      <label className={styles.label}>{languages.addCat[language]}</label>
      <div className={styles.inputs}>
        <input
          type="color"
          name="color"
          value={currentCategory.color}
          className={styles.color}
          onInput={handleAddCategoryChange}
        />
        <input
          type="text"
          name="name"
          className={styles.name}
          value={currentCategory.name}
          onChange={handleAddCategoryChange}
        />
        <button type="submit" className={styles.button}>
          {languages.submitCat[language]}
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
