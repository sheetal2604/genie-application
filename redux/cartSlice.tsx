import {createSlice} from '@reduxjs/toolkit';

type cartData = {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  images: [];
  thumbnail: string;
  quantity: number | 0;
};

type CartDataType = {
  cartData: cartData[];
};
const initialState: CartDataType = {
  cartData: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartData.find(
        product => product.title === item.title,
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartData.push({...item, quantity: 1});
      }
    },
    clearItem: state => {
      state.cartData = [];
    },
    decrementQuantity: (state, action) => {
      const {title} = action.payload;
      const productIndex = state.cartData.findIndex(
        product => product.title === title,
      );
      if (productIndex !== -1) {
        const product = state.cartData[productIndex];
        if (product.quantity > 1) {
          product.quantity--;
        } else {
          state.cartData.splice(productIndex, 1);
        }
      }
    },
  },
});
export const {addItem, clearItem, decrementQuantity} = cartSlice.actions;
export default cartSlice.reducer;
