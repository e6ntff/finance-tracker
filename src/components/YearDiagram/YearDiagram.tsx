import React, { useContext, useMemo } from 'react';

import styles from './YearDiagram.module.scss';

import DiagramBar from '../DiagramBar/DiagramBar';
import {
  CurrencyContext,
  CurrencyContextProps,
} from '../CurrencyContext/CurrencyContext';

interface DataItem {
  year: string;
  categories: { category: category; value: number }[];
}

interface YearDiagramProps {
  list: ExpenseItem[];
}

const YearDiagram: React.FC<YearDiagramProps> = (props) => {
  const { currency } = useContext<CurrencyContextProps>(CurrencyContext);

  const Data = useMemo(() => {
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

    const allYearData = yearsArray.map((year) => {
      const yearData = props.list
        .filter((item) => new Date(item.date).getFullYear() === year)
        .reduce((acc, item) => {
          const categoryIndex = acc.findIndex(
            (cat) =>
              cat.category.id === item.category.id &&
              cat.category.name === item.category.name
          );

          if (categoryIndex !== -1) {
            acc[categoryIndex].value += item.price[currency || ''] || 0;
          } else {
            acc.push({
              category: item.category,
              value: item.price[currency || ""] || 0,
            });
          }
          return acc;
        }, [] as { category: category; value: number }[]);

      return { year: year.toString(), categories: yearData };
    });

    const flattenedData = allYearData.length > 0 ? allYearData.flat() : [];

    const valuesByYears = flattenedData
      .map((item) => item.categories.reduce((acc, cat) => acc + cat.value, 0))
      .flat();

    const maxValue = Math.max(...valuesByYears);

    const newData: DataItem[] = yearsArray.map((year, index) => {
      return {
        year: year.toString(),
        categories: allYearData[index].categories,
      };
    });

    return {
      data: newData,
      valuesByYears: valuesByYears,
      maxValue: maxValue,
    };
  }, [props.list, currency]);

  return (
    <ul className={styles.diagram}>
      {Data.data.map((item, index) => (
        <DiagramBar
          key={item.year}
          month={item.year}
          categories={item.categories}
          maxValue={Data.maxValue}
          valueBy={Data.valuesByYears[index]}
        />
      ))}
    </ul>
  );
};

export default YearDiagram;
