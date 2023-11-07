import React from 'react';
import styles from './ListItem.module.css';

const ListItem = (props) => {
  return (
    <li className={styles.item}>
      <span className={styles.date}>{props.date}</span>
      <span className={styles.title}>{props.title}</span>
      <span className={styles.price}>${props.price}</span>
      <button className={styles.button} onClick={() => props.deleteItem(props.id)}>🗑</button>
    </li>
  );
};

export default ListItem;
