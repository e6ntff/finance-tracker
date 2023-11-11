import React, { useEffect, useMemo, useState } from 'react'

import styles from './Home.module.scss'

import YearDiagram from '../../components/YearDiagram/YearDiagram'

const Home = (props) => {
  const [total, setTotal] = useState(0)

  const totalPrice = useMemo(
    () => props.list.reduce((acc, item) => acc + item.price, 0),
    [props.list]
  )

  useEffect(() => {
    setTotal(totalPrice)
  }, [totalPrice, setTotal])

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
