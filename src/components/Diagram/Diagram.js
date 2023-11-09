import React from 'react'

import styles from './Diagram.module.css'

import DiagramBar from './DiagramBar/DiagramBar'

const Diagram = (props) => {

  
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    <ul className={styles.diagram}>
      {months.map((month) => (
        <DiagramBar
          key={month}
          month={month}
					value={50}
        />
      ))}
    </ul>
  )
}

export default Diagram
