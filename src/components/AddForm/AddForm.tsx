import React, { useState, useContext } from 'react';

import styles from './AddForm.module.scss';

import { LanguageContext } from '../LanguageContext/LanguageContext';

import getTodayDate from '../../utils/date';
import calculatePrices from '../../utils/calculatePrices';
import FormCurrencySelect from '../FormCurrencySelect/FormCurrencySelect';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';
import { useDispatch, useSelector } from 'react-redux';
import FormCategorySelect from '../FormCategorySelect/FormCategorySelect';
import { addItem, getCategories } from '../../utils/store';
import { ExpenseItem, category } from '../../settings/interfaces';

const AddForm: React.FC = () => {
  const dispatch = useDispatch();

  const categories = useSelector(getCategories);

  const { currencyRates } = useContext(CurrencyContext);

  const [currency, setCurrency] = useState('USD');

  const [newItem, setNewItem] = useState<ExpenseItem>({
    id: Math.random(),
    title: '',
    date: getTodayDate(new Date()),
    category: categories[0],
    price: {
      USD: 0,
      EUR: 0,
      RUB: 0,
    },
  });

  const clearItem = () => {
    setNewItem({
      id: Math.random(),
      title: '',
      date: getTodayDate(new Date()),
      category: categories[0],
      price: {
        USD: 0,
        EUR: 0,
        RUB: 0,
      },
    });
  };

  const addNewItem = (event: any) => {
    event.preventDefault();

    dispatch(addItem({ item: newItem }));

    clearItem();
  };

  const handleFormChange = (event: any) => {
    const { name, value }: { name: string; value: string | number } =
      event.target;

    if (name === 'price') {
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: {
          ...prevItem.price,
          [currency]: Number(value),
        },
      }));
      setNewItem((prevItem: any) => ({
        ...prevItem,
        price: calculatePrices(prevItem.price, currencyRates, currency),
      }));
    } else if (name === 'category') {
      const foundCategory = categories.find(
        (cat: category) => cat.id === Number(value)
      ) || {
        id: 228,
        color: '#00000000',
        name: '!!!ERROR!!!',
      };

      setNewItem((prevItem: ExpenseItem) => ({
        ...prevItem,
        [name]: foundCategory,
      }));
    } else {
      setNewItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  const [formAndButtonDisplay, setFormAndButtonDisplay] = useState({
    button: 'block',
    form: 'none',
  });

  const toggleFormDisplay = (isVisible: boolean) => {
    setFormAndButtonDisplay(
      isVisible
        ? { button: 'none', form: 'flex' }
        : { button: 'flex', form: 'none' }
    );
  };

  const { language, languages } = useContext(LanguageContext);

  return (
    <>
      <button
        className={`${styles.button} ${styles.setButton}`}
        onClick={() => toggleFormDisplay(true)}
        style={{ display: formAndButtonDisplay.button }}
      >
        {languages.addExpense[language]}
      </button>
      <form
        className={styles.form}
        onSubmit={addNewItem}
        style={{ display: formAndButtonDisplay.form }}
      >
        <label className={styles.label} htmlFor="title">
          {languages.title[language]}
        </label>
        <input
          required
          className={styles.input}
          type="text"
          name="title"
          id="title"
          value={newItem.title}
          onChange={handleFormChange}
        />
        <label className={styles.label} htmlFor="price">
          {languages.price[language]}
        </label>
        <div className={styles.container}>
          <FormCurrencySelect currency={currency} setCurrency={setCurrency} />
          <input
            required
            className={styles.input}
            type="number"
            min="1"
            step="1"
            name="price"
            id="price"
            value={newItem.price[currency as keyof typeof newItem.price] || ''}
            onChange={handleFormChange}
          />
        </div>
        <label className={styles.label} htmlFor="date">
          {languages.dateAndCat[language]}
        </label>
        <div className={styles.container}>
          <FormCategorySelect
            handleFormChange={handleFormChange}
            value={newItem.category}
          />
          <input
            required
            className={styles.input}
            type="date"
            name="date"
            id="date"
            min="2020-01-01"
            max={getTodayDate(new Date())}
            value={newItem.date}
            onChange={handleFormChange}
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="submit"
            className={styles.button}
            onClick={() => toggleFormDisplay(false)}
          >
            {languages.add[language]}
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => {
              toggleFormDisplay(false);
              clearItem();
            }}
          >
            {languages.cancel[language]}
          </button>
        </div>
      </form>
    </>
  );
};

export default AddForm;
