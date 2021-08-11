import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import styles from './cart.module.css'



const CartItems = (props) => {
    const { items } = props
    return (
        <TableContainer component={Paper}>
            <Table className={styles.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Qty</TableCell>
                        <TableCell align="right">Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        items && items.length ?
                            items.map((item) => (

                                <TableRow key={item.uid}>
                                    <TableCell>
                                        <Image src={item.product.image.url} className="cart-product-image" width="100" height="100" />
                                    </TableCell>
                                    <TableCell>{item.product.name}</TableCell>
                                    <TableCell align="right">{item.prices.price.value} {item.prices.price.currency}</TableCell>
                                    <TableCell align="right">{item.quantity}</TableCell>
                                    <TableCell align="right">{item.prices.row_total.value} {item.prices.row_total.currency}</TableCell>
                                </TableRow>
                            ))
                            :
                            ''
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default CartItems;
