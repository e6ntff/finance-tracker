import React, { useContext, useMemo } from 'react';

import styles from './Diagram.module.scss';

import DiagramBar from '../DiagramBar/DiagramBar';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';

import { ExpenseItem, category } from '../../settings/interfaces';

interface DataItem {
  month: string;
  categories: { category: category; value: number }[];
}

interface Props {
  filteredList: ExpenseItem[];
}

const Diagram: React.FC<Props> = (props) => {
  const { currency } = useContext(CurrencyContext);

  const Data = useMemo(() => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const allMonthData = monthNames.map((month, monthIndex) => {
      const monthData = props.filteredList
        .filter((item) => new Date(item.date).getMonth() === monthIndex)
        .reduce((acc, item) => {
          const categoryIndex = acc.findIndex(
            (cat) =>
              cat.category.id === item.category.id &&
              cat.category.name === item.category.name
          );

          if (categoryIndex !== -1) {
            acc[categoryIndex].value += item.price[currency];
          } else {
            acc.push({
              category: item.category,
              value: item.price[currency],
            });
          }
          return acc;
        }, [] as { category: category; value: number }[]);

      return { month, categories: monthData };
    });

    const flattenedData = allMonthData.length > 0 ? allMonthData.flat() : [];

    const valuesByMonths = flattenedData
      .map((item) => item.categories.reduce((acc, cat) => acc + cat.value, 0))
      .flat();

    const maxValue = Math.max(...valuesByMonths);

    const newData: DataItem[] = monthNames.map((month, index) => {
      return {
        month,
        categories: allMonthData[index].categories,
      };
    });

    return {
      data: newData,
      valuesByMonths: valuesByMonths,
      maxValue: maxValue,
    };
  }, [props.filteredList, currency]);

  return (
    <ul className={styles.diagram}>
      {Data.data.map((item, index) => (
        <DiagramBar
          key={item.month}
          month={item.month}
          categories={item.categories}
          maxValue={Data.maxValue}
          valueBy={Data.valuesByMonths[index]}
        />
      ))}
    </ul>
  );
};

export default Diagram;
