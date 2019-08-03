import mongoose from 'mongoose';

import {
	STATUS_NEW,
	STATUS_ARCHIVED,
	STATUS_COMPLETED,
	STATUS_IN_PROGRESS
} from '../utils/constants';

const { Schema } = mongoose;

const TasksSchema = new Schema(
	{
		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
		},
		status: {
			type: String,
			default: STATUS_NEW,
			enum: [
				STATUS_NEW,
				STATUS_ARCHIVED,
				STATUS_COMPLETED,
				STATUS_IN_PROGRESS
			]
		},
		title: {
			type: String,
			required: true,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true
		}
	},
	{
		timestamps: true
	}
);

TasksSchema.methods.showData = function() {
	return {
		_id: this._id,
		status: this.status,
		title: this.title,
		description: this.description,
		assignedTo: this.assignedTo,
		createdBy: this.createdBy
	};
};

mongoose.model('Tasks', TasksSchema);
