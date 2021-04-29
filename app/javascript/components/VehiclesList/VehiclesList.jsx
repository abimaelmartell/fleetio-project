import React, { useCallback, useEffect, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { destroyVehicleById, fetchVehicles } from '../../state/actions';
import { getVehicles } from '../../state/selectors';

import Loading from '../Loading';
import trashIcon from './trash.svg';

const VehiclesList = () => {
  const dispatch = useDispatch();
  const { isLoading, records } = useSelector(getVehicles);

  const fetchVehiclesCallback = useCallback(
    () => dispatch(fetchVehicles())
  );

  useEffect(() => {
    fetchVehiclesCallback();
  }, []);

  const handleDeleteVehicle = (event, id) => {
    event.preventDefault();

    if (confirm('Are you sure you want to delete this vehicle?')) {
      dispatch(destroyVehicleById(id));
      fetchVehiclesCallback();
    }
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (records.length === 0) {
    return (
      <p>Not vehicles saved yet.</p>
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
            <div className='vehicle-details'>
              <span className='vehicle-title'>{ `${year} ${make} ${model}` }</span>
              <span className='vehicle-vin'>VIN: { vin }</span>
            </div>

            <button
              className='delete-vehicle-button'
              onClick={(event) => handleDeleteVehicle(event, id)}
            >
              <img src={trashIcon} />
            </button>
          </Link>
        ))
      }
    </div>
  );
};

export default VehiclesList;
