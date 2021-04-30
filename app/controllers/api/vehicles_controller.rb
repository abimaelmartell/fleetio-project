class Api::VehiclesController < ActionController::API
  before_action :find_vehicle, only: [:show, :destroy]
  def index
    render json: Vehicle.order(id: :desc).all
  end

  def show
    if @vehicle
      render json: @vehicle
    else
      render_error('Vehicle not found')
    end
  end

  def destroy
    @vehicle.delete

    head :no_content
  end

  def search_by_vin
    if find_vehicle_by_vin
      render_error('VIN already exists')
    else
      vehicle = find_or_create_vehicle_by_vin

      # delay fuel efficiency calculation
      vehicle.delay.calculate_efficiency!

      render json: vehicle
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
    params.require(:vehicle_vin)
  end

  def find_vehicle
    @vehicle ||= Vehicle.find_by_id(params[:id])
  end
end
