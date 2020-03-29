  
const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/api/workout", (req, res) => {
    Workout.create({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});


router.put("/api/workouts/:id", ({ body, params }, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {

  Workout.find()

    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get("/api/workouts/range", ({ query }, res) => {
  Workout.find({ day: { $gte: query.start, $lte: query.end }})
//$gte is greater than; $lte is less than.
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


router.post("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/stats.html"));
});
module.exports = router;