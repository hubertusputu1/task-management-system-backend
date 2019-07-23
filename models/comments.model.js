import mongoose from 'mongoose'

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: ''
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
    default: ''
  },
  text: {
    type: String
  }
}, {
  timestamps: true
});

mongoose.model('Comments', CommentsSchema);