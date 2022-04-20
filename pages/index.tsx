import type { NextPage } from 'next'
import HomeLayout from '../src/components/layout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <HomeLayout />
    </div>
  )
}

export default Home
