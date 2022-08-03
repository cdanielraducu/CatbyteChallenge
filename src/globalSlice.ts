import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './models';

export interface GlobalState {
  users: User[];
}

const initialState: GlobalState = {
  users: [],
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users = [...state.users, action.payload];
    },
    removeUser(state, action: PayloadAction<User>) {
      state.users = state.users.filter(
        user => user.firstName !== action.payload.firstName,
      );
    },
  },
});

export const {addUser, removeUser} = globalSlice.actions;
export default globalSlice.reducer;
