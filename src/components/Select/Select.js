import React from 'react'

import styles from './Select.module.css'

const Select = (props) => {
	return (
		<select name="yearSelect" className={styles.select} onChange={props.handleYearChanging}>
			<option value="2023">2023</option>
			<option value="2022">2022</option>
			<option value="2021">2021</option>
			<option value="2020">2020</option>
		</select>
	)
}

export default Select
