import React, { useEffect, useState } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import MERGE_CARTS from '../comps/Cart/MergeCarts.graphql'
import LOGIN from '../comps/Login/Login.graphql'
import CUSTOMER_CART from '../comps/Cart/CustomerCart.graphql'
import { useRouter } from 'next/router'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function login() {

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isLoged, setIsLoged] = useState()
  const [guestCartId, setGuestCartId] = useState()

  // request parameters 
  const { query:
    { nEmail, nPassword }
  } = useRouter();

  // for redirection
  const router = useRouter()

  // get customer cart after login in 
  // (useLazyQuery) will not excute at the load but after requesting it
  const [getCustomerCart] = useLazyQuery(
    CUSTOMER_CART,
    {
      fetchPolicy: 'network-only',
      onCompleted({ customerCart }) {
        console.log('getCustomerCart proccesd')
        console.log(customerCart)
        const customerCartId = customerCart.id
        if (customerCart && customerCartId) {
          localStorage.setItem('cartId', customerCartId)
          if (guestCartId) {
            // metging the carts after login
            MergeCarts({ variables: { guestCartId, customerCartId } })
          }

        }
        // redirect to the customer page after login
        router.push('/account')
      },
      onError(errors) {
        console.log(errors.message)
      }
    }
  );

  const [MergeCarts] = useMutation(
    MERGE_CARTS,
    {
      onError(errors) {
        console.log(errors.message)
      }
    }
  );

  const [login] = useMutation(

    LOGIN,
    {
      onCompleted({ generateCustomerToken }) {
        if (generateCustomerToken && generateCustomerToken.token) {
          localStorage.setItem('token', generateCustomerToken.token);
          setIsLoged(generateCustomerToken.token)
          console.log('login proccesd')
          getCustomerCart()
        }
      },
      onError(errors) {
        console.log(errors.message)
      }
    }
  );



  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoged(localStorage.getItem('token'))
      //redirect to the customer page if logged
      setTimeout(() => {
        router.push('/account')
      }, 3000);

    }
    if (localStorage.getItem('cartId')) {
      setGuestCartId(localStorage.getItem('cartId'))
    }
    console.log(guestCartId)
  }, [guestCartId, isLoged])




  const onChange = (e) => {
    if (e.target.name == 'email') {
      const email = e.target.value;
      setEmail(email);
    } else {
      const password = e.target.value;
      setPassword(password);
    }
  };


  const onSubmit = (event) => {
    event.preventDefault();
    login({ variables: { email, password } });
  };



  //in case the this page called by the registration page
  useEffect(() => {
    // to prevent loop we check the token
    if (nEmail && nPassword && !localStorage.getItem('token')) {
      login({ variables: { email: nEmail, password: nPassword } });
    }
  }, [])




  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => onChange(e)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

    </Container>
  );
}

