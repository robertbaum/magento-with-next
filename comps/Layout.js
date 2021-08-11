import Footer from "~/comps/Footer"
import Navbar from "~/comps/Navbar"
import Container from '@material-ui/core/Container';

import { useEffect } from 'react'
import { useMutation } from '@apollo/client';
import CREATE_EMPTY_CART from './Product/CreateEmptyCart.graphql'

const Layout = ({ children }) => {


  /** create new cart as first as*/
  useEffect(() => {
    localStorage.getItem('cartId') ? localStorage.getItem('cartId') : createEmptyCart()
  }, [])

  const [createEmptyCart] = useMutation(CREATE_EMPTY_CART,
    {
      onCompleted({ createEmptyCart }) {
        if (createEmptyCart) {
          localStorage.setItem('cartId', createEmptyCart);
        }
      },
      onError(errors) {
        console.log(errors.message)
      }
    }
  );

  return (
    <>
      <Navbar />
      <Container className="content" maxWidth="xl">
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;