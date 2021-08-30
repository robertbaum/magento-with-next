import CUSTOMER_CART from '../comps/Cart/CustomerCart.graphql'
import LOGIN from '../comps/Login/Login.graphql'
import MERGE_CARTS from '../comps/Cart/MergeCarts.graphql'
import CART from '../comps/Cart/Cart.graphql'

import React from 'react'
import { gql, useQuery, useMutation, useLazyQuery } from '@apollo/client'


export default function testPage() {

    // const [CustomerCart] = useLazyQuery(
    //     CUSTOMER_CART,
    //     {
    //         fetchPolicy: 'network-only',
    //         onCompleted({ customerCart }) {
    //             console.log(customerCart)
    //         }
    //     }
    // );



    // const [login] = useMutation(

    //     LOGIN,
    //     {
    //         onCompleted({ generateCustomerToken }) {
    //             if (generateCustomerToken && generateCustomerToken.token) {
    //                 console.log(generateCustomerToken.token)
    //                 CustomerCart()
    //             }
    //         }
    //     }
    // );

    // const [MergeCarts] = useMutation(
    //     MERGE_CARTS,
    //     {
    //         onCompleted(result) {
    //             console.log(result)
    //         },
    //         onError(errors) {
    //             console.log(errors.message)
    //         }
    //     }
    // );


    const [Cart] = useLazyQuery(
        CART,
        {
            fetchPolicy: 'network-only',
            variables: { cart_id: 'kf2QTpKDDkcPUPBPL5Bfk86eymu3x1H3' },
            onCompleted(date) {
                console.log(data)
            }
        }
    );

    const onSubmit = (event) => {
        event.preventDefault()
        //const guest = "qG3y8crrExy60lwmHUEwbbo86pWNKoaL";
        //const customer = "sVEl7Zr2hlcEk7RuffCnRLcpayHfD6NL";
        //MergeCarts({ variables: { guest, customer } })
        //login({ variables: { email: 'robert.baum@itm-development.com', password: 'Qwer1234$' } })
        //CustomerCart()
        Cart()
    };

    // if (loading) setIsLoged('loading');
    // if (error) return <p>An error occurred</p>;

    return <>
        <form onSubmit={(e) => onSubmit(e)}>
            <button type="submit">click</button>
        </form>
    </>
}

