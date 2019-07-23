import mongoose from 'mongoose'

import { STATUS_NEW, STATUS_ARCHIVED, STATUS_COMPLETED, STATUS_IN_PROGRESS } from '../utils/constants'

const { Schema } = mongoose;

const TasksSchema = new Schema({
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    default: ''
  },
  status: {
    type: String,
    default: STATUS_NEW,
    enum: [ STATUS_NEW, STATUS_ARCHIVED, STATUS_COMPLETED, STATUS_IN_PROGRESS ]
  },
  title: {
    type: String
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

mongoose.model('Tasks', TasksSchema);