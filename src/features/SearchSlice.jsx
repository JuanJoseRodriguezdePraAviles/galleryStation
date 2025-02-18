import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';



export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async () => {
        const response = await fetch('https://api.unsplash.com/photos?client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg');
        const data = await response.json();
        return data;
    }
);

export const searchPhotos = createAsyncThunk(
    'photos/searchPhotos',
    async (query) => {
        if (!query) {
            console.log("RANDOM");
            const response = await fetch(`https://api.unsplash.com/photos/random?count=10&client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg`);
            const data = await response.json();
            console.log(data);
            imagesCollected = data;
            console.log("images collected");
            console.log(imagesCollected);
            return imagesCollected;
        }
        console.log("Normal search");
        const imagesWanted = 5;
        let numImagesCollected = 0;
        let imagesCollected = [];
        let page = 1;
        while (numImagesCollected < imagesWanted) {
            const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg`);
            const data = await response.json();
            if (data.results.length > 0) {
                imagesCollected = data.results;
                numImagesCollected++;
            }
            page++;

            if (page > 10) {
                break;
            }
        }


        return imagesCollected;
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
            }).addCase(searchPhotos.fulfilled, (state, action) => {
                state.images = action.payload;
            });
        }

    });

export default searchSlice.reducer;