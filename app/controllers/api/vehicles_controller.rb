class Api::VehiclesController < ActionController::API
  def search_by_vin
    render json: find_or_create_vehicle_by_vin
  end

private

  def find_or_create_vehicle_by_vin
    find_vehicle_by_vin || create_vehicle_from_vin
  end

  def find_vehicle_by_vin
    Vehicle.find_by_vin(vehicle_vin)
  end

  def create_vehicle_from_vin
    SearchVehicleService.search(vehicle_vin)
  end

  def vehicle_vin
    params[:vehicle_vin]
  end
end
