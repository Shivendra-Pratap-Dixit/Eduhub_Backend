const mongoose=require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg'
    },
    duration: {
      type: Number,
      required: true
    },
    optedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },{
    versionKey:false
  });
  
  const Course = mongoose.model('Course', courseSchema);
  
  module.exports = Course;