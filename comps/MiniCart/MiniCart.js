import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useLazyQuery } from '@apollo/client'
import { connect } from 'react-redux';
import { setCartItems } from '../Redux/cart/cart.action';

import CART from '../Cart/Cart.graphql'

import styles from './miniCart.module.css'


const MiniCart = (props) => {
    const { cartItems, setCartItems, closeMinCart } = props;

    const [Cart] = useLazyQuery(
        CART,
        {
            fetchPolicy: 'network-only',
            variables: { cart_id: 'Zz73FirrqJ5pYCHf3BkyjozIGBAGx8Xf' },
            onCompleted(data) {
                console.log('called again')
                setCartItems(data.cart.items)
            }
        }
    );

    const [cartId, setCartId] = useState('')

    useEffect(() => {
        setCartId(localStorage.getItem('cartId') ? localStorage.getItem('cartId') : '')
        console.log(cartItems.lenght)

        if (!cartItems.lenght > 0) {
            //Cart()
        }
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header} >
                <button onClick={closeMinCart}> close </button>
            </div>
            <div className={styles.cartItems}>
                {cartItems.map(item => (
                    <div className={styles.cartItem} key={item.uid}>
                        <div className={styles.leftpart}>
                            <Image
                                src={item.product.image.url}
                                className="cart-product-image"
                                width="100"
                                height="100"
                            />
                        </div>
                        <div className={styles.rightpart}>
                            <span>{item.product.name}</span>
                            <span>{item.prices.row_total.value} {item.prices.row_total.currency} </span>
                            <span> {item.quantity} items</span>
                        </div>
                    </div>

                ))}
            </div>
            <div className={styles.footer} >
                <Link href="/cart" >
                    <a onClick={closeMinCart}> View Cart</a>
                </Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    cartItems: state.cart.cartItems
})

const mapDispatchToProps = dispatch => ({
    setCartItems: cart => dispatch(setCartItems(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
