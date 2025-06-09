import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import todoReducer from '../features/todo/todoslice';
import userReducer from '../features/user/userSlice'; // <-- Make sure this line is present

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todoReducer,
    user: userReducer, // <-- This is correct
  },
});