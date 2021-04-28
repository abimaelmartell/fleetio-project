import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

export const fetchVehicles = createAsyncThunk(
  'vehicles/fetchVehicles',
  async () => {
    const response = await api.fetchVehicles();

    return response;
  },
);

export const createVehicleFromVim = createAsyncThunk(
  'vehicles/createVehicleFromVin',
  async (vin, { rejectWithValue }) => {
    try {
      return await api.createVehicleFromVim(vin);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const fetchVehicleById = createAsyncThunk(
  'vehicles/fetchVehicleById',
  async (id, { rejectWithValue }) => {
    try {
      return await api.fetchVehicleById(id);
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
