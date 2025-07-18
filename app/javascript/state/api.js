export const fetchVehicles = async () => {
  const response = await fetch('/api/vehicles');
  return await response.json();
};

export const fetchVehicleById = async (id) => {
  const response = await fetch(`/api/vehicles/${id}`);
  const json = await response.json();

  return response.ok ? json : Promise.reject(json);
};

export const createVehicleFromVim = async (vehicleVin) => {
  const response = await fetch('/api/vehicles/search_by_vin', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ vehicle_vin: vehicleVin }),
  });

  try {
    const json = await response.json();

    return response.ok ? json : Promise.reject(json);
  } catch {
    return Promise.reject('Internal Server Error');
  }
};

export const destroyVehicleById = async (id) => {
  return await fetch(`/api/vehicles/${id}`, {
    method: 'delete',
  });
}
