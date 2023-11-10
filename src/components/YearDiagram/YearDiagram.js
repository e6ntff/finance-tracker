import React from 'react'

import styles from './YearDiagram.module.scss'

import DiagramBar from '../DiagramBar/DiagramBar'

const YearDiagram = (props) => {
  const data = [
    { year: '2020', value: 0 },
    { year: '2021', value: 0 },
    { year: '2022', value: 0 },
    { year: '2023', value: 0 },
  ]

  for (const item in props.list) {
    const currentYear = new Date(props.list[item].date).getFullYear()

    data[currentYear - data[0].year].value += props.list[item].price
  }

  const maxValue = Math.max(...data.map((item) => item.value))

  return (
    <ul className={styles.diagram}>
      {data.map((item) => (
        <DiagramBar
          key={item.year}
          month={item.year}
          value={item.value}
          maxValue={maxValue}
        />
      ))}
    </ul>
  )
}

export default YearDiagram
