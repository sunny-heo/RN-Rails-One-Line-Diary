Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do 
    namespace :v1 do
      resource :session, only: [ :create, :destroy ]
      resources :users, only: [:create]
      resources :diaries, shallow:true do 
        resources :daily_contents
      end
      resources :friends, only: [:index, :destroy]
      resources :friend_requests, only: [:index, :create, :update, :destroy]

      get '/search/:user', to: 'search#user', :as => 'search'
    end
  end
end
