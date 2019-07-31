const mongoose = require('mongoose');
const { Schema } = mongoose;

const tattooSchema = new Schema({
  tag: [String],
  image: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  artist: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Tattoo = mongoose.model('Tattoo', tattooSchema);
module.exports = Tattoo;
