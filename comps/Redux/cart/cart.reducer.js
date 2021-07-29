import { cartActionType } from "./cart.types";


const INITIAL_STATE = {
    cartCount: 0
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case cartActionType.SET_CART_COUNT:
            return {
                ...state,
                cartCount: action.payload
            }
        default:
            return state;
    }
}

export default cartReducer;