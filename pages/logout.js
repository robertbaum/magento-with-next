import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
//import {LOGOUT_USER} from '../comps/Cart/CustomerCart.graphql'

export default function logout() {

  const router = useRouter()

  const [isLoged, setIsLoged] = useState()
  useEffect(() => {
    setIsLoged(localStorage.getItem('token') || '')
  }, [isLoged])

  const onSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('token', '')
    localStorage.setItem('cartId', '')
    setIsLoged('')
    if (isLoged) { router.push('/') }
  };

  // if (loading) setIsLoged('loading');
  // if (error) return <p>An error occurred</p>;

  return <div>
    <form onSubmit={(e) => onSubmit(e)}>
      <div>{isLoged}</div>
      <button type="submit">logout</button>
    </form></div>
    ;
}