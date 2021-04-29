class FuelEfficiencyCalculator
  def self.calculate(vehicle_id)
    fuel_entries = FleetioApi::Vehicle.get_vehicle_fuel_entries(vehicle_id)

    total_miles = 0
    total_gals = 0

    fuel_entries.each do |entry|
      total_gals += entry['us_gallons'].to_f
      total_miles += entry['usage_in_mi'].to_f
    end

    if total_gals == 0 || total_miles == 0
      0
    else
      (total_miles / total_gals).round(2)
    end
  end
end
