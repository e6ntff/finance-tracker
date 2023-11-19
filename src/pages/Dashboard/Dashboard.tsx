import React, { useState, useCallback, useMemo } from 'react';

import styles from './Dashboard.module.scss';

import Diagram from '../../components/Diagram/Diagram';
import Select from '../../components/Select/Select';
import NoExpenses from '../../components/NoExpenses/NoExpenses';
import { useSelector } from 'react-redux';
import { getList } from '../../utils/store';

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<number>(2023);

  const list = useSelector(getList);

  const filteredList = useMemo(
    () =>
      list.filter(
        (item: ExpenseItem) => new Date(item.date).getFullYear() === year
      ),
    [year, list]
  );

  const handleYearChanging = useCallback((event: any) => {
    setYear(Number(event.target.value));
  }, []);

  return (
    <div className={styles.dashboard}>
      <Select year={year} handleYearChanging={handleYearChanging} />
      {filteredList.length ? (
        <Diagram filteredList={filteredList} />
      ) : (
        <NoExpenses />
      )}
    </div>
  );
};

export default Dashboard;
