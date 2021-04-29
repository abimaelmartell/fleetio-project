require 'rails_helper'

RSpec.describe FuelEfficiencyCalculator do
  let (:vehicle_id) { 123 }
  describe '##calculate' do
    before :each do
      expect(FleetioApi::Vehicle).to receive(:get_vehicle_fuel_entries).and_return(entries)
    end

    context 'with good data' do
      let (:entries) {[
        {
          'us_gallons' =>  10,
          'usage_in_mi' => 10
        },
        {
          'us_gallons' =>  10,
          'usage_in_mi' => 20
        }
      ]}

      it 'should calculate avg fuel efficiency from api data' do
        efficiency = FuelEfficiencyCalculator.calculate(vehicle_id)

        expect(efficiency).to eq(1.5) # result from example
      end
    end

    context 'with no data' do
      let (:entries) { [] }
      it 'shoudl return zero' do
        efficiency = FuelEfficiencyCalculator.calculate(vehicle_id)

        expect(efficiency).to eq(0)
      end
    end
  end
end
