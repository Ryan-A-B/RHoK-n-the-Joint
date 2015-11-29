ENV['RACK_ENV'] = 'test'

require 'test/unit'
require 'rack/test'

require_relative '../app'

class ResponsesTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_it_diagnosis_inflammatory_for_possible_ra
    json = '{"questions":[
      {"id":1,"description":"Age","answers":[{"id":null,"value":15}]},
      {"id":2,"description":"Sex","answers":[{"id":2,"value":"male"}]},
      {"id":3,"description":"Onset of symptoms","answers":[{"id":2,"value":"> 1 Month"}]},
      {"id":4,"description":"Regularity of symptoms","answers":[{"id":2,"value":"Intermittent"}]},
      {"id":5,"description":"Morning pain or stiffness","answers":[{"id":4,"value":"> 60 mins"}]},
      {"id":6,"description":"Articulations of the upper limb","answers":[{"id":2,"value":"Radio ulnar articulations"},{"id":3,"value":"Carpometacarpal articulations"},{"id":5,"value":"Articulations of the digits"}]}
    ]}'

	  post '/responses', json

	  assert last_response.ok?
	  assert last_response.body.include?('Inflammatory')
	end

  def test_it_diagnosis_inflammatory_for_possible_oa
    json = '{"questions":[
      {"id":1,"description":"Age","answers":[{"id":null,"value":60}]},
      {"id":2,"description":"Sex","answers":[{"id":2,"value":"female"}]},
      {"id":3,"description":"Onset of symptoms","answers":[{"id":1,"value":"> 3 Months"}]},
      {"id":4,"description":"Regularity of symptoms","answers":[{"id":1,"value":"Persistent"}]},
      {"id":5,"description":"Morning pain or stiffness","answers":[{"id":1,"value":"< 30 mins"}]},
      {"id":6,"description":"Articulations of the upper limb","answers":[{"id":5,"value":"Articulations of the digits"}]}
    ]}'

	  post '/responses', json

	  assert last_response.ok?
	  assert last_response.body.include?('Inflammatory')
	end

	 def test_it_diagnosis_mechanical
    json = '{"questions":[
      {"id":1,"description":"Age","answers":[{"id":null,"value":15}]},
      {"id":2,"description":"Sex","answers":[{"id":2,"value":"male"}]},
      {"id":3,"description":"Onset of symptoms","answers":[{"id":2,"value":"> 1 Month"}]},
      {"id":4,"description":"Regularity of symptoms","answers":[{"id":2,"value":"Intermittent"}]},
      {"id":5,"description":"Morning pain or stiffness","answers":[{"id":4,"value":"> 60 mins"}]},
      {"id":6,"description":"Articulations of the upper limb","answers":[]}
    ]}'

	  post '/responses', json

	  assert last_response.ok?
	  assert last_response.body.include?('Mechanical')
	end
end
