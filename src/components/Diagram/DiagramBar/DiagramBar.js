import React from "react";

import styles from './DiagramBar.module.css'

const DiagramBar = (props) => {
	return <li className={styles.bar}>
		<div className={styles.column} style={{ '--value': `${props.value}%` }}></div>
		<span className={styles.month}>{props.month}</span>
	</li>
}

export default DiagramBar