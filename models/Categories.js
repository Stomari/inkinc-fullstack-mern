const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  tag: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
