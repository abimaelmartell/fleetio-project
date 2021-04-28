import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createVehicleFromVim, fetchVehicles } from '../../state/actions';
import { getCreateVehicle } from '../../state/selectors';

const VinForm = () => {
  const dispatch = useDispatch();
  const [vin, setVin] = useState('');
  const { isLoading, response, error } = useSelector(getCreateVehicle);

  const handleOnChange = (event) => {
    setVin(event.target.value);
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    dispatch(createVehicleFromVim(vin));
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
    </>
  );
};

export default VinForm;
