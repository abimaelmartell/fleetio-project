class SearchVehicleService
  class NotFoundError < StandardError; end
  class MultipleEntriesError < StandardError; end

  def self.search(vehicle_vin)
    response = FleetioApi::Vehicle.find_vehicles_by_vin(vehicle_vin)

    unless response.success?
      raise NotFoundError
    end

    if response.count === 0
      raise NotFoundError
    elsif response.count < 1
      raise MultipleEntriesError
    end

    vehicle_entry = response[0]

    Vehicle.create!(
      vin: vehicle_entry['vin'],
      model: vehicle_entry['model'],
      make: vehicle_entry['make'],
      year: vehicle_entry['year'],

      fleetio_id: vehicle_entry['id'],
      fleetio_response: vehicle_entry
    )
  end
end
