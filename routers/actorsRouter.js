const router = require("express").Router();
const e = require("express");
const Actor = require('../data/data-model.js');

router.get('/', (req, res) => {
  
  Actor.findActor().then(actors => { 
    res.status(200).json(actors);
  }).catch(error => {
    next({
      statusCode: 500,
      errorMessage: "An error occurred while retrieving data.",
      error,
    })
  })
})

router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  
  Actor.findAnActor(Number(id)).then(actor => {
    if(!actor){
      next({
        statusCode: 404,
        errorMessage: "The actor that you are looking for doesn't exist."
      })
    } else {
      res.status(200).json(actor)
    }
  }).catch(error => {
    next({
      statusCode: 502,
      errorMessage: "Server error occurred while retrieving data.",
      error
    })
  })

})

router.post('/', (req, res) => {
  const newActor = req.body;

  if(!newActor.name){
    next({
      statusCode: 400,
      errorMessage: "You should enter the name of the actor."
    })
  }else {
    Actor.addActor(newActor).then( (added) => {
      res.status(201).json(added)
    }).catch(error => {
      next({
        statusCode: 500,
        error
      })
    })
  }

})

router.patch("/:id", (req, res, next) => {
  const { id } = req.params;
  const updatedActor = req.body;
  
  if(!updatedActor.name){
    next({
      statusCode: 400,
      errorMessage: "Actor name area have to be filled."
    })
  } else {
    Actor.updateActor(updatedActor, id).then(updated => {
      if(!updated){
        next({
          statusCode: 404,
          errorMessage: "The actor that you are trying to update doesn't exist."
        })
      } else {
        res.status(200).json(updated)
      }
    }).catch(error => {
      next({
        statusCode: 500,
        errorMessage: "Server error while updating actor.",
        error
      })
    })
  }
})

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Actor.deleteActor(id).then(deleted => {
    if(!deleted){
      next({
        statusCode: 400,
        errorMessage: "The actor that you're trying to delete doesn't available."
      })
    } else{
      res.status(200).send("Successfully deleted. (id: " + id + ")" );
    }
  }).catch(error => {
    next({
      statusCode: 500,
      errorMessage: "Server error while deleting an actor.",
      error: error
    })
  })
})

router.put('/:id', (req, res) =>{
  const id = req.params.id;
  const actor = data.find(actor => actor.id === Number(id))

  if(actor){
    actor.name = req.body.name;
    actor.movies = req.body.movies;
    res.status(200).json(actor)
  }else{
    res.status(404).json({ errorMessage: "The actor that you are trying to update doesn't exist."})
  }
})


module.exports = router;