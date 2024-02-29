import {createSlice} from '@reduxjs/toolkit';

type orderData = {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  trackingStatus: string;
};

type OrderDataType = {
  orderData: orderData[];
};
const initialState: OrderDataType = {
  orderData: [],
};

const cartSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrderItem: (state, action) => {
      state.orderData.push(action.payload);
    },
  },
});
export const {addOrderItem} = cartSlice.actions;
export default cartSlice.reducer;
