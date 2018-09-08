Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'friend_requests/index'
      get 'friend_requests/create'
      get 'friend_requests/update'
      get 'friend_requests/destroy'
    end
  end
  resources :friend_requests
  namespace :api, defaults: { format: :json } do 
    namespace :v1 do
      resource :session, only: [ :create, :destroy ]
      resources :users, only: [:create]
      resources :diaries, shallow:true do 
        resources :daily_contents
      end
    end
  end
end
