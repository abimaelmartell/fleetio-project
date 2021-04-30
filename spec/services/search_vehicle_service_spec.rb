require 'rails_helper'

RSpec.describe SearchVehicleService do
  let (:vin) { '123' }

  describe '##search' do
    before :each do
      expect(FleetioApi::Vehicle).to receive(:find_vehicles_by_vin).and_return(vehicle_response)
    end

    context 'with good data' do
      let (:vehicle_response) {[
        {
          'vin' => vin,
          'model' => 'Cargo',
          'make' => 'Ford',
          'year' => 2002,
          'id' => 12312
        }
      ]}

      it 'should create a vehicle entry' do
        expect {
          vehicle = SearchVehicleService.search(vin)
        }.to change(Vehicle, :count).by(1)
      end
    end

    context 'with no results' do
      let (:vehicle_response) { [] }

      it 'should create a vehicle entry' do
        expect {
          vehicle = SearchVehicleService.search(vin)
        }.to raise_error(SearchVehicleService::NotFoundError)
      end
    end
  end
end
