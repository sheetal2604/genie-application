import {configureStore} from '@reduxjs/toolkit';
import category from './categorySlice';
import product from './productSlice';

export const appStore = configureStore({
  reducer: {
    category: category,
    product: product,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch;
