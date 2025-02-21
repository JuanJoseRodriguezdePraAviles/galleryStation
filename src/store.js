import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './features/SearchSlice';
import favouriteSlice from './features/FavouritesSlice';

const store = configureStore({
    reducer: {
        search: searchSlice,
        favourite: favouriteSlice 
    }
});

export default store;