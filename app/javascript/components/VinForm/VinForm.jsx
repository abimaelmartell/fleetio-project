import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { createVehicleFromVim } from '../../state/actions';
import { getCreateVehicle } from '../../state/selectors';

import Loading from '../Loading';

const VinForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [vin, setVin] = useState('');
  const { isLoading, error } = useSelector(getCreateVehicle);

  const handleOnChange = (event) => {
    setVin(event.target.value);
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const response = await dispatch(createVehicleFromVim(vin));

    if (response?.payload?.id) {
      const id = response?.payload?.id;
      history.push(`/vehicle/${id}`);
    }
  };

  return (
    <>
      <form className="vehicle-vin-form" onSubmit={handleOnSubmit}>
        <input
          placeholder="Enter Vehicle VIN..."
          value={vin}
          onChange={handleOnChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
        >
          Search!
        </button>
      </form>

      { error && <p className="error-message">There was an error while processing the request: { error }</p> }

      { isLoading && <Loading /> }
    </>
  );
};

export default VinForm;
