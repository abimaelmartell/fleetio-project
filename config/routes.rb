Rails.application.routes.draw do
  root to: 'home#home'

  namespace 'api' do
    resources 'vehicles', only: [:show, :index] do
      get 'search_by_vin/:vehicle_vin', {
        to: 'vehicles#search_by_vin',
        on: :collection,
        as: :search_by_vin
      }
    end
  end
end
