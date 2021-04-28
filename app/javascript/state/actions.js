import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await api.fetchVehicles();

    return response;
  }
);

export const createVehicleFromVim = createAsyncThunk(
  'vehicles/createVehicleFromVin',
  async (vin, { rejectWithValue }) => {
    try {
      return await api.createVehicleFromVim(vin);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
