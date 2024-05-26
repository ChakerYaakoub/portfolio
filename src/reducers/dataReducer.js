
// Action Creator to fetch data and store in Redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Action Creator to fetch data and store in Redux
export const fetchDataAndStoreInRedux = createAsyncThunk(
    'data/fetchData',
    async () => {
        try {
            const db = getFirestore();
            const allData = {};
            const collections = ['userInfo', 'workspaceDescriptions', 'skills', 'workingPeriods', 'aboutUs', 'services', 'contactUs'];

            for (const collectionName of collections) {
                console.log(`Fetching data from collection '${collectionName}'...`);
                const collectionRef = collection(db, collectionName);
                const snapshot = await getDocs(collectionRef);
                const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                allData[collectionName] = data;
            }

            console.log('Data fetched:', allData);
            return allData;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; // Propagate the error
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataAndStoreInRedux.fulfilled, (state, action) => {
            return { ...state, ...action.payload };
        });
    },
});

export default dataSlice.reducer;
