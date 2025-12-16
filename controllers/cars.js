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
router.post('/', async (req, res) => {
  try {
    req.body.owner = req.session.user._id
    if (req.body.damaged) {
      req.body.damaged = true
    } else {
      req.body.damaged = false
    }
    await Car.create(req.body)
    res.redirect('/cars')
  } catch (err) {
    console.error(err)
  }
})
router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner')
    res.render('cars/show.ejs', { car })
  } catch (err) {
    console.error(err)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    const isOwner = car.owner.equals(req.session.user._id)

    if (isOwner) {
      await car.deleteOne()
      res.redirect('/cars')
    } else {
      throw new Error(`permission denied to ${req.session.user.username}`)
    }
  } catch (err) {
    console.error(err)
  }
})
router.get('/:id/edit', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
    res.render('cars/edit.ejs', { car })
  } catch (err) {
    console.error(err)
  }
})
router.put('/:id', async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.body)
    console.log(req.session.user)

    const car = await Car.findById(req.params.id)
    const isOwner = car.owner.equals(req.session.user._id)
    console.log('here 1')
    if (isOwner) {
      if (req.body.damaged) {
        req.body.damaged = true
      } else {
        req.body.damaged = false
      }
      await Car.updateOne({ _id: req.params.id }, req.body)
      res.redirect(`/cars/${req.params.id}`)
    }
  } catch (err) {
    console.error(err)
  }
})
module.exports = router
