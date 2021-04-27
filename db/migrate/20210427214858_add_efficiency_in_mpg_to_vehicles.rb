class AddEfficiencyInMpgToVehicles < ActiveRecord::Migration[6.1]
  def change
    add_column :vehicles, :efficiency_in_mpg, :float, precision: 2
  end
end
