import React, { useState, useCallback, useMemo } from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.scss';

import Select from '../Select/Select';
import NoExpenses from '../NoExpenses/NoExpenses';
import { useSelector } from 'react-redux';
import { getList } from '../../utils/store';

import { ExpenseItem } from '../../settings/interfaces';
import Preloader from '../Preloader/Preloader';

interface Props {
  loading: boolean;
}

const List: React.FC<Props> = (props) => {
  const list = useSelector(getList);

  const [year, setYear] = useState<number>(2023);

  const filteredList = useMemo(
    () =>
      list.filter((item: any) => new Date(item.date).getFullYear() === year),
    [year, list]
  );

  const handleYearChanging = useCallback((event: any) => {
    setYear(Number(event.target.value));
  }, []);

  return (
    <>
      <Select year={year} handleYearChanging={handleYearChanging} />
      {!props.loading && !filteredList.length && <NoExpenses />}
      {props.loading && <Preloader />}
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
