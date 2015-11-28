
require 'sinatra'

get '/' do
  'Hello world!'
end


post '/echo' do
  request.body.read
end
