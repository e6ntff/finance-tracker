import React, { useContext } from 'react'

import styles from './YearDiagram.module.scss'

import DiagramBar from '../DiagramBar/DiagramBar'
import { CurrencyContext } from '../CurrencyContext/CurrencyContext'

const YearDiagram = (props) => {
  const { currency } = useContext(CurrencyContext)

  const yearsRange = props.list.reduce(
    (range, item) => {
      const year = new Date(item.date).getFullYear()
      range.min = Math.min(range.min, year)
      range.max = Math.max(range.max, year)
      return range
    },
    { min: Infinity, max: -Infinity }
  )

  const yearsArray = Array.from(
    { length: yearsRange.max - yearsRange.min + 1 },
    (_, index) => yearsRange.min + index
  )

  const data = yearsArray.map((year) => {
    return {
      year: year.toString(),
      value: 0,
    }
  })

  const dataWithValues = props.list.reduce((acc, item) => {
    const currentYear = new Date(item.date).getFullYear()
    const index = currentYear - yearsRange.min

    acc[index].value += item.price[currency]

    return acc
  }, data)

  const maxValue = Math.max(...dataWithValues.map((item) => item.value))

  return (
    <ul className={styles.diagram}>
      {dataWithValues.map((item) => (
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
