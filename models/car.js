const mongoose = require('mongoose')
const carSchema = new mongoose.Schema(
  {
    country:{
    type:String,
    required:true
    },
    name: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    damaged: {
      type: Boolean,
      required: true,
      default: false
    },
    description:{
      type: String
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)
const Car = mongoose.model('Car', carSchema)

module.exports = Car
