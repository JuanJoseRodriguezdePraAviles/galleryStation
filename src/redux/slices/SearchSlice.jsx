import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';




export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async (page) => {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&count=9&client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg`);
        const data = await response.json();
        
        return {data, page };
    }
);

export const searchRandomPhotos = createAsyncThunk(
    'photos/searchRandomPhotos',
    async () => {
        const response = await fetch(`https://api.unsplash.com/photos/random?count=10&client_id=xaxF1z4wfbKSSMAbo4Qv0klSKZA58aY2wrARcNnuIBg`);
        const data = await response.json();
        return data;
    }
);

export const searchPhotos = createAsyncThunk(
    'photos/searchPhotos',
    async (query) => {
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
    data: [],
    page: 1
};

const searchSlice = createSlice(
    {
        name: 'search',
        initialState,
        reducers: {
            incrementPage: (state) => {
                state.page += 1;
            }
        },
        extraReducers: (builder) => {
            
            builder.addCase(fetchPhotos.fulfilled, (state, action) => {
                const newImages = action.payload.data;
                if(action.payload.page === 1) {
                    state.images = action.payload.data;
                } else {
                    const currentImagesIds = new Set(state.images.map(img => img.id));
                    const uniqueNewImages = newImages.filter(img => !currentImagesIds.has(img.id));
                    
                    state.images.push(...uniqueNewImages);
                    
                }
            }).addCase(searchPhotos.fulfilled, (state, action) => {
                state.images = action.payload;
            }).addCase(searchRandomPhotos.fulfilled, (state, action) => {
                state.images = action.payload;
            });
        }
    });

export const { incrementPage } = searchSlice.actions;   
export default searchSlice.reducer;