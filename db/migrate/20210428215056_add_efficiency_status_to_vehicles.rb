class AddEfficiencyStatusToVehicles < ActiveRecord::Migration[6.1]
  def change
    add_column :vehicles, :efficiency_calculation_status, :integer, default: 0
  end
end
