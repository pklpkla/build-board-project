var mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {type:Date, default:Date.now}
    
});

module.exports = mongoose.model('Blog', BlogSchema);