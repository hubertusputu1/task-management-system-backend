import mongoose from 'mongoose'

const { Schema } = mongoose;

const CommentsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks',
    required: true
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

CommentsSchema.methods.showData = function() {
  return {
    _id: this._id,
    userId: this.userId,
    taskId: this.taskId,
    text: this.text
  };
};

mongoose.model('Comments', CommentsSchema);