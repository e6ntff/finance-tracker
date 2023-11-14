import React from 'react';

import styles from './Expenses.module.scss';

import AddForm from '../../components/AddForm/AddForm';
import List from '../../components/List/List';

const Expenses: React.FC = () => {
  return (
    <div className={styles.expenses}>
      <AddForm />
      <List />
    </div>
  );
};

export default Expenses;
