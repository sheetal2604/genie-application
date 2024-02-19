import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
export type ProductType = {
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
};

type ItemProps = {title: string};
type ProductDataType = {
  isLoading: boolean;
  productData: ProductType[];
  error: string;
};

const initialCategoryState: ProductDataType = {
  isLoading: false,
  productData: [],
  error: '',
};

export const AllProductDetails = createAsyncThunk(
  'product/allproducts',
  async ({title}: ItemProps) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${title}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(AllProductDetails.pending, state => {
      state.isLoading = true;
      state.productData = [];
      state.error = '';
    });
    builder.addCase(AllProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productData = action.payload.products;
      state.error = '';
    });
  },
});

export default productSlice.reducer;
