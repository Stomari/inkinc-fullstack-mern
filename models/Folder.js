const mongoose = require('mongoose');
const { Schema } = mongoose;

const folderSchema = new Schema({
  name: String,
  image: [{ type: Schema.Types.ObjectId, ref: 'Tattoo' }],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
