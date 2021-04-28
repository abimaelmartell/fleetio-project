import React from 'react';

import VehiclesList from '../VehiclesList';
import VinForm from '../VinForm';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Fleetio Fuel Entries</h1>

      <VinForm />

      <VehiclesList/>
    </div>
  );
};

export default Home;
