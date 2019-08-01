const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // User
  email: String,
  password: String,
  name: { type: String, require: true },
  role: { type: String, enum: ['User', 'Artist'] },
  profileImg: String,
  tattooRef: [{
    name: String,
    image: [{ type: Schema.Types.ObjectId, ref: 'Tattoo' }],
  }],
  favoriteArtist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  about: String,
  // Artist
  workplace: [{ type: Schema.Types.ObjectId, ref: 'Studio' }],
  flash: [{
    name: String,
    price: String,
    image: String,
    hidden: Boolean,
  }],
  artistTattoo: [{ type: Schema.Types.ObjectId, ref: 'Tattoo' }],
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
