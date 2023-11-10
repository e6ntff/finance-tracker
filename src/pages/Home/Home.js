import React, { useEffect, useState } from 'react'

import styles from './Home.module.scss'

import YearDiagram from '../../components/YearDiagram/YearDiagram'

const Home = (props) => {
  const [total, setTotal] = useState(0)

  const getTotal = () => {
    const totalPrice = props.list.reduce((acc, item) => acc + item.price, 0)
    setTotal(totalPrice)
  }

  useEffect(() => {
    getTotal()
  }, [props.list])

  return (
    <div className={styles.home}>
      <YearDiagram list={props.list} />
      <div className={styles.data}>
        <div className={styles.container}>
          <h2 className={styles.title}>Total</h2>
          <span className={styles.title}>${total}</span>
        </div>
        {/* categories - TODO */}
      </div>
    </div>
  )
}

export default Home
