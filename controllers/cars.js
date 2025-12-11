const express = require('express')
const router = express.Router()
const Car = require('../models/car')

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().populate('owner')
    res.render('cars/index.ejs', { cars })
  } catch (error) {
    console.error(error)
  }
})
router.get('/new', async (req, res) => {
  try {
    res.render('cars/new.ejs')
  } catch (err) {
    console.error(err)
  }
})
router.post('/',async(req,res)=>{
  try {
    req.body.owner = req.session.user._id
    await Car.create(req.body)
    res.redirect('/cars')
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
