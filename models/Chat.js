const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
  historic: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  artist: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
