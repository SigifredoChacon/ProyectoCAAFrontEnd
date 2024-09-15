import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    CedulaCarnet: number;
    Nombre: string;
    CorreoEmail: string;
    CorreoInstitucional: string;
    Telefono: string;
    Telefono2: string;
    Direccion: string;
    idRol: number;
}

export interface UsersState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    users: [],
    loading: false,
    error: null,
};

// Funciones asincrónicas (thunks) para el CRUD
export const fetchUsers = createAsyncThunk<User[]>('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:3000/users'); // Asegúrate de que esta URL sea la correcta para tu API
    return response.data;
});

export const addUser = createAsyncThunk<User, User>('users/addUser', async (newUser) => {
    const response = await axios.post('http://localhost:3000/users', newUser);
    return response.data;
});

export const updateUser = createAsyncThunk<User, User>('users/updateUser', async (updatedUser) => {
    const response = await axios.patch(`http://localhost:3000/users/${updatedUser.CedulaCarnet}`, updatedUser);
    return response.data;
});

export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    return id;
});

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Fetch Users
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'An unexpected error occurred';  // Asegura que no sea undefined
        });

        // Add User
        builder.addCase(addUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'An unexpected error occurred';  // Asegura que no sea undefined
        });

        // Update User
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.users.findIndex(user => user.CedulaCarnet === action.payload.CedulaCarnet);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'An unexpected error occurred';  // Asegura que no sea undefined
        });

        // Delete User
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = state.users.filter(user => user.CedulaCarnet !== action.meta.arg);
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'An unexpected error occurred';  // Asegura que no sea undefined
        });
    },
});

export default usersSlice.reducer;
