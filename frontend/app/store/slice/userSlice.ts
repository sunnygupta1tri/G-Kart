import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
	id: string | null;
	name: string;
	email: string;
	isLoggedIn: boolean;
}

const initialState: UserState = {
	id: null,
	name: '',
	email: '',
	isLoggedIn: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ id: string; name: string; email: string }>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.id = null;
			state.name = '';
			state.email = '';
			state.isLoggedIn = false;
		},
		

	},
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
