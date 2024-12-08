import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as Location from 'expo-location'

type Region = {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };



const initialState : { Location : Region | undefined } ={
    Location : undefined 
}

const locationSlice  = createSlice({
    name : 'location' ,
    initialState,
    reducers :{
        Setlocation : (state , action : PayloadAction<Region>)=>{
           state.Location =  action.payload
        },
    }

})


export const { Setlocation  } = locationSlice.actions

export default locationSlice.reducer