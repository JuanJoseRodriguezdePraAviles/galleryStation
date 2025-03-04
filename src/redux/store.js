import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './slices/SearchSlice';
import favouriteSlice from './slices/FavouritesSlice';

const store = configureStore({
    reducer: {
        search: searchSlice,
        favourite: favouriteSlice
    }
});

export default store;