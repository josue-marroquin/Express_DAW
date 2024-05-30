var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//     Metodo original, Tarea Inicial - Sin DB
let tasks = [{
  'id': 1,
  'name': 'Task 1 - Generica',
  'description': 'Tarea estatica de ejemplo.',
  'dueDate': '31-12-2024'
}];

// Modelo
// nombre-tabla, tipos de valores, nombre-real-tabla
const taskInit = mongoose.model('tasks', 
  {
    name: String,
    description : String,
    dueDate: String
  },
  'tasks'
)

router.get('/getTasks', function(req, res, next) {
  taskInit.find({})
    .then((response)=> res.status(200).json(response))
    .catch((err)=> {res.status(500)});
  res.json(tasks);
});

router.post('/addTask', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
      const task = new taskInit(req.body);
      task.save().then(
        res.status(200).json({})
      ).catch((err)=> res.status(500).json({}));
      //    Metodo anterior - Sin DB
      // req.body.id = timestamp.toString(); 
      // tasks.push(req.body);
      // res.status(200).json(tasks);
    } else {
      res.status(400).json('No se cumple con los parametros necesarios para guardar la tarea.');
    }
  });

router.delete('/removeTask/:id', function(req, res, next) {
    console.log(req.params);
    if(req.params && req.params.id){
      let id = req.params.id;
      // Mongoose Query para borrar
      taskInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
        .then((response) => {
          res.status(200).json(200);
        })
        .catch((err)=>{
          res.status(500);
        });
      // Metodo anterior / Sin DB
      // tasks = tasks.filter(task => task.id !== id);
      // res.status(200).json(tasks);
    } else {
      res.status(400).json('Datos invalidos, no se ha eliminado la tarea.');
    }
});

module.exports = router;
