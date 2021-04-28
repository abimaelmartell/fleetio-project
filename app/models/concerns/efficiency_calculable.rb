module EfficiencyCalculable
  extend ActiveSupport::Concern

  included do
    enum efficiency_calculation_status: {
      calculation_pending: 0,
      calculation_running: 1,
      calculation_complete: 2,
    }
  end

  def calculate_efficiency!
    self.calculation_running!

    efficiency = FuelEfficiencyCalculator.calculate(self.fleetio_id)

    update!(
      efficiency_calculation_status: :calculation_complete,
      efficiency_in_mpg: efficiency,
    )
  end
end
