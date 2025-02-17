import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';



export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async () => {
        const response = await fetch('https://api.unsplash.com/photos?client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg');
        return response.json();
    }
);

const initialState = {
    images: []
};

const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(fetchPhotos.fulfilled, (state, action) => {
                state.images = action.payload;
            })
        }
    });

export default searchSlice.reducer;