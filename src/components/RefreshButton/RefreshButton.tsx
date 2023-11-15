import React, { useContext } from 'react';
import { LanguageContext } from '../LanguageContext/LanguageContext';

import styles from './RefreshButton.module.scss';

import getList from '../../utils/getList';
import { useDispatch } from 'react-redux';
import { calculatePrices, getExchangeRates } from '../../utils/getExchangeRates';

const RefreshButton: React.FC = () => {
  const { language, languages } = useContext(LanguageContext);

  const dispatch = useDispatch();

  const refresh = async () => {
    Promise.all([getExchangeRates(), getList()]).then((data) => {
      const rates = data[0] ? data[0].rates : { EUR: 0, RUB: 0 };
      const newList = data[1];
      if (newList !== undefined) {
        newList.forEach((item) => {
          item.price = calculatePrices(item.price, rates, 'USD');
        });
        dispatch({type: "SET", newList: newList})
      }
    });
  };

  return (
    <button className={styles.button} onClick={refresh}>
      {languages.fetch[language]}
    </button>
  );
};

export default RefreshButton;
