import React, { useEffect, useContext } from 'react';

import styles from './CurrencySelect.module.scss';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';

const CurrencySelect:React.FC = () => {
  useEffect(() => {
    const localCurrency = localStorage.getItem('curr');
    if (localCurrency !== null) setCurrency(localCurrency);
  }, []);

  const { currency, setCurrency } = useContext(CurrencyContext);

  const handleCurrencyChange = (event: any) => {
    setCurrency(event.target.value);
    localStorage.setItem('curr', event.target.value);
  };

  return (
    <select
      className={styles.select}
      value={currency}
      onChange={handleCurrencyChange}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="RUB">RUB</option>
    </select>
  );
};

export default CurrencySelect;
