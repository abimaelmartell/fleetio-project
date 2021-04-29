class Vehicle < ApplicationRecord
  include EfficiencyCalculable

  validates :vin, uniqueness: true
  validates :fleetio_id, uniqueness: true
end
