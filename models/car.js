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
    year: {
      type: Number,
      required: true
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
