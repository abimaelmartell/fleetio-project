import { createReducer } from '@reduxjs/toolkit';
import { fetchVehicles, createVehicleFromVim } from './actions';

const initialState = {
  vehicles: {
    records: [],
    isLoading: false,
  },

  createVehicle: {
    record: null,
    isLoading: false,
    error: null,
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
        error: null,
      }
    }))
    .addCase(createVehicleFromVim.rejected, (state, action) => ({
      ...state,
      createVehicle: {
        ...state.createVehicle,
        isLoading: false,
        error: action.payload?.error || action.payload || 'Server error, please try again later',
      }
    }))
    .addCase(createVehicleFromVim.fulfilled, (state, action) => ({
      ...state,
      createVehicle: {
        ...state.createVehicle,
        isLoading: false,
        response: action.payload,
      }
    }))
  );

export default vehiclesReducer;
