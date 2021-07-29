import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Login } from '../comps/Login/Login.graphql'
import { Customer } from '../comps/Customer/Customer.graphql'
import { useRouter } from 'next/router'
import Link from 'next/link';

import { Divider } from 'antd';

export default function account() {


  const [isLoged, setIsLoged] = useState()

  useEffect(() => {
    setIsLoged(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  })


  //if(isLoged){
  const { loading, error, data } = useQuery(
    Customer,
    { fetchPolicy: "cache-and-network" }
  );

  if (loading) return <div>Loading</div>;
  if (error) {
    //const router = useRouter()
    //router.push('/account') 
    localStorage.setItem('token', '')
    return (<div>

      Error! {error.message}
      <p>
        <Link href="\login">
          <a><button>Please login again</button></a>
        </Link>
      </p>
    </div>

    );
  }
  return (
    <div>
      <p>{data.customer.firstname}</p>
      <p>{data.customer.lastname}</p>
      <p>{data.customer.email}</p>
    </div>
  )
  //}

}