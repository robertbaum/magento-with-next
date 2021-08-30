
import CREATE_EMPTY_CART from './CreateEmptyCart.graphql'
import ADD_SIMPLE_PRODUCT_TO_CART from './AddSimpleProductToCart.graphql'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';

import { connect } from 'react-redux';
import { setCartCount } from '../Redux/cart/cart.action';
import { setCartItems } from '../Redux/cart/cart.action';

import styles from './AddToCart.module.css'

const AddToCart = props => {
  //console.log(props)
  const { product, setCartCount, cartCount, setCartItems } = props
  const sku = product.sku;
  const [results, setResults] = useState('')
  //const [cartCount, setCartCount] = useState() defined by redux

  const [cartId, setCartId] = useState()


  useEffect(() => {
    setCartId(localStorage.getItem('cartId') ? localStorage.getItem('cartId') : '')
    //setCartCount(localStorage.getItem('cartCount') ? localStorage.getItem('cartCount') : 0)
  }, [])



  const [addSimpleProductsToCart] = useMutation(ADD_SIMPLE_PRODUCT_TO_CART, {
    onCompleted({ addSimpleProductsToCart }) {
      if (addSimpleProductsToCart.cart.id) {
        console.log(addSimpleProductsToCart.cart)
        setResults('the product has been added')
        setTimeout(() => {
          setResults('')
        }, 3000)
      }
      setCartCount(addSimpleProductsToCart.cart.total_quantity);
      setCartItems(addSimpleProductsToCart.cart.items);

    },
    onError(errors) {
      setResults(errors.message);
    }
  });



  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addSimpleProductsToCart({ variables: { cartId, sku } });
      }}
    >
      {results ? <p className={styles.message}>{results}</p> : ''}
      <button type="submit" disabled={product.__typename == "SimpleProduct" ? '' : 'disabled'}>Add Product</button>
    </form>);
}

const mapStateToProps = ({ cart }) => ({
  cartCount: cart.cartCount
})

const mapDispatchToProps = dispatch => ({
  setCartCount: cart => dispatch(setCartCount(cart)),
  setCartItems: cart => dispatch(setCartItems(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);