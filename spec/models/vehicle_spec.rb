require 'rails_helper'

RSpec.describe Vehicle, type: :model do
  describe 'validations' do
    it { should validate_uniqueness_of(:vin) }
    it { should validate_uniqueness_of(:fleetio_id) }
  end

  describe '#calculate_efficiency!' do
    let (:vehicle) {
      Vehicle.create({
        vin: '123',
        model: '123',
        make: '123',
        year: '2002',
        fleetio_id: 1,
        fleetio_response: {}
      })
    }

    it 'should update efficiency and status' do
      expect(FuelEfficiencyCalculator).to receive(:calculate).and_return(10.10)
      expect(vehicle.efficiency_calculation_status).to eq('calculation_pending')

      expect {
        vehicle.calculate_efficiency!
      }.to change(
        vehicle, :efficiency_in_mpg
      ).to(10.10).and change(
        vehicle, :efficiency_calculation_status
      ).to('calculation_complete')
    end
  end
end
