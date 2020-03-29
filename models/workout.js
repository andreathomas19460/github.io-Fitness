'use strict';

const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now,
      unique: true
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: `Type of exercise is required.`
        },
        name: {
          type: String,
          trim: true,
          required: `Name of exercise is required.`
        },
        duration: {
          type: Number,
          required: `Duration of exercise (in minutes) is required.`
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

WorkoutSchema.virtual('totalDuration').get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model('workout', WorkoutSchema);

module.exports = Workout;