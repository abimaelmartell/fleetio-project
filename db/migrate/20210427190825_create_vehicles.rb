class CreateVehicles < ActiveRecord::Migration[6.1]
  def change
    create_table :vehicles do |t|
      t.string :vin

      t.string :year
      t.string :make
      t.string :model

      t.integer :fleetio_id
      t.json :fleetio_response

      t.timestamps
    end
  end
end
