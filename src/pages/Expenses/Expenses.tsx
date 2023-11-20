import React from 'react';

import styles from './Expenses.module.scss';

import AddForm from '../../components/AddForm/AddForm';
import List from '../../components/List/List';

interface Props {
  loading: boolean;
}

const Expenses: React.FC<Props> = (props) => {
  return (
    <div className="app">
      <div className={styles.expenses}>
        <AddForm />
        <List loading={props.loading} />
      </div>
    </div>
  );
};

export default Expenses;
