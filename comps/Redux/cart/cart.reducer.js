import { cartActionType } from "./cart.types";


const INITIAL_STATE = {
    cartCount: 0,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionType.SET_CART_COUNT:
            return {
                ...state,
                cartCount: action.payload
            }
        case cartActionType.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;