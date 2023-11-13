import React, { useContext } from 'react';

import styles from './YearDiagram.module.scss';

import DiagramBar from '../DiagramBar/DiagramBar';
import {
  CurrencyContext,
  CurrencyContextProps,
} from '../CurrencyContext/CurrencyContext';

const YearDiagram: React.FC<any> = (props) => {
  const { currency } = useContext<CurrencyContextProps>(CurrencyContext);

  const yearsRange = props.list.reduce(
    (range: { min: number; max: number }, item: ExpenseItem) => {
      const year = new Date(item.date).getFullYear();
      range.min = Math.min(range.min, year);
      range.max = Math.max(range.max, year);
      return range;
    },
    { min: Infinity, max: -Infinity }
  );

  const yearsArray = Array.from(
    { length: yearsRange.max - yearsRange.min + 1 },
    (_, index) => yearsRange.min + index
  );

  const data = yearsArray.map((year) => {
    return {
      year: year.toString(),
      value: 0,
    };
  });

  const dataWithValues: [{ year: string; value: number }] = props.list.reduce(
    (acc: [{ year: string; value: number }], item: ExpenseItem) => {
      const currentYear: number = new Date(item.date).getFullYear();
      const index: number = currentYear - yearsRange.min;

      acc[index].value +=
        item.price[
          currency as keyof {
            USD: number;
            EUR: number;
            RUB: number;
          }
        ];

      return acc;
    },
    data
  );

  const maxValue: number = Math.max(
    ...dataWithValues.map((item) => item.value)
  );

  return (
    <ul className={styles.diagram}>
      {dataWithValues.map((item) => (
        <DiagramBar
          key={item.year}
          month={item.year}
          value={item.value}
          maxValue={maxValue}
        />
      ))}
    </ul>
  );
};

export default YearDiagram;
