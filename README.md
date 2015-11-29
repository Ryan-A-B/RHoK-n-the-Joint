# RHoK-n-the-Joint

[https://rhok-n-the-joint.herokuapp.com](https://rhok-n-the-joint.herokuapp.com)

## Setup
1. Install Ruby
2. Install Bundler (package manager for ruby) `gem install bundler`
3. Install gems (ruby packages) using bundler `bundle install`
4. Start server with `shotgun app.rb`. Your server will now be listening on `http://localhost:9393`

## Running under Docker
1. Install Docker! Guides for [Windows](http://docs.docker.com/windows/started/), [Mac](http://docs.docker.com/mac/started/) and [Linux](http://docs.docker.com/linux/started/)
2. Open a Docker command line, change to the project directory and run `docker build ./`
3. Once the image is built, run `docker run --rm -p 9393:9393 <container id>`
4. The application is now accessible on port 9393 on your Docker host.

## Sinatra

This project uses [Sinatra](http://www.sinatrarb.com), a micro framework for Ruby.

### Static files and assets

Code that is in `public/` will automatically be served as static assets from the root path

`public/example.html` will be served from `http://localhost:9393/example.html`

`public/js/app.js` will be served from `http://localhost:9393/js/app.js`

### Debugging

Insert `binding.pry` into your code and exection will stop here. You can then inspect the window running the server and interactively debug.

## Example Answers
### Example Questionnaire Answers #1

This request will return an inflammatory diagnosis.

```
{
  "questions":[
    {
      "id":1,
      "description":"Age",
      "answers":[
        {"id":null, "value":35}
      ]
    },
    {
      "id":2,
      "description":"Sex",
      "answers":[
        {"id":1, "value":"female"}
      ]
    },
    {
      "id":3,
      "description":"Onset of symptoms",
      "answers":[
        {"id":1, "value":"> 1 month"}
      ]
    },
    {
      "id":4,
      "description":"Regularity of symptoms",
      "answers":[
        {"id":1, "value":"intermittent"}
      ]
    },
    {
      "id":5,
      "description":"Morning pain or stiffness",
      "answers":[
        {"id":3, "value":"> 60 mins"}
      ]
    },
    {
      "id":6,
      "description":"Articulations of the upper limb",
      "answers":[
        {"id":1, "value":"Elbow joint articulations"},
        {"id":2, "value":"Radio ulnar articulations"},
        {"id":3, "value":"Carpometacarpal articulations"},
        {"id":4, "value":"Metacarpophalangeal articulations"},
        {"id":5, "value":"Articulations of the digits"}
      ]
    }
  ]
}
```

### Example Questionnaire Answers #2

This request will return an inflammatory diagnosis.

```
{
  "questions":[
    {
      "id":1,
      "description":"Age",
      "answers":[
        {"id":null, "value":55}
      ]
    },
    {
      "id":2,
      "description":"Sex",
      "answers":[
        {"id":1, "value":"male"}
      ]
    },
    {
      "id":3,
      "description":"Onset of symptoms",
      "answers":[
        {"id":1, "value":"> 3 months"}
      ]
    },
    {
      "id":4,
      "description":"Regularity of symptoms",
      "answers":[
        {"id":1, "value":"persistant"}
      ]
    },
    {
      "id":5,
      "description":"Morning pain or stiffness",
      "answers":[
        {"id":3, "value":"< 30 mins"}
      ]
    },
    {
      "id":6,
      "description":"Articulations of the upper limb",
      "answers":[
        {"id":5, "value":"Articulations of the digits"}
      ]
    }
  ]
}
```


### Example Questionnaire Answers #3

This request will return an mechanical diagnosis.

```
{
  "questions":[
    {
      "id":1,
      "description":"Age",
      "answers":[
        {"id":null, "value":28}
      ]
    },
    {
      "id":2,
      "description":"Sex",
      "answers":[
        {"id":1, "value":"female"}
      ]
    },
    {
      "id":3,
      "description":"Onset of symptoms",
      "answers":[
        {"id":1, "value":"> 1 month"}
      ]
    },
    {
      "id":4,
      "description":"Regularity of symptoms",
      "answers":[
        {"id":1, "value":"intermittent"}
      ]
    },
    {
      "id":5,
      "description":"Morning pain or stiffness",
      "answers":[
        {"id":3, "value":"> 60 mins"}
      ]
    },
    {
      "id":6,
      "description":"Articulations of the upper limb",
      "answers":[]
    }
  ]
}
```
