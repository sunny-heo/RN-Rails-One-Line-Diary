Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do 
    namespace :v1 do
      resource :session, only: [ :create, :destroy ]
      resources :users, only: [:create]
    end
  end
end
