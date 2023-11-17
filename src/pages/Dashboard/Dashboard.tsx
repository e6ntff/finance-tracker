import React, { useState, useCallback, useMemo } from 'react';

import styles from './Dashboard.module.scss';

import Diagram from '../../components/Diagram/Diagram';
import Select from '../../components/Select/Select';
import NoExpenses from '../../components/NoExpenses/NoExpenses';
import { useSelector } from 'react-redux';

const Dashboard: React.FC = () => {
  const [year, setYear] = useState<number>(2023);

  const list = useSelector((state: GlobalState) => state.list);

  const categories = useSelector((state: GlobalState) => state.categories);

  const filteredList = useMemo(
    () => list.filter((item) => new Date(item.date).getFullYear() === year),
    [year, list]
  );
  console.log(list, categories);

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
