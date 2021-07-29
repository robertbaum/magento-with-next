import mergeCarts from '../comps/Cart/MergeCarts.graphql'
import { customerCart } from '../comps/gql/query/CustomerCart.graphql'
import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/router'


export default function afterlogin() {
    const {
        query: { guestCart },
    } = useRouter();

    const router = useRouter()

    const [mergeCarts] = useMutation(
        mergeCarts,
        {
            onCompleted({ customerCart }) {
            },
            onError(errors) {
                console.log(errors.message)
            }
        }
    );


    // get the customer new cart
    const { data, error, loading } = useQuery(customerCart)
    if (loading) {
        return (
            <div>redirecting...</div>
        )
    }
    if (error) {
        return (
            <div > error </div>
        )
    }
    if (data) {
        const customerCart = data.customerCart.id
        localStorage.setItem('cartId', customerCart)
        mergeCarts({ variables: { guestCart, customerCart } })
        router.push('/account')
    }

    return (
        <div></div>
    )
}

