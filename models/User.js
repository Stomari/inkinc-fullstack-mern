const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  // User
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  role: { type: String, enum: ['User', 'Artist'] },
  profileImg: String,
  folder: [{ type: Schema.Types.ObjectId, ref: 'Folder' }],
  favoriteArtist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  // Artist
  about: String,
  workplace: [],
  flash: [{ type: Schema.Types.ObjectId, ref: 'Flash' }],
  artistTattoo: [{ type: Schema.Types.ObjectId, ref: 'Tattoo' }],
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  chatHistoric: [{ type: Schema.Types.ObjectId, ref: 'Chat' }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
