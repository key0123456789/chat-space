Rails.application.routes.draw do
  devise_for :users
 root 'groups#index'
 resources :users, only: [:index, :edit, :update] do
    get :search, on: :collection
    end
 resources :groups, only: [:new, :edit, :create, :update, :index] do
  resources :messages, only: [:index, :create]

  namespace :api do
    resources :messages, only: :index, defaults: { format: 'json' }
    end
  end
end
 