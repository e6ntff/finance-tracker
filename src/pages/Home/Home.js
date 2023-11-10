import React, { useEffect, useState } from 'react'

import styles from './Home.module.scss'

const Home = (props) => {
  const [total, setTotal] = useState(0)

  const getTotal = () => {
    const totalPrice = props.list.forEach((item) => {
      console.log(item.price)
    })
    setTotal(totalPrice)
  }

  useEffect(() => {
    getTotal()
  }, [props.list])

  return (
    <div className={styles.home}>
      {/* diagram */}
      <div className={styles.data}>
        <div className={styles.container}>
          <h2 className={styles.title}>Total</h2>
          <span className={styles.title}>${total}</span>
        </div>
        <div className={styles.container}>
          <h2 className={styles.title}>total</h2>
          <span className={styles.title}>1000</span>
        </div>
        <div className={styles.container}>
          <h2 className={styles.title}>total</h2>
          <span className={styles.title}>1000</span>
        </div>
      </div>
    </div>
  )
}

export default Home
