import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.css';

const List = (props) => {
  return (
    <ul className={styles.list}>
      {props.list.map(item =>
        <ListItem
          key={item.id}
          date={item.date}
          title={item.title}
          price={item.price}
          changeDate={item.changeDate}
          changeTitle={item.changeTitle}
          changePrice={item.changePrice}
        />
      )}
    </ul>
  );
};

export default List;
