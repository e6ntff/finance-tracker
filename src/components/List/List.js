import React from 'react';
import ListItem from '../ListItem/ListItem';
import styles from './List.module.css';

const List = (props) => {
  console.log(styles.list)
  return (
    <ul className={styles.list}>
      {props.list.map(item =>
        <ListItem
          key={item.id}
          id={item.id}
          date={item.date}
          title={item.title}
          price={item.price}
          list={props.list}
          setList={props.setList}
        />
      )}
    </ul>
  );
};

export default List;
