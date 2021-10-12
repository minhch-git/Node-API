// import mongoose, { Schema } from "mongoose";

// NOT USE babel
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a course title"],
    },
    bootcamp: {
      type: Schema.Types.ObjectId,
      ref: "Bootcamp",
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    weeks: {
      type: String,
      required: [true, "Please add number of weeks"],
    },
    tuition: {
      type: Number,
      required: [true, "Please add a tuition cost"],
    },
    minimumSkill: {
      type: String,
      required: [true, "Please add minimum skill"],
      enum: ["beginner", "intermediate", "advanced"],
    },
    sholarshipAvailable: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Static method to age avg of course tuitions
CourseSchema.statics = {
  async getAverageCost(bootcampId) {
    const obj = await this.aggregate([
      { $match: { bootcamp: bootcampId } },

      {
        $group: {
          _id: '$bootcamp',
          averageCost: { $avg: '$tuition' }
        }
      }
    ])
    try {
      await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost: Math.ceil(obj[0].averageCost / 10) * 10
      })
    } catch (error) {
      console.log(error)
    }
  }
}
// Call getAverageCost after save 
CourseSchema.post('save', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

// Call getAverageCost before remove
CourseSchema.pre('remove', function () {
  this.constructor.getAverageCost(this.bootcamp)
})

const Course = mongoose.model("Course", CourseSchema);
// export default Course;

// NOT USE Babel
module.exports = Course;
