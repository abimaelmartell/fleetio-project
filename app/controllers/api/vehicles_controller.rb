class Api::VehiclesController < ActionController::API
  def index
    render json: Vehicle.all
  end

  def search_by_vin
    if find_vehicle_by_vin
      render_error('VIN already exists')
    else
      render json: find_or_create_vehicle_by_vin
    end
  rescue SearchVehicleService::NotFoundError
    render_error('VIN not found on Fleetio API')
  rescue SearchVehicleService::MultipleEntriesError
    render_error('Multiple Entries Found')
  end

private
  def render_error(error)
    render json: { error: error }, status: :bad_request
  end

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
