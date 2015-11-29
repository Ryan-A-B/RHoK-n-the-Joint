require 'sinatra'

require 'json'
require 'pry'

require_relative 'lib/response'
require_relative 'lib/symptom_checker'

get '/' do
  redirect '/index.html'
end

post '/responses' do
  response = Response.new(JSON.parse request.body.read)

  if SymptomChecker.new(response).find_symptoms
    '{
        type: "Inflammatory",
        strains: [
          {url:"https://www.google.com", name: "Rheumatoid Arthritis"},
          {url:"https://www.google.com", name: "Psoriatic Arthritis"},
          {url:"https://www.google.com", name: "Fibromyalgia"}
        ]
    }'
  else
    '{
        type: "Mechanical",
        strains: [
          {url:"https://www.google.com", name: "Rheumatoid Arthritis"},
          {url:"https://www.google.com", name: "Psoriatic Arthritis"},
          {url:"https://www.google.com", name: "Fibromyalgia"}
        ]
    }'
  end

end

##### Example routes #####
# http://localhost:9393/
# returns the string 'Hello world!'
#get '/' do
#  'Hello world!'
#end

get '/login' do
  erb :login
end

post '/login' do
  redirect '/index.html'
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

