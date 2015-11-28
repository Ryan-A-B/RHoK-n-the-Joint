require 'sinatra'

require 'json'
require 'pry'

post '/answers' do
  response = JSON.parse request.body.read
  response.to_s
end

##### Example routes #####

# http://localhost:9393/
# returns the string 'Hello world!'
get '/' do
  'Hello world!'
end

# POST http://localhost:9393/echo
# returns the body of the post request
post '/echo' do
  request.body.read
end

# http://localhost:9393/hi/john
# sets the instance variable @name from the parameter in the url
# then renders the using the template at `views/hi`
get '/hi/:name' do
  @name = params[:name]
  erb :hi
end

