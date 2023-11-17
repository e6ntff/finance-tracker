import React, { useCallback } from 'react';

import styles from './DiagramBarPiece.module.scss';

const DiagramBarPiece: React.FC<{
  value: number;
  color: string;
  maxValue: number;
}> = (props) => {
  const getValue = useCallback(
    (value: number) => {
      const finalValue = (value * 100) / props.maxValue;
      return finalValue <= 100 ? `${finalValue}%` : '100%';
    },
    [props.maxValue]
  );

  return (
    <div
      className={styles.catCol}
      style={
        {
          '--value': getValue(props.value),
          '--color': props.color,
        } as React.CSSProperties
      }
    ></div>
  );
};

export default DiagramBarPiece;
