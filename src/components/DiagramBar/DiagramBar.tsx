import React, { useContext } from 'react';

import styles from './DiagramBar.module.scss';
import getSymbol from '../../utils/currency';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';
import DiagramBarPiece from '../DiagramBarPiece/DiagramBarPiece';

const DiagramBar: React.FC<{
  month: string;
  categories: { category: category; value: number }[];
  maxValue: number;
  valueByMonths: number;
}> = (props) => {
  const { currency } = useContext(CurrencyContext);

  return (
    <li className={styles.bar}>
      <span className={styles.price}>
        {props.valueByMonths > 0
          ? getSymbol(currency) + props.valueByMonths
          : ''}
      </span>
      <div className={styles.column}>
        {props.categories.map((item: { category: category; value: number }) => (
          <DiagramBarPiece
            key={item.category.id}
            name={item.category.name}
            value={item.value}
            color={item.category.color}
            maxValue={props.maxValue}
          />
        ))}
      </div>
      <span className={styles.month}>{props.month}</span>
    </li>
  );
};

export default DiagramBar;
