import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, thunkAPI) => {
  try {
    const res = await axios.get('/service/todo/get_all', {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
      }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Add todo
export const addTodo = createAsyncThunk('todos/addTodo', async (todo, thunkAPI) => {
  try {
    const res = await axios.post('/service/todo/add_todo', todo, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
      }
    });
    return res.data.newTodo; // Make sure your backend returns { newTodo: ... }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Update todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async ({ id, updates }, thunkAPI) => {
  try {
    const res = await axios.patch(`/service/todo/update_todo/${id}`, updates, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token || ''}`
      }
    });
    return res.data.updatedTodo;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Delete todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id, thunkAPI) => {
  try {
    await axios.delete(`/service/todo/delete_todo/${id}`);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const idx = state.items.findIndex(todo => todo._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo._id !== action.payload);
      });
  },
});

export default todoSlice.reducer;