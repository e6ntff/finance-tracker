import React, { useState, useEffect, useContext } from 'react';
import styles from './ListItem.module.scss';

import { calculatePrices } from '../../utils/getExchangeRates';

import getTodayDate from '../../utils/date';

import { CurrencyContext } from '../CurrencyContext/CurrencyContext';
import getSymbol from '../../utils/currency';
import { useDispatch } from 'react-redux';

const ListItem: React.FC<ExpenseItem> = (props) => {
  const dispatch = useDispatch();

  const { currencyRates } = useContext(CurrencyContext);

  const { id, date, title, price } = props;

  const [item, setItem] = useState<ExpenseItem>({
    id: id,
    date: date,
    title: title,
    price: price,
  });

  const deleteItem = () => {
    dispatch({ type: 'REMOVE', itemToRemove: item });
  };

  const handleItemChange = (event: any) => {
    let { name, value }: { name: string; value: string } = event.target;

    if (name === 'price') {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: {
          ...prevItem.price,
          [currency]: Number(value),
        },
      }));
      setItem((prevItem: any) => ({
        ...prevItem,
        price: calculatePrices(prevItem.price, currencyRates, currency),
      }));
    } else {
      setItem((prevItem) => ({
        ...prevItem,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    dispatch({ type: 'REPLACE', itemToChange: item });
  }, [item, dispatch]);

  const { currency } = useContext(CurrencyContext);

  return (
    <li className={styles.item}>
      <input
        type="date"
        name="date"
        className={styles.date}
        value={item.date}
        min="2020-01-01"
        max={getTodayDate(new Date())}
        onChange={handleItemChange}
      />
      <input
        type="text"
        name="title"
        className={styles.title}
        value={item.title}
        onChange={handleItemChange}
      />
      <div className={styles.other}>
        <span className={styles.symbol}>{getSymbol(currency)}</span>
        <input
          type="number"
          name="price"
          min="1"
          step="1"
          className={styles.price}
          value={item.price[currency]}
          onChange={handleItemChange}
        />
        <button className={styles.button} onClick={() => deleteItem()}>
          🗑
        </button>
      </div>
    </li>
  );
};

export default ListItem;
