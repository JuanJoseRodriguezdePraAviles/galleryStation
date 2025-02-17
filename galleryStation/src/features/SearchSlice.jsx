import { createSlice } from '@reduxjs/toolkit';
const initialState = {};

export const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {
            listAll: (state) => {
                
                state.items = [];
            }
        }
    });

const { listAll } = searchSlice.actions;
export default searchSlice.reducer;