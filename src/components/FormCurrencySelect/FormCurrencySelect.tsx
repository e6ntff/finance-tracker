import React from 'react';

import styles from './FormCurrencySelect.module.scss';

const FormCurrencySelect: React.FC<any> = (props) => {
  const handleCurrencyChange = (event: any) => {
    props.setCurrency(event.target.value);
  };

  return (
    <select
      className={styles.select}
      value={props.currency}
      onChange={handleCurrencyChange}
    >
      <option value="USD">$</option>
      <option value="EUR">€</option>
      <option value="RUB">₽</option>
    </select>
  );
};

export default FormCurrencySelect;
