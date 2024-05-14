var express = require('express');
var router = express.Router();

let tasks = [{
  'id': 1,
  'name': 'Task 1 - Generica',
  'description': 'Tarea estatica de ejemplo.',
  'dueDate': '31-12-2024'
}];

router.get('/getTasks', function(req, res, next) {
  res.json(tasks);
});

router.post('/addTask', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
      req.body.id = timestamp.toString(); 
      tasks.push(req.body);
      res.status(200).json(tasks);
    } else {
      res.status(400).json('No se cumple con los parametros necesarios para guardar la tarea.');
    }
  });

router.delete('/removeTask/:id', function(req, res, next) {
    console.log(req.params);
    if(req.params && req.params.id){
      let id = req.params.id;
      tasks = tasks.filter(task => task.id !== id);
      res.status(200).json(tasks);
    } else {
      res.status(400).json('Datos invalidos, no se ha eliminado la tarea.');
    }
});

module.exports = router;
