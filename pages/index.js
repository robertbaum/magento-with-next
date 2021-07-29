import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import ADD_SIMPLE_PRODUCT_TO_CART from '../comps/Product/AddSimpleProductToCart.graphql'
import { useMutation } from '@apollo/client';
import { useState } from 'react'

export default function Home() {
  const [results, setResults] = useState()
  const [count, setCount] = useState()



  return (
    <>
      <Head>
        <title>Next m2 List | Home</title>
        <meta name="keywords" content="api-request" />
      </Head>
      <div>
        <h1 className={styles.title}>Homepage</h1>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
        <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus animi impedit suscipit architecto, odio inventore nostrum non neque dicta. Quam magni accusantium culpa distinctio tempore iure accusamus, dolorem nobis odit.</p>
        {/* <Link href="/api-request/">
          <a className={styles.btn}>API Request</a>
        </Link>
        <Link href="/examples/graphql-request/">
          <a className={styles.btn}>GraphQl Request</a>
        </Link>
        <Link href="/examples/graphql-request-dynamic/">
          <a className={styles.btn}>Dynamic GraphQl Request</a>
        </Link> */}
      </div>
    </>
  )
}
