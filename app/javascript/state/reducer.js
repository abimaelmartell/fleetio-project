import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicles, createVehicleFromVim } from './actions';

const initialState = {
  vehicles: {
    records: [],
    isLoading: false,
  },

  createVehicle: {
    vin: '',
    record: null,
    isLoading: false,
    error: '',
  }
};

const vehiclesReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(fetchVehicles.pending, (state) => ({
      ...state,
      vehicles: {
        ...state.vehicles,
        isLoading: true,
      }
    }))
    .addCase(fetchVehicles.fulfilled, (state, action) => ({
      ...state,
      vehicles: {
        ...state.vehicles,
        isLoading: false,
        records: action.payload,
      }
    }))

    .addCase(createVehicleFromVim.pending, (state) => ({
      ...state,
      createVehicle: {
        ...state.createVehicle,
        isLoading: true,
      }
    }))
    .addCase(createVehicleFromVim.fulfilled, (state, action) => ({
      ...state,
      createVehicle: {
        ...state.createVehicle,
        isLoading: false,
        records: action.payload,
      }
    }))
  );

export default vehiclesReducer;
