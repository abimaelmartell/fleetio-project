class FleetioApi::Vehicle < FleetioApi::Request
  BASE_ENDPOINT = "vehicles".freeze

  def self.find_vehicles_by_vin(vehicle_vin)
    get_request(
      "#{BASE_ENDPOINT}",
      q: {
        vin_eq: vehicle_vin,
      }
    )
  end

  def self.get_vehicle_fuel_entries(vehicle_id)
    get_request(
      "#{BASE_ENDPOINT}/#{vehicle_id}/fuel_entries",
    )
  end
end
