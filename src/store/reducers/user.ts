import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string | null;
  email: string | null;
}

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: null,
    email: null,
  },
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    resetUser: state => {
      state.user = {
        id: null,
        email: null,
      };
    },
  },
});

export const { setUser, resetUser } = user.actions;

export default user.reducer;
