module EfficiencyCalculable
  extend ActiveSupport::Concern

  def calculate_efficiency!
    efficiency = FuelEfficiencyCalculator.calculate(self.fleetio_id)

    update!(
      efficiency_in_mpg: efficiency,
    )
  end
end
