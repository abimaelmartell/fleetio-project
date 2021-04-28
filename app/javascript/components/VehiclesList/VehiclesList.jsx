import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchVehicles } from '../../state/actions';
import { getVehicles } from '../../state/selectors';

const VehiclesList = () => {
  const dispatch = useDispatch();
  const { isLoading, records } = useSelector(getVehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  if (isLoading) {
    return (
      <h2>Loading...</h2>
    );
  }

  return (
    <div>
      <h2>Saved Vehicles</h2>
      {
        records.map(({ id, model, make, year, vin }) => (
          <Link
            key={id}
            to={`/vehicle/${id}`}
          >
            <h3>{ `${year} ${make} ${model} ${vin}` }</h3>
          </Link>
        ))
      }
    </div>
  );
};

export default VehiclesList;
