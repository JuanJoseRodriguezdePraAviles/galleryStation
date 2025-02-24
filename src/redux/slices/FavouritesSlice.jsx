import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    images: []
}

const favouritesSlice = createSlice(
    {
        name: 'favourite',
        initialState,
        reducers: {
            setFavouritePhotos: (state, action) => {
                state.images = [...action.payload];
            }
        }

    }
);

export const { setFavouritePhotos } = favouritesSlice.actions;
export default favouritesSlice.reducer;