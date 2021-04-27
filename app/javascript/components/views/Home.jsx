import React from 'react';

const Home = () => (
  <div className="home-container">
    <h1>Fleetio Fuel Entries</h1>
    <form className="vehicle-vin-form">
      <input
        placeholder="Enter Vehicle VIN..."
      />
      <button type="submit">
        Search!
      </button>
    </form>
  </div>
);

export default Home;
