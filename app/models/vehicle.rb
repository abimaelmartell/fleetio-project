class Vehicle < ApplicationRecord
  include EfficiencyCalculable

  validates :vin, uniqueness: true, presence: true
  validates :fleetio_id, uniqueness: true, allow_blank: true
end
