import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {CATEGORIES_API} from '../constants/apis';

export type CategoryType = {};

type CatogoryDataType = {
  isLoading: boolean;
  categoryData: CategoryType[];
  error: string;
};

const initialCategoryState: CatogoryDataType = {
  isLoading: false,
  categoryData: [],
  error: '',
};

export const AllCategoryDetails = createAsyncThunk(
  'category/allcategories',
  async () => {
    try {
      const response = await fetch(CATEGORIES_API);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(AllCategoryDetails.pending, state => {
      state.isLoading = true;
      state.categoryData = [];
      state.error = '';
    });
    builder.addCase(AllCategoryDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categoryData = action.payload;
      state.error = '';
    });
  },
});

export default categorySlice.reducer;
