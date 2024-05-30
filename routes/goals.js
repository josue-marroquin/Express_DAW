var express = require('express');
var router = express.Router();

let goals = [{
  'id': 1,
  'name': 'Meta 1 - Generica',
  'description': 'Meta estatica de ejemplo.',
  'dueDate': '11-12-2024'
}];

// Modelo
const goalInit = mongoose.model('goals', 
  {
    name: String,
    description : String,
    dueDate: String
  },
  'goals'
)

/* GET home page. */
router.get('/getGoals', function(req, res, next) {
  taskInit.find({})
    .then((response)=> res.status(200).json(response))
    .catch((err)=> {res.status(500)});
  res.json(tasks);
  //  res.json(goals);
});

router.post('/addGoal', function(req, res, next) {
    let timestamp = Date.now()+Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const goal = new goalInit(req.body);
        goal.save().then(
          res.status(200).json({})
        ).catch((err)=> res.status(500).json({}));

      // req.body.id = timestamp.toString();
      // goals.push(req.body);
      // res.status(200).json(goals);
    } else {
      res.status(400).json('No se cumple con los parametros necesarios para guardar la meta.');
    }
  });

router.delete('/removeGoals/:id', function(req, res, next) {
    if(req.params && req.params.id){
      let id = req.params.id;
      goalInit.deleteOne({_id: new mongoose.Types.ObjectId(id)})
        .then((response) => {
          res.status(200).json(200);
        })
        .catch((err)=>{
          res.status(500);
        });

      // goals = goals.filter(goal => goal.id !== id);
      // res.status(200).json(goals);
    } else {
      res.status(400).json('Datos invalidos, no se ha eliminado la meta.');
    }
});

module.exports = router;
