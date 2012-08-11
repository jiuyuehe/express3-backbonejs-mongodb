var mongoose = require('mongoose'),
    Schema =  mongoose.Schema;

console.log('mongoose thing model');

var ThingSchema = new Schema({
    title    :   String,
    body :   String,
    date  :   {type: Date, default: Date.now}
});

module.exports = mongoose.model('Thing', ThingSchema);