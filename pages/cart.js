import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import CartItems from '../comps/Cart/CartItems'
import CartTotals from '../comps/Cart/CartTotals'

import CART from '../comps/Cart/Cart.graphql'
import styles from '../comps/Cart/cart.module.css'


const Cart = (props) => {

    const [cartId, setCartId] = useState('')
    useEffect(() => {
        setCartId(localStorage.getItem('cartId') ? localStorage.getItem('cartId') : '')
    }, [])

    const { loading, error, data } = useQuery(
        CART,
        {
            variables: { cart_id: cartId },
        }
    );

    return (

        data && data.cart ? (
            <>
                <CartItems items={data.cart.items} />
                <CartTotals />
            </>
        ) :
            ''


    )
}


export default Cart;
