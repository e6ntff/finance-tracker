import React, { useCallback, useContext } from 'react';

import styles from './DiagramBarPiece.module.scss';
import getSymbol from '../../utils/currency';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';

const DiagramBarPiece: React.FC<{
  value: number;
  color: string;
  name: string;
  maxValue: number;
}> = (props) => {
  const getValue = useCallback(
    (value: number) => {
      const finalValue = (value * 100) / props.maxValue;
      return finalValue;
    },
    [props.maxValue]
  );

  const { currency } = useContext(CurrencyContext);

  return (
    <div
      className={styles.label}
      style={{ '--value': `${getValue(props.value)}%` } as React.CSSProperties}
    >
      <span
        className={styles.catCol}
        style={
          {
            '--color': props.color,
          } as React.CSSProperties
        }
      >
        <span className={styles.tooltip}>
          <span className={styles.text}>{props.name}</span>
          <span className={styles.text}>
            {getSymbol(currency)}
            {props.value}
          </span>
          <span className={styles.text}>{`${Math.round(
            getValue(props.value)
          )}%`}</span>
        </span>
      </span>
    </div>
  );
};

export default DiagramBarPiece;
