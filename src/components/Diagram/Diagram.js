import React from 'react'

import styles from './Diagram.module.scss'

import DiagramBar from '../DiagramBar/DiagramBar'

const Diagram = (props) => {
  let maxValue = 0

  const data = [
    { month: 'Jan', value: 0 },
    { month: 'Feb', value: 0 },
    { month: 'Mar', value: 0 },
    { month: 'Apr', value: 0 },
    { month: 'May', value: 0 },
    { month: 'Jun', value: 0 },
    { month: 'Jul', value: 0 },
    { month: 'Aug', value: 0 },
    { month: 'Sep', value: 0 },
    { month: 'Oct', value: 0 },
    { month: 'Nov', value: 0 },
    { month: 'Dec', value: 0 },
  ]

  for (const item in props.filteredList) {
    const currentMonth = new Date(props.filteredList[item].date).getMonth()

    data[currentMonth].value += props.filteredList[item].price

    if (props.filteredList[item].price > maxValue)
      maxValue = props.filteredList[item].price
  }

  return (
    <ul className={styles.diagram}>
      {data.map((item) => (
        <DiagramBar key={item.month} month={item.month} value={item.value} maxValue={maxValue}/>
      ))}
    </ul>
  )
}

export default Diagram
