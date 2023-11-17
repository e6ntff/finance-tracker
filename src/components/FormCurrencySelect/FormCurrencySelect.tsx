import React from 'react';

import styles from './FormCurrencySelect.module.scss';

interface Props {
  currency: string;
  setCurrency: any;
}

const FormCurrencySelect: React.FC<Props> = (props) => {
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
