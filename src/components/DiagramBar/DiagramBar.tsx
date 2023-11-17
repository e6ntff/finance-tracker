import React, { useContext } from 'react';

import styles from './DiagramBar.module.scss';
import getSymbol from '../../utils/currency';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';
import DiagramBarPiece from '../DiagramBarPiece/DiagramBarPiece';

const DiagramBar: React.FC<{
  month: string;
  categories: { category: category; value: number }[];
  maxValue: number;
}> = (props) => {
  const { currency } = useContext(CurrencyContext);

  const getValue = (value: number) => {
    const finalValue = (value * 100) / props.maxValue;
    return finalValue <= 100 ? `${finalValue}%` : '100%';
  };

  return (
    <li className={styles.bar}>
      <span className={styles.price}></span>
      <div className={styles.column}>
        {props.categories.map((item: { category: category; value: number }) => (
          <DiagramBarPiece
            key={item.category.id}
            value={item.value}
            color={item.category.color}
            maxValue={props.maxValue}
          />
        ))}
      </div>
      {/* {props.value > 0 ? getSymbol(currency) + props.value : ''} */}
      <span className={styles.month}>{props.month}</span>
    </li>
  );
};

export default DiagramBar;
