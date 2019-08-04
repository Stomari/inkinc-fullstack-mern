const mongoose = require('mongoose');
const { Schema } = mongoose;

const flashSchema = new Schema({
  tag: [String],
  image: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  artist: { type: Schema.Types.ObjectId, ref: 'User' },
  price: String,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Flash = mongoose.model('Flash', flashSchema);
module.exports = Flash;
