Rails.application.routes.draw do
  devise_for :users
 root to: 'messages#index'
 resources :users, only: [:edit, :update]
 resources :groups, only: [:new, :edit, :create, :update] 
  # resources :messages, only: [:index, :create]
 
end
 