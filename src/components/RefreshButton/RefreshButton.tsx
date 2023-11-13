import React, { useContext } from 'react';
import { LanguageContext } from '../LanguageContext/LanguageContext';

import styles from './RefreshButton.module.scss';

import getList from '../../api/getList';
import { calculatePrices } from '../../api/getExchangeRates';
import {
  CurrencyContext,
  CurrencyContextProps,
} from '../CurrencyContext/CurrencyContext';

const RefreshButton: React.FC<any> = (props) => {
  const { language, languages } = useContext(LanguageContext);

  const { currencyRates } = useContext<CurrencyContextProps>(CurrencyContext);

  const refresh = () => {
    getList().then((data) => {
      if (data !== undefined) {
        props.setList(
          data.map((item: ExpenseItem) => ({
            ...item,
            price: calculatePrices(item.price, currencyRates),
          }))
        );
      } else {
        console.error('Data is undefined. Unable to refresh.');
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
