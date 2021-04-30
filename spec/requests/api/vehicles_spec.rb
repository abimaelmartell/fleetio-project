require 'rails_helper'

RSpec.describe "api/Vehicles", type: :request do
  describe "GET /" do
    before do
      3.times do |i|
        Vehicle.create!(vin: i)
      end
    end

    it 'should get list of vehicles' do
      get api_vehicles_path

      expect(response.content_type).to include("application/json")
      expect(JSON.parse(response.body).count).to eq(3)
    end
  end

  describe 'GET /:id' do
    let (:vehicle) { Vehicle.create!(vin: '12341') }

    it 'should render vehicle JSON' do
      get api_vehicle_path(vehicle)
      expect(response.body).to eq(vehicle.to_json)
    end
  end

  describe 'DELETE /:id' do
    let! (:vehicle) { Vehicle.create!(vin: '12341') }

    it 'should render vehicle JSON' do
      expect {
        delete api_vehicle_path(vehicle)
      }.to change(Vehicle, :count)
    end
  end

  describe 'POST /search_by_vin' do
    let (:vin) { '123431' }
    let (:params) { { vehicle_vin: vin } }
    let (:headers) { { "ACCEPT" => "application/json" } }

    context 'with duplicate vin' do
      before do
        Vehicle.create!(vin: vin)
      end

      it 'should return error' do
        post search_by_vin_api_vehicles_path, params: params, headers: headers
        expect(response).to have_http_status(:bad_request)
      end
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

      before do
        expect(FleetioApi::Vehicle).to receive(:find_vehicles_by_vin).and_return(vehicle_response)
      end

      it 'should create vehicle' do
        expect {
          post search_by_vin_api_vehicles_path, params: params, headers: headers
        }.to change(Vehicle, :count).by(1)

        expect(response).to have_http_status(:ok)
      end
    end
  end
end
