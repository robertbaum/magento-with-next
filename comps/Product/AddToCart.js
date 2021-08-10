
import CREATE_EMPTY_CART from './CreateEmptyCart.graphql'
import ADD_SIMPLE_PRODUCT_TO_CART from './AddSimpleProductToCart.graphql'
import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client';

import { connect } from 'react-redux';
import { setCartCount } from '../Redux/cart/cart.action';

const AddToCart = props => {
  //console.log(props)
  const { product, setCartCount, cartCount } = props
  const sku = product.sku;


  const [results, setResults] = useState('')
  //const [cartCount, setCartCount] = useState() defined by redux

  const [cartId, setCartId] = useState()


  useEffect(() => {
    setCartId(localStorage.getItem('cartId') ? localStorage.getItem('cartId') : createEmptyCart())
    setCartCount(localStorage.getItem('cartCount') ? localStorage.getItem('cartCount') : 0)
  }, [])




  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART,
    {
      onCompleted({ createEmptyCart }) {
        if (createEmptyCart) {
          localStorage.setItem('cartId', createEmptyCart);
          setCartId(createEmptyCart)
        }
      },
      onError(errors) {
        console.log(errors.message)
      }
    }
  );

  const [addSimpleProductsToCart] = useMutation(ADD_SIMPLE_PRODUCT_TO_CART, {
    onCompleted({ addSimpleProductsToCart }) {
      if (addSimpleProductsToCart.cart.id) {
        setResults('the product has been added')
        setTimeout(() => {
          setResults('')
        }, 3000)

      }
      setCartCount(addSimpleProductsToCart.cart.total_quantity);
    },
    onError(errors) {
      setResults(errors.message);
    }
  });

  useEffect(() => {
    localStorage.setItem('cartCount', cartCount)
  }, [cartCount])



  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        addSimpleProductsToCart({ variables: { cartId, sku } });
      }}
    >
      <p>{results}</p>
      <button type="submit">Add Product</button>
    </form>);
}

const mapStateToProps = ({ cart }) => ({
  cartCount: cart.cartCount
})

const mapDispatchToProps = dispatch => ({
  setCartCount: cart => dispatch(setCartCount(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);