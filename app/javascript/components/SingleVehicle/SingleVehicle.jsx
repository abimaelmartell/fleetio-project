import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { fetchVehicleById } from '../../state/actions';
import { getSingleVehicle } from '../../state/selectors';

const VehiclesList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { isLoading, record, error } = useSelector(getSingleVehicle);

  useEffect(() => {
    dispatch(fetchVehicleById(id));
  }, []);

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }

  if (error) {
    return (
      <h2>There was an error while loading: { error }</h2>
    );
  }

  const fuelEfficiency = () => {
    if (record.efficiency_calculation_status !== 'calculation_complete') {
      return 'We are calculating fuel efficiency, please wait and reload later...';
    }

    return `${ record.efficiency_in_mpg } mpg`;
  };

  return (
    <div>
      <h2>{ `${record.year} ${record.make} ${record.model}` }</h2>
      <h3>VIN: { record.vin }</h3>
      <h4>Fuel Efficiency: { fuelEfficiency() } </h4>
    </div>
  );
};

export default VehiclesList;
