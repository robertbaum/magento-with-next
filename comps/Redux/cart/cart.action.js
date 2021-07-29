import { cartActionType } from "./cart.types";

export const setCartCount = cart => ({
    type: cartActionType.SET_CART_COUNT,
    payload: cart
})