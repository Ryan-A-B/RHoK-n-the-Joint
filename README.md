# RHoK-n-the-Joint

## Setup
1. Install Ruby
2. Install Bundler (package manager for ruby) `gem install bundler` 
3. Install gems (ruby packages) using bundler `bundle install`
4. Start server with `shotgun app.rb`. Your server will now be listening on `http://localhost:9393`

## Sinatra

This project uses [Sinatra](http://www.sinatrarb.com), a micro framework for Ruby.

### Static assets 

Code that is in `./public` will automatically be served as static assets from the root path

`./public/example.html` will be served from `http://localhost:9393/example.html`

`./public/javascripts/app.js` will be served from `http://localhost:9393/javascripts/app.js`


## Example Answers
### Example Questionnaire Answers #1
```
{
  "questions":[
    {
      "id":"1",
      "description":"Age",
      "answers":[
        {"id":null, "value":"27"}
      ]
    },
    {
      "id":"2",
      "description":"Sex",
      "answers":[
        {"id":"1", "value":"female"}
      ]
    },
    {
      "id":"3",
      "description":"Onset of symptoms",
      "answers":[
        {"id":"1", "description":"< 1 month"}
      ]
    },
    {
      "id":"4",
      "description":"Regularity of symptoms",
      "answers":[
        {"id":"1", "description":"persistant"}
      ]
    },
    {
      "id":"5",
      "description":"Morning pain or stiffness",
      "answers":[]
    },
    {
      "id":"6",
      "description":"Articulations of the head, neck and cervical and thoracic spine",
      "answers":[]
    }
  ]
}
```

### Example Questionnaire Answers #2
```
{
  "questions":[
    {
      "id":"1",
      "description":"Age",
      "answers":[{"id":null, "value":"38"}]
    },
    {
      "id":"2",
      "description":"Sex",
      "answers":[
        {"id":"2", "value":"male"}
      ]
    },
    {
      "id":"3",
      "description":"Onset of symptoms",
      "answers":[
        {"id":"3", "description":"> 3 months"}
      ]
    },
    {
      "id":"4",
      "description":"Regularity of symptoms",
      "answers":[
        {"id":"1", "description":"intermittent"}
      ]
    },
    {
      "id":"5",
      "description":"Morning pain or stiffness",
      "answers":[
        {"id":"2", "value":"< 30mina"}
      ]
    },
    {
      "id":"6",
      "description":"Articulations of head, neck and cervical and thoracic spine",
      "answers":[
        {"id":"1", "value":"Articulations of the mandible"},
        {"id":"2", "value":"Articulations of the vertebral column with the cranium"},
        {"id":"3", "value":"Articulation of the atlas with the epistropheous or axis"},
        {"id":"4", "value":"Costoverbral articulations"}
      ]
    }
  ]
}
```

