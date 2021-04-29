import React, { useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchVehicles } from '../../state/actions';
import { getVehicles } from '../../state/selectors';

import Loading from '../Loading';

const VehiclesList = () => {
  const dispatch = useDispatch();
  const { isLoading, records } = useSelector(getVehicles);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, []);

  if (isLoading) {
    return (
      <Loading />
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
            className='vehicle-element'
          >
            <span className='vehicle-title'>{ `${year} ${make} ${model}` }</span>
            <span className='vehicle-vin'>VIN: { vin }</span>
          </Link>
        ))
      }
    </div>
  );
};

export default VehiclesList;
