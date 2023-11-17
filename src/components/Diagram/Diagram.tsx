import React, { useContext, useMemo } from 'react';

import styles from './Diagram.module.scss';

import DiagramBar from '../DiagramBar/DiagramBar';
import { CurrencyContext } from '../CurrencyContext/CurrencyContext';

interface DataItem {
  month: string;
  categories: { category: category; value: number }[];
}

const Diagram: React.FC<{
  filteredList: ExpenseItem[];
}> = (props) => {
  const { currency } = useContext(CurrencyContext);

  // const data = useMemo(() => {
  //   const newData = [
  //     { month: 'Jan', value: 0 },
  //     { month: 'Feb', value: 0 },
  //     { month: 'Mar', value: 0 },
  //     { month: 'Apr', value: 0 },
  //     { month: 'May', value: 0 },
  //     { month: 'Jun', value: 0 },
  //     { month: 'Jul', value: 0 },
  //     { month: 'Aug', value: 0 },
  //     { month: 'Sep', value: 0 },
  //     { month: 'Oct', value: 0 },
  //     { month: 'Nov', value: 0 },
  //     { month: 'Dec', value: 0 },
  //   ];

  //   console.log(props.filteredList)

  //   for (const item of props.filteredList) {
  //     const currentMonth = new Date(item.date).getMonth();
  //     newData[currentMonth].value += item.price[currency];
  //   }

  //   const maxValue = Math.max(...newData.map((item) => item.value));
  //   return { data: newData, maxValue };
  // }, [props.filteredList, currency]);

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
