import React, { useState, useCallback, useMemo } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.scss';

import Select from '../Select/Select';
import NoExpenses from '../NoExpenses/NoExpenses';
import { useSelector } from 'react-redux';

const List: React.FC = () => {
  const list = useSelector((state: GlobalState) => state.list);

  const [year, setYear] = useState<number>(2023);

  const filteredList = useMemo(
    () => list.filter((item) => new Date(item.date).getFullYear() === year),
    [year, list]
  );

  const handleYearChanging = useCallback((event: any) => {
    setYear(Number(event.target.value));
  }, []);

  return (
    <>
      <Select year={year} handleYearChanging={handleYearChanging} />
      {!filteredList.length && <NoExpenses />}
      <ul className={styles.list}>
        {filteredList.map((item: ExpenseItem) => (
          <ListItem
            key={item.id}
            id={item.id}
            category={item.category}
            date={item.date}
            title={item.title}
            price={item.price}
          />
        ))}
      </ul>
    </>
  );
};

export default List;
