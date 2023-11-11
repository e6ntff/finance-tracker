import React, { useMemo } from 'react'

import styles from './Diagram.module.scss'

import DiagramBar from '../DiagramBar/DiagramBar'

const Diagram = (props) => {
  
  const data = useMemo(() => {
    const newData = [
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

    for (const item of props.filteredList) {
      const currentMonth = new Date(item.date).getMonth()

      newData[currentMonth].value += item.price
    }

    newData.maxValue = Math.max(...newData.map((item) => item.value))
    return newData
  }, [props.filteredList])

  return (
    <ul className={styles.diagram}>
      {data.map((item) => (
        <DiagramBar
          key={item.month}
          month={item.month}
          value={item.value}
          maxValue={data.maxValue}
        />
      ))}
    </ul>
  )
}

export default Diagram
