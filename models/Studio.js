const mongoose = require('mongoose');
const { Schema } = mongoose;

const studioSchema = new Schema({
  name: String,
  adress: String,
  lati: Number,
  long: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Studio = mongoose.model('Studio', studioSchema);
module.exports = Studio;
