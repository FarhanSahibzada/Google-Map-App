import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Location from 'expo-location'

type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
};
type user = {
    name: string,
    email: string,
    uid : string,
}


const initialState: { Location: Region | undefined, User: user | null } = {
    Location: undefined,
    User: null
}

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        Setlocation: (state, action: PayloadAction<Region>) => {
            state.Location = action.payload
        },
        SetUser: (state, action: PayloadAction<user>) => {
            state.User = action.payload; 
        },
        Setlogout: (state) => {
            state.User = null;
        }
    }

})


export const { Setlocation  , SetUser , Setlogout} = locationSlice.actions

export default locationSlice.reducer