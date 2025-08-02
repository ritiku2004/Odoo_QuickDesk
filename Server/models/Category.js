const mongoose = require('mongoose');
// ...existing code...
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;