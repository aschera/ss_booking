'use strict';

var mongoose = require('mongoose'),
  Car = mongoose.model('Car');

exports.list_all_cars = function(req, res) {
  Car.find({}, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};


exports.create_a_car = function(req, res) {
  var new_car = new Car(req.body);
  new_car.save(function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};


exports.read_a_car = function(req, res) {
  Car.findById(req.params.carId, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};


exports.update_a_car = function(req, res) {
  Car.findOneAndUpdate({_id: req.params.carId}, req.body, {new: true}, function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};


exports.delete_a_car = function(req, res) {
  Car.remove({
    _id: req.params.carId
  }, function(err, car) {
    if (err)
      res.send(err);
    res.json({ message: 'Car successfully deleted' });
  });
};
